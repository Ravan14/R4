/*
 * scripts/html-to-jsx.mjs
 *
 * One-time codemod. Reads the nine hand-maintained HTML pages at the
 * repository root and writes them out as React components.
 *
 * This exists so that not one word of copy is retyped. The content contract
 * for this migration is that every heading, paragraph, list item, table cell,
 * form field and link target survives unchanged, and no one can promise that
 * while transcribing 148 KB of prose by hand. Parsing and re-serialising can.
 *
 *   node scripts/html-to-jsx.mjs
 *
 * Run it before the generated HTML replaces the source HTML at the root.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

const ROOT = new URL('..', import.meta.url).pathname;

/* Page key -> [source file, component name, output file] */
const PAGES = [
  ['home',         'index.html',        'Home',        'index.html'],
  ['technology',   'technology.html',   'Technology',  'technology.html'],
  ['applications', 'applications.html', 'Applications','applications.html'],
  ['defence',      'defence.html',      'Defence',     'defence.html'],
  ['civil',        'civil.html',        'Civil',       'civil.html'],
  ['company',      'company.html',      'Company',     'company.html'],
  ['careers',      'careers.html',      'Careers',     'careers.html'],
  ['contact',      'contact.html',      'Contact',     'contact.html'],
  ['not-found',    '404.html',          'NotFound',    '404.html'],
];

/*
 * HTML attribute name -> JSX prop name. Anything not listed passes through,
 * which is correct for aria-*, data-* and the plain lowercase names.
 */
const ATTRS = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex',
  colspan: 'colSpan', rowspan: 'rowSpan', maxlength: 'maxLength',
  minlength: 'minLength', readonly: 'readOnly', novalidate: 'noValidate',
  autocomplete: 'autoComplete', autocapitalize: 'autoCapitalize',
  contenteditable: 'contentEditable', enctype: 'encType',
  acceptcharset: 'acceptCharset', srcset: 'srcSet', sizes: 'sizes',
  referrerpolicy: 'referrerPolicy', crossorigin: 'crossOrigin',
  loading: 'loading', decoding: 'decoding', fetchpriority: 'fetchPriority',
  datetime: 'dateTime', usemap: 'useMap', allowfullscreen: 'allowFullScreen',
  // SVG
  'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin', 'stroke-dasharray': 'strokeDasharray',
  'stroke-opacity': 'strokeOpacity', 'fill-opacity': 'fillOpacity',
  'fill-rule': 'fillRule', 'clip-rule': 'clipRule', 'text-anchor': 'textAnchor',
  'dominant-baseline': 'dominantBaseline', 'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity', 'shape-rendering': 'shapeRendering',
  'xmlns:xlink': 'xmlnsXlink', 'xlink:href': 'xlinkHref',
};

/* Attributes whose presence alone is the whole value. */
const BOOLEAN = new Set([
  'hidden', 'disabled', 'required', 'checked', 'open', 'multiple',
  'readonly', 'novalidate', 'autofocus', 'defer', 'async', 'loop',
  'muted', 'playsinline', 'default', 'selected', 'allowfullscreen',
]);

const VOID = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

/* Props React types as numbers rather than strings. */
const NUMERIC = new Set(['tabIndex', 'colSpan', 'rowSpan']);

/* React treats value/checked on a form control as controlled state, so a
 * literal copied out of HTML must arrive as the initial value instead. This is
 * not a behaviour change — the field still renders pre-filled exactly as the
 * hand-written page did, and main.js's FormData read is untouched. */
const INITIALISABLE = new Set(['input', 'textarea', 'select']);

/* jsdom parses these documents as HTML, so every tag name arrives lowercased.
 * SVG is case-sensitive and React needs the camel form; without this map
 * <linearGradient> arrives as <lineargradient> and fails to typecheck.
 * The name is restored on output, and React renders the correct SVG element. */
const SVG_TAGS = {
  lineargradient: 'linearGradient',
  radialgradient: 'radialGradient',
  clippath: 'clipPath',
  textpath: 'textPath',
  foreignobject: 'foreignObject',
};

/* Re-encode the characters that would otherwise change meaning in JSX text.
 * jsdom hands us decoded text, so & has to go back to &amp; and < to &lt;. */
