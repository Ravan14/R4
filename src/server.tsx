import { renderToStaticMarkup } from 'react-dom/server';
import App from './App.tsx';
import { PAGES, type PageKey } from './site.ts';

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

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';

function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function head(key: PageKey, styles: string[]) {
  const m = PAGES[key];
  const lines = [
    '  <meta charset="UTF-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
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
  // og:image stays BG.jpg, not BG.webp: social scrapers handle WebP badly.
  if (m.ogImage) {
    lines.push(`  <meta property="og:image" content="${esc(m.ogImage)}" />`);
  }
  lines.push(`  <title>${esc(m.title)}</title>`);
  lines.push('  <link rel="icon" type="image/png" href="mark-128.png" />');
  lines.push('  <link rel="preconnect" href="https://fonts.googleapis.com" />');
  lines.push(
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
  );
  lines.push(
    `  <link href="${FONT_HREF}" rel="stylesheet" />`,
  );
  for (const href of styles) {
    lines.push(`  <link rel="stylesheet" href="${href}" />`);
  }
  return lines.join('\n');
}

export function renderDocument(
  key: PageKey,
  assets: { styles: string[]; scripts: string[] },
): string {
  const m = PAGES[key];
  const body = renderToStaticMarkup(<App page={key} />);
  const scripts = assets.scripts
    .map((src) => `  <script type="module" src="${src}"></script>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
${head(key, assets.styles)}
</head>
<body${m.bodyClass ? ` class="${esc(m.bodyClass)}"` : ''} data-page="${key}">
  <div id="root">${body}</div>
${scripts}
</body>
</html>
`;
}
