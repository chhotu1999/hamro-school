import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';

import { AuthService } from './auth.service';

/** Account endpoints that must never carry a (possibly stale) access token or trigger a refresh. */
const AUTH_ENDPOINTS = ['/Account/Login', '/Account/Register', '/Account/RefreshToken'];

// Module-scoped so concurrent requests share a single in-flight refresh call;
// functional interceptors are resolved once per app, not per request.
let isRefreshing = false;
const refreshedAccessToken$ = new BehaviorSubject<string | null>(null);

function withAuthHeader(req: HttpRequest<unknown>, accessToken: string): HttpRequest<unknown> {
  return req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
}

function waitForRefresh(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return refreshedAccessToken$.pipe(
    filter((token): token is string => token !== null),
    take(1),
    switchMap((token) => next(withAuthHeader(req, token))),
  );
}

function refreshAndRetry(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router,
): Observable<HttpEvent<unknown>> {
  if (isRefreshing) {
    return waitForRefresh(req, next);
  }

  isRefreshing = true;
  refreshedAccessToken$.next(null);

  return authService.refreshToken().pipe(
    switchMap((session) => {
      isRefreshing = false;
      refreshedAccessToken$.next(session.accessToken);
      return next(withAuthHeader(req, session.accessToken));
    }),
    catchError((error: unknown) => {
      isRefreshing = false;
      authService.clearSession();
      router.navigateByUrl('/login');
      return throwError(() => error);
    }),
  );
}

/**
 * Attaches the stored access token to outgoing API requests and, on a 401,
 * transparently refreshes the session (coalescing concurrent 401s into a
 * single refresh call) before retrying the original request.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) => req.url.includes(endpoint));
  const accessToken = authService.getAccessToken();
  const authReq = accessToken && !isAuthEndpoint ? withAuthHeader(req, accessToken) : req;

  return next(authReq).pipe(
    catchError((error: unknown) => {
      const isUnauthorized = error instanceof HttpErrorResponse && error.status === 401;
      if (!isUnauthorized || isAuthEndpoint || !authService.getRefreshToken()) {
        return throwError(() => error);
      }
      return refreshAndRetry(authReq, next, authService, router);
    }),
  );
};
