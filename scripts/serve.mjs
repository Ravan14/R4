/*
 * scripts/serve.mjs — a local preview that resolves URLs like GitHub Pages.
 *
 * `python -m http.server` maps a request onto a file and nothing else, so it
 * answers 404 for /technology while Pages answers 200 with technology.html.
 * That difference matters now that the site links extensionlessly: with the
 * Python server every internal navigation on a broken link, and the local
 * review would disagree with production on the single thing this site's URLs
 * depend on. This server implements the same order Pages does:
 *
 *   /technology.html   -> the file, if it exists
 *   /technology        -> technology.html
 *   /technology/       -> technology/index.html, else technology.html
 *   /                  -> index.html
 *   anything else      -> 404.html, with a 404 status
 *
 *   node scripts/serve.mjs [port]        # default 8080
 */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PORT = Number(process.argv[2] ?? 8080);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

/** Candidate files for a request path, in the order Pages tries them. */
function candidates(pathname) {
  // Collapse to a bare relative path with no leading slash and no query.
  const clean = decodeURIComponent(pathname).replace(/^\/+|\/+$/g, '');
  if (clean === '') return ['index.html'];
  const parts = clean.split('/');
  // Directory-style request: /technology/ or /a/b/
  if (pathname.endsWith('/')) {
    return [join(clean, 'index.html'), `${clean}.html`];
  }
  if (extname(clean)) return [clean];
  return [`${clean}.html`, join(clean, 'index.html'), clean];
}

async function existing(paths) {
  for (const p of paths) {
    const abs = normalize(join(ROOT, p));
    // Refuse anything that escapes the repository root. ROOT ends with a slash,
    // so a plain prefix test is the whole check.
    if (!abs.startsWith(ROOT)) continue;
    try {
      if ((await stat(abs)).isFile()) return abs;
    } catch {
      /* not there — try the next candidate */
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const pathname = new URL(req.url ?? '/', 'http://localhost').pathname;
  let file = await existing(candidates(pathname));
  let status = 200;

  if (!file) {
    file = join(ROOT, '404.html');
    status = 404;
    try {
      await stat(file);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('404 and no 404.html to say it with');
      return;
    }
  }

  const body = await readFile(file);
  res.writeHead(status, {
    'content-type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream',
    // Never cache a preview: a rebuilt stylesheet that arrives as the old copy
    // is how a local check ends up proving nothing.
    'cache-control': 'no-store',
  });
  res.end(body);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`serving ${ROOT}`);
  console.log(`  http://127.0.0.1:${PORT}/  (extensionless URLs resolve as they do on Pages)`);
});
