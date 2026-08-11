import { inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

export interface QueryParamPage {
  page: Signal<number>;
  setPage: (page: number) => void;
}

/**
 * Backs a page number with a URL query param, so the current page survives
 * reloads, back/forward navigation, and is shareable via link. Call from a
 * component field initializer or constructor (needs an injection context).
 */
export function injectQueryParamPage(paramName = 'page'): QueryParamPage {
  const route = inject(ActivatedRoute);
  const router = inject(Router);

  const page = toSignal(
    route.queryParamMap.pipe(map((params) => Math.max(1, Number(params.get(paramName)) || 1))),
    { initialValue: 1 },
  );

  function setPage(next: number): void {
    router.navigate([], {
      relativeTo: route,
      queryParams: { [paramName]: next === 1 ? null : next },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  return { page, setPage };
}
