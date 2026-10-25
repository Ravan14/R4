import { renderToStaticMarkup } from 'react-dom/server';
import App from './App.tsx';
import { PAGES, type PageKey } from './site.ts';
import { canonicalFor } from './urls.ts';

/* Server-side document assembly. scripts/prerender.mjs calls renderDocument
 * once per page and writes the result to the repository root, so what GitHub
 * Pages serves is real HTML with the copy in it — readable without JavaScript
 * and crawlable without a renderer. */

export const pageKeys = Object.keys(PAGES) as PageKey[];

/* The published filename per key. Kept next to pageKeys so prerender.mjs never
 * has to restate the mapping — index.html and 404.html are the two cases where
 * the key and the file disagree. */
export const pageFiles: Record<PageKey, string> = Object.fromEntries(
  pageKeys.map((key) => [key, PAGES[key].file]),
) as Record<PageKey, string>;

/* The font is self-hosted and declared in src/styles.css, which is where its
 * @font-face lives. Nothing here needs its URL — the only reason the head
 * mentions it at all is the preload below, whose href comes from the build
 * manifest because the filename is hashed. */

function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function head(key: PageKey, assets: Assets) {
  const m = PAGES[key];
  // The error page is the one document that asks not to be indexed, so it also
  // gets no canonical: a page that should not appear in results should not
  // nominate an address either.
  const indexable = m.robots !== 'noindex';
  const lines = [
    '  <meta charset="UTF-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    "  <script>document.documentElement.classList.add('js')</script>",
  ];
  if (m.description) {
    lines.push(`  <meta name="description" content="${esc(m.description)}" />`);
  }
  if (m.themeColor) {
    lines.push(`  <meta name="theme-color" content="${esc(m.themeColor)}" />`);
  }
  if (m.robots) {
    lines.push(`  <meta name="robots" content="${esc(m.robots)}" />`);
  }
  if (m.ogTitle) {
    lines.push(`  <meta property="og:title" content="${esc(m.ogTitle)}" />`);
  }
  if (m.ogDescription) {
    lines.push(
      `  <meta property="og:description" content="${esc(m.ogDescription)}" />`,
    );
  }
  if (m.ogType) {
    lines.push(`  <meta property="og:type" content="${esc(m.ogType)}" />`);
  }
  /* Declared alongside the canonical because a shared link picks up og:url
   * before it ever reads a <link rel=canonical>. */
  if (indexable) {
    lines.push(
      `  <meta property="og:url" content="${canonicalFor(key)}" />`,
    );
  }
  // og:image stays BG.jpg, not BG.webp: social scrapers handle WebP badly.
  if (m.ogImage) {
    lines.push(`  <meta property="og:image" content="${esc(m.ogImage)}" />`);
  }
  lines.push(`  <title>${esc(m.title)}</title>`);
  /* Every page answers at two addresses — /technology and /technology.html —
   * because Pages appends the suffix to a request that has none, and it will
   * not 301 one to the other. Both return 200 with identical bytes, so the
   * canonical tag is the only statement on the page about which address the
   * document actually is. Home needs it most: /, /index and /index.html. */
  if (indexable) {
    lines.push(`  <link rel="canonical" href="${canonicalFor(key)}" />`);
  }
  lines.push('  <link rel="icon" type="image/png" href="mark-128.png" />');
  /* Preload the font rather than letting the stylesheet find it. A url() in
   * CSS is only discovered after the CSS itself has downloaded and parsed,
   * which puts a second round trip in front of the first word on screen; the
   * preload races that. crossorigin is required even though it is same-origin,
   * because fonts are always fetched in CORS mode and a preload without it is
   * downloaded twice and used never. */
  for (const href of assets.fonts) {
    lines.push(
      `  <link rel="preload" href="${esc(href)}" as="font" type="font/woff2" crossorigin />`,
    );
  }
  for (const href of assets.styles) {
    lines.push(`  <link rel="stylesheet" href="${href}" />`);
  }
  return lines.join('\n');
}

type Assets = { styles: string[]; scripts: string[]; fonts: string[] };

export function renderDocument(key: PageKey, assets: Assets): string {
  const m = PAGES[key];
  const body = renderToStaticMarkup(<App page={key} />);
  const scripts = assets.scripts
    .map((src) => `  <script type="module" src="${src}"></script>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
${head(key, assets)}
</head>
<body${m.bodyClass ? ` class="${esc(m.bodyClass)}"` : ''} data-page="${key}">
  <div id="root">${body}</div>
${scripts}
</body>
</html>
`;
}
