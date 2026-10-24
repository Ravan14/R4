/*
 * scripts/verify-content.mjs — proves the migration moved the site, it did not
 * rewrite it.
 *
 * The React pages render to static HTML at build time, so the published files
 * can be compared word-for-word against a baseline tree. This script extracts
 * the visible text corpus, the element IDs, and the link/asset URLs from both
 * trees and prints any difference that is not on the allowlist below.
 *
 *   node scripts/verify-content.mjs [baselineDir] [builtDir]
 *
 * Produce a baseline with:
 *   rm -rf /tmp/r4-base && mkdir -p /tmp/r4-base && git archive HEAD | tar -x -C /tmp/r4-base
 *
 * Exit 0 means every word, id and destination survived. Exit 1 prints the
 * diffs, and the whole point is that nothing prints unless it is a defect.
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

const BASE = process.argv[2] ?? '/tmp/r4-base';
const HEAD = process.argv[3] ?? '.';

const FILES = [
  'index.html', 'technology.html', 'applications.html', 'defence.html',
  'civil.html', 'company.html', 'careers.html', 'contact.html', '404.html',
];

/*
 * Authorised drift — the complete list, each item with a reason.
 * If a diff is not covered here, it is a defect, and it is a defect in the
 * migration rather than something to add to this table.
 */
const EXPECTED = [
  // React needs a mount point for hydrateRoot.
  { kind: 'ids', sign: '+', file: '*', value: 'root', why: 'React mount point' },

  // The stylesheet and the bundle are hashed build output now; styles.css and
  // main.js were the hand-maintained sources they replace.
  { kind: 'srcs', sign: '-', file: '*', value: 'styles.css', why: 'moved to src/, emitted as assets/index-<hash>.css' },
  { kind: 'srcs', sign: '+', file: '*', value: /^assets\/index-[\w-]+\.css$/, why: 'built stylesheet' },

  // React 19 hoists <link rel="preload" as="image"> for images that carry a
  // fetch priority or sit in the chrome. It speeds up the LCP hero, so it is
  // kept rather than suppressed.
  { kind: 'srcs', sign: '+', file: '*', value: 'logo.webp', why: 'auto-preload of the brand mark' },
  { kind: 'srcs', sign: '+', file: '*', value: 'BG.webp', why: 'auto-preload of the hero image' },
  { kind: 'srcs', sign: '+', file: '*', value: 'https://flagcdn.com/w20/in.png', why: 'auto-preload of the footer flag' },

  // The published addresses lost their .html suffix, and Pages still answers
  // 200 at both forms without redirecting one to the other. So each page now
  // declares which address it is, as a canonical link and as og:url for the
  // scrapers that read the latter before the former. Neither tag existed in the
  // baseline, which is the defect the site audit recorded.
  { kind: 'srcs', sign: '+', file: '*', value: /^https:\/\/www\.r4space\.com\/[a-z-]*$/, why: 'rel=canonical' },
  { kind: 'head title + meta', sign: '+', file: '*', value: /^https:\/\/www\.r4space\.com\/[a-z-]*$/, why: 'og:url' },

  // One Footer replaced eight copy-pasted ones. Seven said "Insight Set" for
  // the #insight-set link and technology.html alone said "Integrated Sensing";
  // the inconsistency is normalised, by decision.
  { kind: 'visible text', sign: '-', file: 'technology.html', value: 'Integrated Sensing', why: 'footer label normalised to "Insight Set"' },
  { kind: 'visible text', sign: '+', file: 'technology.html', value: 'Insight Set', why: 'as above' },

  // The shared chrome adds a scroll-to-top control to the standalone 404.
  { kind: 'aria-label / title', sign: '+', file: '404.html', value: 'Back to top', why: 'shared chrome' },
];

function isExpected(kind, sign, value, file) {
  return EXPECTED.some(
    (e) =>
      e.kind === kind &&
      e.sign === sign &&
      (e.file === '*' || e.file === file) &&
      (typeof e.value === 'string' ? e.value === value : e.value.test(value)),
  );
}

/*
 * Reduce a link to the file it resolves to, so the comparison is about
 * destinations rather than spelling.
 *
 * The published addresses are extensionless (src/urls.ts) and the baseline tree
 * names every page with its .html suffix. Comparing raw strings would report
 * all 48 rewritten hrefs as content loss and bury anything real, so both sides
 * collapse to the same form first. A genuine destination change — a nav item
 * that starts pointing at defence instead of technology — still fails, because
 * that is a different file, not a different spelling.
 */
