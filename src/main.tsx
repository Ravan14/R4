import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import type { PageKey } from './site.ts';
import { PAGES } from './site.ts';

/* The document body carries which page this is, because these are nine static
 * files rather than one SPA with routes. Dev server convenience: /app/
 * ?page=technology renders that page. */
const fromQuery = new URLSearchParams(location.search).get('page');
const key = (
  fromQuery && fromQuery in PAGES ? fromQuery : document.body.dataset.page
) as PageKey;

const page: PageKey = key && key in PAGES ? key : 'home';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <App page={page} />
  </StrictMode>,
);
