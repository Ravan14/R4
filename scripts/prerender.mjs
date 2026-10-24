/*
 * scripts/prerender.mjs — the second half of `npm run build`.
 *
 * Vite has already produced a client bundle in dist/. This step renders every
 * page to a real HTML document with React's static markup and writes it to the
 * repository root, which is what GitHub Pages serves. Content is therefore in
 * the HTML, not behind a renderer: readable with JavaScript off, crawlable
 * without one, and diffable against the pre-migration baseline.
 *
 *   node scripts/prerender.mjs
 */

import { readFileSync, writeFileSync, rmSync, cpSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createServer } from 'vite';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');

function readManifest() {
  for (const p of [join(DIST, '.vite/manifest.json'), join(DIST, 'manifest.json')]) {
    if (existsSync(p)) return JSON.parse(readFileSync(p, 'utf8'));
  }
  throw new Error('no Vite manifest in dist/ — run `vite build` first');
}

const manifest = readManifest();

// Collect the entry chunk and every CSS file it (or any chunk) emitted.
const styles = new Set();
const scripts = [];
for (const entry of Object.values(manifest)) {
  if (entry.isEntry) scripts.push(entry.file);
  for (const css of entry.css ?? []) styles.add(css);
}
if (!scripts.length) throw new Error('manifest has no entry chunk');

// Root-relative paths are wrong here: the emitted documents sit at the repo
// root next to assets/, and that is also how the hand-written pages referenced
// styles.css. Keep it relative so the published paths do not change shape.
const toRelative = (f) => (f.startsWith('/') ? f.slice(1) : f);

const vite = await createServer({
  root: ROOT,
  configFile: join(ROOT, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
});

let mod;
try {
  mod = await vite.ssrLoadModule('/src/server.tsx');
} catch (error) {
  await vite.close();
  console.error('Failed to load the server entry:\n', error);
  process.exit(1);
}

const { pageKeys, pageFiles, renderDocument } = mod;
const assets = { styles: [...styles].map(toRelative), scripts: scripts.map(toRelative) };

// Replace the previous build's assets wholesale; hashed filenames otherwise
// accumulate in git forever.
rmSync(join(ROOT, 'assets'), { recursive: true, force: true });
cpSync(join(DIST, 'assets'), join(ROOT, 'assets'), { recursive: true });

let count = 0;
for (const key of pageKeys) {
  const html = renderDocument(key, assets);
  const file = join(ROOT, pageFiles[key]);
  writeFileSync(file, html);
  count += 1;
  console.log(`  wrote ${pageFiles[key].padEnd(18)} ${(html.length / 1024).toFixed(1)} KB`);
}

await vite.close();
console.log(`prerendered ${count} pages; assets refreshed from dist/`);