function asFile(href) {
  if (/^(#|https?:|mailto:|tel:|\/\/)/i.test(href)) return href;
  const hash = href.indexOf('#');
  const path = hash === -1 ? href : href.slice(0, hash);
  const fragment = hash === -1 ? '' : href.slice(hash);
  if (path === '' || path === '.' || path === './') return `index.html${fragment}`;
  return `${/\.html$/i.test(path) ? path : `${path}.html`}${fragment}`;
}

function corpus(file) {
  const dom = new JSDOM(readFileSync(file, 'utf8'));
  const d = dom.window.document;
  d.querySelectorAll('script, style, noscript').forEach((n) => n.remove());

  const walker = d.createTreeWalker(d.body, dom.window.NodeFilter.SHOW_TEXT);
  const texts = [];
  let n;
  while ((n = walker.nextNode())) {
    const t = n.textContent.replace(/\s+/g, ' ').trim();
    if (!t) continue;
    const el = n.parentElement;
    if (el && (el.closest('[aria-hidden="true"]') || el.tagName === 'svg')) continue;
    texts.push(t);
  }

  // Attributes that carry words or destinations — the other half of the contract.
  const named = (sel, attr) =>
    Array.from(d.querySelectorAll(sel))
      .map((el) => el.getAttribute(attr))
      .filter((v) => v !== null && v !== '');

  return {
    'visible text': texts,
    ids: named('*', 'id'),
    hrefs: named('a', 'href').map(asFile),
    srcs: [...named('img', 'src'), ...named('iframe', 'src'), ...named('link', 'href')],
    'alt text': named('img', 'alt'),
    'aria-label / title': [...named('*', 'aria-label'), ...named('*', 'title')],
    'head title + meta': [
      d.querySelector('title')?.textContent?.trim() ?? '',
      ...named('meta', 'content').filter((v) => v.length > 12),
    ],
  };
}

function counts(arr) {
  const m = new Map();
  for (const x of arr) m.set(x, (m.get(x) ?? 0) + 1);
  return m;
}

/* Returns { problems, expected } for one comparison dimension. */
function diff(file, kind, before, after) {
  const ca = counts(before);
  const cb = counts(after);
  const problems = [];
  let expected = 0;

  const emit = (value, sign, n) => {
    if (isExpected(kind, sign, value, file)) {
      expected += n;
      return;
    }
    for (let i = 0; i < n; i += 1) problems.push(`${sign} ${JSON.stringify(value)}`);
  };

  for (const [k, v] of ca) {
    const w = cb.get(k) ?? 0;
    if (w < v) emit(k, '-', v - w);
    if (w > v) emit(k, '+', w - v);
  }
  for (const [k, v] of cb) if (!ca.has(k)) emit(k, '+', v);
  return { problems, expected };
}

if (!existsSync(join(BASE, 'index.html'))) {
  console.error(`baseline not found at ${BASE} — see the header of this script`);
  process.exit(2);
}

let bad = 0;
let authorised = 0;
for (const file of FILES) {
  const beforePath = join(BASE, file);
  const afterPath = join(HEAD, file);
  if (!existsSync(beforePath) || !existsSync(afterPath)) {
    console.log(`MISSING: ${file} (baseline: ${existsSync(beforePath)}, built: ${existsSync(afterPath)})`);
    bad += 1;
    continue;
  }
  const a = corpus(beforePath);
  const b = corpus(afterPath);
  const lines = [];
  for (const kind of Object.keys(a)) {
    const r = diff(file, kind, a[kind], b[kind]);
    authorised += r.expected;
    for (const p of r.problems) lines.push(`  ${kind}\n    ${p}`);
  }
  if (lines.length) {
    bad += 1;
    console.log(`\nDEVIATIONS ${file}`);
    console.log(lines.join('\n'));
  } else {
    const n = a['visible text'].length;
    console.log(`ok  ${file.padEnd(18)} ${n} text nodes carried across`);
  }
}

console.log(
  bad
    ? `\n${bad} page(s) deviate beyond the allowlist. Do not ship this until each line above is understood.`
    : `\nAll nine pages carry the same content. ${authorised} authorised structural differences accounted for.`,
);
process.exit(bad ? 1 : 0);
