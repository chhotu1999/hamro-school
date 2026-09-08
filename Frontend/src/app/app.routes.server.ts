import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // The authenticated app shell reads its session from localStorage, which
  // doesn't exist on the server — render it client-only so the auth guard
  // (not a stale prerendered/SSR snapshot) always decides what's shown.
  {
    path: 'app',
    renderMode: RenderMode.Client
  },
  {
    path: 'app/**',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
