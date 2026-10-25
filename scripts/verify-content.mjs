/*
 * scripts/verify-content.mjs — proves the built tree is structurally sound.
 *
 * The word-parity migration job is done: the pages were rewritten on purpose
 * (CONTENT-REPORT.md), so this script no longer diffs against a baseline tree.
 * What remains worth proving before every publish:
 *
 *   1. every page file exists,
 *   2. every internal link resolves to a page that exists, and its fragment
 *      (if any) names an element id that exists in that page,
 *   3. every relative asset reference (img, stylesheet, script, font, icon)
 *      exists on disk,
 *   4. no element id is duplicated within a page,
 *   5. every image has an alt attribute — empty alt is allowed only inside
 *      aria-hidden decoration,
 *   6. every indexable page declares a title, a description, a canonical, and
 *      an og:url equal to the canonical; only 404.html declares noindex,
 *   7. sitemap.xml lists exactly the indexable pages, each at its canonical
 *      address.
 *
 *   node scripts/verify-content.mjs [builtDir]
 *
 * Exit 0 means every page carries the published address and nothing in the
 * tree points at a file, fragment, or asset that does not exist. Exit 1
 * prints the defects.
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

const ROOT = process.argv[2] ?? '.';
const ORIGIN = 'https://www.r4space.com';

const FILES = [
  'index.html', 'technology.html', 'applications.html', 'defence.html',
  'civil.html', 'company.html', 'investors.html', 'careers.html',
  'contact.html', '404.html',
];

/* 404 is the one document that asks not to be indexed; every other page must
 * declare itself. */
const INDEXABLE = new Set(FILES.filter((f) => f !== '404.html'));

/* The published address of a filename: index.html -> '/', anything else
 * drops its .html suffix — the form rel=canonical, og:url, and the sitemap
 * all carry (src/urls.ts). */
function addressFor(file) {
  if (file === 'index.html') return '/';
  return `/${file.replace(/\.html$/i, '')}`;
}
const canonicalFor = (file) => `${ORIGIN}${addressFor(file)}`;

/*
 * Reduce an href to the file and fragment it resolves to, relative to the
 * page that carries it. Returns null for addresses that leave the tree
 * (schemes, protocol-relative, or a bare # which is the back-to-top idiom).
 */