function textToJsx(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

function attrToJsx(node) {
  const out = [];
  for (const attr of Array.from(node.attributes)) {
    let name = ATTRS[attr.name] ?? attr.name;
    if (
      INITIALISABLE.has(node.nodeName.toLowerCase()) &&
      (attr.name === 'value' || attr.name === 'checked')
    ) {
      name = attr.name === 'value' ? 'defaultValue' : 'defaultChecked';
    }
    if (BOOLEAN.has(attr.name) && attr.value === '') {
      out.push(name);
      continue;
    }
    // A value containing a quote or brace becomes a JS string expression.
    const v = attr.value;
    if (name === 'className') {
      // `.reveal` is a hook main.js used for scroll animations; the restyle
      // deleted its CSS, so every one of the 151 survivors is inert weight.
      const kept = v.split(/\s+/).filter((c) => c && c !== 'reveal').join(' ');
      if (!kept) continue;
      out.push(`${name}="${kept}"`);
      continue;
    }
    if (NUMERIC.has(name) && /^\d+$/.test(v)) {
      out.push(`${name}={${v}}`);
      continue;
    }
    if (name === 'href' && /^[a-z0-9._-]+\.html($|#)/i.test(v)) {
      /* Published addresses are extensionless, so a regeneration must not put
       * the suffix back. The authority for this rule is hrefFor() in
       * src/urls.ts; it is restated here because this script is plain .mjs and
       * cannot import TypeScript. verify-content.mjs compares link destinations
       * with the suffix normalised away, so a drift between the two shows up as
       * a missing link rather than a silent inconsistency. */
      const hash = v.indexOf('#');
      const path = hash === -1 ? v : v.slice(0, hash);
      const fragment = hash === -1 ? '' : v.slice(hash);
      const bare = path === 'index.html' ? './' : path.replace(/\.html$/i, '');
      out.push(`${name}="${bare}${fragment}"`);
      continue;
    }
    const expr = /["'`\\]|\$\{/.test(v)
      ? `{${JSON.stringify(v)}}`
      : `"${v}"`;
    out.push(`${name}=${expr}`);
  }
  return out.length ? ' ' + out.join(' ') : '';
}

function tagOf(node) {
  // Preserve hyphenated and namespaced SVG names as string literals.
  const t = node.nodeName.toLowerCase();
  return SVG_TAGS[t] ?? t;
}

/* Serialise one element node to a JSX string at the given indent. */
function elToJsx(node, indent) {
  const pad = ' '.repeat(indent);

  if (node.nodeType === 3) {
    const raw = node.nodeValue;
    if (!raw.trim()) return '';
    return pad + textToJsx(raw).trim() + '\n';
  }
  if (node.nodeType !== 1) return '';

  const tag = tagOf(node);

  if (tag === 'script' || tag === 'style') return '';

  const attrs = attrToJsx(node);
  const kids = Array.from(node.childNodes);

  if (VOID.has(tag)) return `${pad}<${tag}${attrs} />\n`;

  /* Mixed text and element children must stay on one line.
   *
   * This is not cosmetic. JSX removes whitespace that sits next to a newline,
   * so
   *
   *   <strong>ℝ<sup>4</sup> Aerospace</strong>     ->  "ℝ4 Aerospace"
   *   <strong>\n  ℝ\n  <sup>4</sup>\n  Aerospace  ->  "ℝ4Aerospace"
   *
   * Pretty-printing the brand lockup would have eaten the space between the
   * superscript and the following word on all nine pages, which is a content
   * change that no text diff of the rendered page would make obvious. */
  const hasText = kids.some((k) => k.nodeType === 3 && k.nodeValue.trim());
  const hasElement = kids.some((k) => k.nodeType === 1);
  const textOnly = kids.length > 0 && kids.every((k) => k.nodeType === 3);

  if (textOnly) {
    const inner = kids.map((k) => textToJsx(k.nodeValue)).join('');
    if (!inner.trim()) return `${pad}<${tag}${attrs} />\n`;
    return `${pad}<${tag}${attrs}>${inner.trim()}</${tag}>\n`;
  }

  if (hasText && hasElement) {
    // Emit children inline, preserving every space exactly as the source had it.
    const inner = kids
      .map((k) => {
        if (k.nodeType === 3) return textToJsx(k.nodeValue);
        if (k.nodeType !== 1) return '';
        return inlineJsx(k);
      })
      .join('');
    return `${pad}<${tag}${attrs}>${inner}</${tag}>\n`;
  }

  const body = kids.map((k) => elToJsx(k, indent + 2)).join('');
  if (!body.trim()) return `${pad}<${tag}${attrs} />\n`;
  return `${pad}<${tag}${attrs}>\n${body}${pad}</${tag}>\n`;
}

/* A child rendered without leading indentation, for inline mixed content. */
function inlineJsx(node) {
  const tag = tagOf(node);
  const attrs = attrToJsx(node);
  const kids = Array.from(node.childNodes);
  if (VOID.has(tag)) return `<${tag}${attrs} />`;
  const inner = kids
    .map((k) => {
      if (k.nodeType === 3) return textToJsx(k.nodeValue);
      if (k.nodeType !== 1) return '';
      return inlineJsx(k);
    })
    .join('');
  if (!inner) return `<${tag}${attrs} />`;
  return `<${tag}${attrs}>${inner}</${tag}>`;
}

function component(name, jsx, extraImports = []) {
  const imports = [
    "import Layout from '../chrome/Layout.tsx';",
    ...extraImports,
  ].join('\n');
  return `/* GENERATED by scripts/html-to-jsx.mjs from ${name}.html.
 * The copy in this file is the published copy: it was moved, not rewritten.
 * Edit it in place if you mean to change the site; do not regenerate. */

${imports}

export default function ${name}() {
  return (
    <Layout page="${name}">
${jsx}
    </Layout>
  );
}
`;
}

/* ---------------------------------------------------------------- chrome */

function extractChrome() {
  const dom = new JSDOM(readFileSync(join(ROOT, 'index.html'), 'utf8'));
  const doc = dom.window.document;
  const header = doc.querySelector('header.site-header');
  const footer = doc.querySelector('footer.site-footer');
  if (!header || !footer) throw new Error('chrome not found in index.html');

  const headerJsx = elToJsx(header, 4).replace(/\s+$/, '');
  const footerJsx = elToJsx(footer, 4).replace(/\s+$/, '');

  writeFileSync(
    join(ROOT, 'src/chrome/Header.tsx'),
    `/* GENERATED from the header that used to be copy-pasted into eight files.
 * There is now one. Nav labels and hrefs are the published ones. */

export default function Header() {
  return (
${headerJsx}
  );
}
`,
  );

  writeFileSync(
    join(ROOT, 'src/chrome/Footer.tsx'),
    `/* GENERATED from the footer that used to be copy-pasted into eight files. */

export default function Footer() {
  return (
${footerJsx}
  );
}
`,
  );

  return {
    skip: elToJsx(doc.querySelector('a.skip-link'), 4).trim(),
  };
}

/* ------------------------------------------------------------------ head */

function extractHeadMeta(file) {
  const dom = new JSDOM(readFileSync(join(ROOT, file), 'utf8'));
  const doc = dom.window.document;
  const meta = (sel, attr = 'content') =>
    doc.querySelector(sel)?.getAttribute(attr) ?? '';
  return {
    title: doc.querySelector('title')?.textContent ?? '',
    description: meta('meta[name="description"]'),
    themeColor: meta('meta[name="theme-color"]'),
    robots: meta('meta[name="robots"]'),
    ogTitle: meta('meta[property="og:title"]'),
    ogDescription: meta('meta[property="og:description"]'),
    ogType: meta('meta[property="og:type"]'),
    ogImage: meta('meta[property="og:image"]'),
    bodyClass: doc.body.getAttribute('class') ?? '',
    hasChrome: Boolean(doc.querySelector('header.site-header')),
  };
}

/* ----------------------------------------------------------------- pages */

const preserved = [];

function extractPage(key, file, name) {
  /* Five pages carry hand-written islands — FilterGrid, SearchableList,
   * Counter, the contact form's onSubmit — that this script cannot generate.
   * They are marked and left alone, so re-running the codemod stays safe. */
  const outPath = join(ROOT, `src/pages/${name}.tsx`);
  if (existsSync(outPath) && readFileSync(outPath, 'utf8').includes('@preserve')) {
    preserved.push(name);
    return;
  }

  const html = readFileSync(join(ROOT, file), 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const main = doc.querySelector('main');
  if (!main) throw new Error(`no <main> in ${file}`);

  /* Everything the original document put between </header> and <main>.
   *
   * On seven pages that is <section class="page-hero"> — the breadcrumb, the
   * <h1> and the lead paragraph. Taking only main.childNodes, as the first
   * version of this script did, silently dropped the entire page header from
   * every content page: the result renders fine and looks deliberate, which is
   * exactly why it is caught here rather than left to a screenshot review. */
  const SKIP_TAGS = new Set(['A', 'HEADER', 'FOOTER', 'SCRIPT', 'STYLE', 'NOSCRIPT']);
  const preMain = [];
  for (const el of Array.from(doc.body.children)) {
    if (el === main) break;
    if (SKIP_TAGS.has(el.tagName)) continue;
    preMain.push(el);
  }

  const mainAttrs = attrToJsx(main).trim();
  const body = Array.from(main.childNodes)
    .map((k) => elToJsx(k, 6))
    .join('')
    .replace(/\s+$/, '');

  const heroInner = preMain
    .map((el) => elToJsx(el, 6))
    .join('')
    .replace(/\s+$/, '');

  // technology.html carries an 84-line inline stylesheet; it becomes a module.
  const styleEl = doc.head.querySelector('style');
  const extraImports = [];
  if (styleEl) {
    writeFileSync(join(ROOT, `src/pages/${key}.css`), styleEl.textContent.trim() + '\n');
    extraImports.push(`import '../pages/${key}.css';`);
  }

  // Layout renders <main>, so the page hands it the inner content only, plus
  // any class the original main element carried.
  const cls = main.getAttribute('class');

  const heroBlock = heroInner
    ? `/* The band above <main>: breadcrumb, page title and lead. */
function Hero() {
  return (
    <>
${heroInner}
    </>
  );
}

`
    : '';

  const src = `/* GENERATED by scripts/html-to-jsx.mjs from ${file}.
 * The copy in this file is the published copy: every word was moved here by a
 * parser, not retyped. Verify with the rendered-text diff before editing. */

import Layout from '../chrome/Layout.tsx';
${extraImports.join('\n')}${extraImports.length ? '\n' : ''}
${heroBlock}export default function ${name}() {
  return (
    <Layout page="${key}"${cls ? ` mainClass="${cls}"` : ''}${heroInner ? ' hero={<Hero />}' : ''}>
${body}
    </Layout>
  );
}
`;

  if (mainAttrs) void mainAttrs;

  /* Hard stop, not a warning: the failure mode is a page that renders cleanly
   * with its heading missing. The hero may legitimately live inside <main> —
   * 404.html does exactly that — so the check is that it is present *somewhere*
   * in the generated file, not that it landed in the hero slot. */
  const generated = src + body + heroInner;
  if (doc.querySelector('.page-hero') && !/page-hero/.test(generated)) {
    throw new Error(`${file}: .page-hero exists in the source but was not captured`);
  }

  writeFileSync(join(ROOT, `src/pages/${name}.tsx`), src);
}

/* ------------------------------------------------------------------ main */

mkdirSync(join(ROOT, 'src/chrome'), { recursive: true });
mkdirSync(join(ROOT, 'src/pages'), { recursive: true });

/* Guard: once the build has published generated documents to the root, the
 * hand-maintained sources this codemod reads no longer exist there. Running it
 * against its own output would be a silent no-op that looks like success. */
for (const [, file] of PAGES) {
  if (readFileSync(join(ROOT, file), 'utf8').includes('id="root"')) {
    throw new Error(
      `${file} is already a generated document, so the hand-maintained source ` +
      `it was built from is not here. Restore the pre-migration copy first: ` +
      `git log --oneline -- ${file}   # then git show <that commit>:${file} > ${file}`,
    );
  }
}

const { skip } = extractChrome();
writeFileSync(
  join(ROOT, 'src/chrome/skipLink.tsx'),
  `/* GENERATED: the skip link, from the top of every page. */

export default function SkipLink() {
  return (
${skip}
  );
}
`,
);

const registry = {};
for (const [key, file, name] of PAGES) {
  extractPage(key, file, name);
  registry[key] = { file, ...extractHeadMeta(file) };
}

writeFileSync(
  join(ROOT, 'src/site.ts'),
  `/* GENERATED by scripts/html-to-jsx.mjs.
 * Per-page document head data and the filename each page publishes as.
 * These strings are the published metadata; they were moved, not rewritten. */

export type PageKey = ${Object.keys(registry).map((k) => `'${k}'`).join(' | ')};

export const PAGES: Record<PageKey, {
  file: string;
  title: string;
  description: string;
  themeColor: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogImage: string;
  bodyClass: string;
  hasChrome: boolean;
}> = ${JSON.stringify(registry, null, 2)};
`,
);

console.log('generated:');
console.log('  src/chrome/Header.tsx  Footer.tsx  skipLink.tsx');
console.log('  src/pages/*.tsx        (9 pages)');
console.log('  src/site.ts            (head metadata registry)');
if (preserved.length) {
  console.log(`  preserved by @preserve: ${preserved.join(', ')}`);
}
