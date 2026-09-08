import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  MvLoginResponse,
  MvParamLogin,
  MvParamLogout,
  MvParamRefreshToken,
  MvParamRegister,
  MvUserInfo,
} from '../../shared/models/auth.model';
import { MvFlagResponse, MvResponse } from '../../shared/models/response.model';

const ACCESS_TOKEN_KEY = 'hs_access_token';
const REFRESH_TOKEN_KEY = 'hs_refresh_token';
const USER_KEY = 'hs_user';

/**
 * Session state + data access for the Shared Account API
 * (HamroSchool.API.Controllers.Shared.Account.V1.AccountController).
 * Tokens and the signed-in user are persisted to localStorage so a page
 * refresh keeps the session; AuthInterceptor reads/refreshes tokens through
 * this service. Storage reads/writes are skipped during SSR (no `window`).
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly accountUrl = `${environment.apiBaseUrl}/Account`;

  private readonly userSignal = signal<MvUserInfo | null>(this.readUser());
  readonly currentUser = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.userSignal() !== null && !!this.getAccessToken());

  /** POST Account/Login — on success, persists the session. */
  login(json: MvParamLogin): Observable<MvLoginResponse> {
    return this.http.post<MvResponse<MvLoginResponse>>(`${this.accountUrl}/Login`, json).pipe(
      map((response) => this.unwrap(response, 'Invalid username or password.')),
      tap((session) => this.setSession(session)),
    );
  }

  /** POST Account/Register — account creation only; does not sign the user in. */
  register(json: MvParamRegister): Observable<MvUserInfo> {
    return this.http
      .post<MvResponse<MvUserInfo>>(`${this.accountUrl}/Register`, json)
      .pipe(map((response) => this.unwrap(response, 'Registration failed.')));
  }

  /** POST Account/RefreshToken — exchanges the stored token pair for a new one. */
  refreshToken(): Observable<MvLoginResponse> {
    const payload: MvParamRefreshToken = {
      accessToken: this.getAccessToken() ?? '',
      refreshToken: this.getRefreshToken() ?? '',
    };
    return this.http.post<MvResponse<MvLoginResponse>>(`${this.accountUrl}/RefreshToken`, payload).pipe(
      map((response) => this.unwrap(response, 'Session expired. Please log in again.')),
      tap((session) => this.setSession(session)),
    );
  }

  /** POST Account/Logout — clears the local session immediately, then best-effort notifies the server. */
  logout(): Observable<MvFlagResponse | null> {
    const accessToken = this.getAccessToken();
    this.clearSession();
    if (!accessToken) {
      return of(null);
    }

    const payload: MvParamLogout = { accessToken };
    return this.http
      .post<MvResponse<MvFlagResponse>>(`${this.accountUrl}/Logout`, payload)
      .pipe(map((response) => response.data ?? null));
  }

  getAccessToken(): string | null {
    return this.isBrowser ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
  }

  getRefreshToken(): string | null {
    return this.isBrowser ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
  }

  setSession(session: MvLoginResponse): void {
    if (this.isBrowser) {
      localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    }
    this.userSignal.set(session.user);
  }

  clearSession(): void {
    if (this.isBrowser) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    this.userSignal.set(null);
  }

  private readUser(): MvUserInfo | null {
    if (!this.isBrowser) {
      return null;
    }
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as MvUserInfo;
    } catch {
      return null;
    }
  }

  private unwrap<T>(response: MvResponse<T>, fallbackMessage: string): T {
    if (!response.data) {
      throw new Error(response.message || fallbackMessage);
    }
    return response.data;
  }
}