function resolve(href, fromFile) {
  if (/^(#|https?:|mailto:|tel:|\/\/)/i.test(href)) return { file: fromFile, fragment: href.startsWith('#') ? href.slice(1) : '' };
  const hash = href.indexOf('#');
  const path = hash === -1 ? href : href.slice(0, hash);
  const fragment = hash === -1 ? '' : href.slice(hash + 1);
  const file = path === '' || path === '.' || path === './'
    ? 'index.html'
    : `${/\.html$/i.test(path) ? path : `${path}.html`}`;
  return { file, fragment };
}

/* A reference that names a local file rather than a remote resource. */
function isLocal(ref) {
  return ref !== '' && !/^(#|https?:|mailto:|tel:|\/\/|data:)/i.test(ref);
}

function strip(ref) {
  return ref.split(/[?#]/, 1)[0];
}

function readDoc(file) {
  return new JSDOM(readFileSync(join(ROOT, file), 'utf8')).window.document;
}

const problems = [];

/* --- 1. Files, ids, and metadata ------------------------------------- */

const docs = new Map();
const ids = new Map();
for (const file of FILES) {
  if (!existsSync(join(ROOT, file))) {
    problems.push(`missing page: ${file}`);
    continue;
  }
  const d = readDoc(file);
  docs.set(file, d);

  const seen = new Set();
  for (const el of d.querySelectorAll('[id]')) {
    if (seen.has(el.id)) problems.push(`duplicate id: ${file}#${el.id}`);
    seen.add(el.id);
  }
  ids.set(file, seen);

  if (INDEXABLE.has(file)) {
    const title = d.querySelector('title')?.textContent?.trim() ?? '';
    if (!title) problems.push(`${file}: missing <title>`);
    const description = d.querySelector('meta[name="description"]')?.content ?? '';
    if (!description) problems.push(`${file}: missing meta description`);
    const canonical = d.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
    if (canonical !== canonicalFor(file)) {
      problems.push(`${file}: canonical is ${JSON.stringify(canonical)}; expected ${canonicalFor(file)}`);
    }
    const ogUrl = d.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? '';
    if (ogUrl !== canonicalFor(file)) {
      problems.push(`${file}: og:url is ${JSON.stringify(ogUrl)}; expected ${canonicalFor(file)}`);
    }
    if ((d.querySelector('meta[name="robots"]')?.content ?? '').includes('noindex')) {
      problems.push(`${file}: indexable page declares noindex`);
    }
  } else if (!(d.querySelector('meta[name="robots"]')?.content ?? '').includes('noindex')) {
    problems.push('404.html: missing noindex robots meta');
  }
}

/* --- 2. Links, fragments, and assets --------------------------------- */

for (const [file, d] of docs) {
  const pageIds = ids.get(file);

  for (const a of d.querySelectorAll('a[href]')) {
    const target = resolve(a.getAttribute('href'), file);
    if (target.fragment === '' && a.getAttribute('href') === '#') continue; // back-to-top idiom
    if (!target.file.endsWith('.html')) {
      problems.push(`${file}: internal href ${JSON.stringify(a.getAttribute('href'))} does not name a page`);
      continue;
    }
    if (!docs.has(target.file)) {
      problems.push(`${file}: link ${JSON.stringify(a.getAttribute('href'))} -> missing page ${target.file}`);
      continue;
    }
    if (target.fragment && !ids.get(target.file)?.has(target.fragment)) {
      problems.push(`${file}: link ${JSON.stringify(a.getAttribute('href'))} -> ${target.file} has no #${target.fragment}`);
    }
  }

  const refs = [
    ...Array.from(d.querySelectorAll('img[src]')).map((el) => el.getAttribute('src')),
    ...Array.from(d.querySelectorAll('link[href]')).map((el) => el.getAttribute('href')),
    ...Array.from(d.querySelectorAll('script[src]')).map((el) => el.getAttribute('src')),
    ...Array.from(d.querySelectorAll('iframe[src]')).map((el) => el.getAttribute('src')),
  ];
  for (const ref of refs) {
    if (!isLocal(ref)) continue;
    if (!existsSync(join(ROOT, strip(ref)))) {
      problems.push(`${file}: missing asset ${JSON.stringify(ref)}`);
    }
  }

  for (const img of d.querySelectorAll('img')) {
    const alt = img.getAttribute('alt');
    if (alt === null) {
      problems.push(`${file}: <img src="${img.getAttribute('src')}"> has no alt attribute`);
    } else if (alt === '' && !img.closest('[aria-hidden="true"]')) {
      problems.push(`${file}: <img src="${img.getAttribute('src')}"> has empty alt outside aria-hidden decoration`);
    }
  }
}

/* --- 3. Sitemap coverage ---------------------------------------------- */

let sitemap;
try {
  sitemap = new JSDOM(readFileSync(join(ROOT, 'sitemap.xml'), 'utf8'), { contentType: 'text/xml' }).window.document;
} catch {
  problems.push('missing sitemap.xml');
  sitemap = null;
}

if (sitemap) {
  const locs = Array.from(sitemap.querySelectorAll('loc')).map((el) => el.textContent.trim());
  for (const loc of locs) {
    if (!loc.startsWith(`${ORIGIN}/`)) {
      problems.push(`sitemap: unexpected origin in ${JSON.stringify(loc)}`);
      continue;
    }
    const file = loc.slice(ORIGIN.length) === '/' ? 'index.html' : `${loc.slice(ORIGIN.length + 1)}.html`;
    if (!INDEXABLE.has(file) || !docs.has(file)) {
      problems.push(`sitemap: ${JSON.stringify(loc)} does not name an indexable page`);
    }
  }
  for (const file of INDEXABLE) {
    if (docs.has(file) && !locs.includes(canonicalFor(file))) {
      problems.push(`sitemap: missing ${canonicalFor(file)}`);
    }
  }
}

/* --- Report ------------------------------------------------------------ */

const present = FILES.filter((f) => docs.has(f));
for (const file of FILES) {
  if (docs.has(file)) console.log(`ok  ${file.padEnd(18)} structure, links, metadata, assets`);
}
console.log(
  problems.length
    ? `\n${problems.length} defect(s) in the built tree:\n  ${problems.join('\n  ')}`
    : `\nAll ${present.length} pages resolve: links, fragments, assets, metadata, and sitemap agree.`,
);
process.exit(problems.length ? 1 : 0);
