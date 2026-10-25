# R4 Aerospace & Defence — Multi-page Website

This package converts the original single-page website into a responsive multi-page architecture.

## Retained media paths

Place the existing media files in the same root directory as `index.html`:

- `LOGO.png`
- `BG.jpg`
- `4D2.png`
- `D3.png`
- `BG2.png`

The site loads the derived WebP siblings (`logo.webp`, `BG.webp`, `BG2.webp`,
`4D2.webp`, `D3.webp`, `mark-128.png`) rather than the large sources above.
See `ASSET-MANIFEST.txt` for the derivation of each and the case-insensitive
volume warning that governs how they are regenerated.

`Intro.mp4` and `4.mp4` have been removed; the home hero and the
operational-problem figure use still images instead.

The published *addresses* no longer carry `.html`; the files still do. See
"Addresses" below for why those are two different sentences.

## Pages

| Address | File | Subject |
|---|---|---|
| `/` | `index.html` | Home |
| `/technology` | `technology.html` | How the system sees, fuses, and decides |
| `/applications` | `applications.html` | One system, many missions |
| `/defence` | `defence.html` | Defence and security applications |
| `/civil` | `civil.html` | Civil, environmental, and commercial applications |
| `/company` | `company.html` | Mission, principles, roadmap, team, and FAQ |
| `/investors` | `investors.html` | The thesis, the system, and the pre-seed round |
| `/careers` | `careers.html` | Career disciplines and internships |
| `/contact` | `contact.html` | Contact information, enquiry form, and registered location |
| *(error)* | `404.html` | Not indexed, not linked, not in the sitemap |

## Addresses

A request for `/technology` has no extension, so GitHub Pages appends one and
serves `technology.html`. Both forms answer 200 with identical bytes, and Pages
offers no way to 301 one to the other — it has no rewrite engine. The site
therefore links extensionlessly, lists extensionless `<loc>` entries in
`sitemap.xml`, and declares the extensionless form as `rel=canonical` and
`og:url` on every indexable page, which is what tells a crawler that the surviving
`.html` response is the same page and not a competing one.

The rule lives in `src/urls.ts` and is applied by `src/server.tsx` during
prerendering, so every generated document declares the same canonical form.

Links are relative (`technology`, `./` for home) rather than root-absolute
(`/technology`) because this repository answers to two hostnames — the apex at
`www.r4space.com` and one level down at `Ravan14.github.io/R4`. A root-absolute
link is correct on the first and a 404 on the second.

**Preview with `npm run serve`, not `python -m http.server`.** The Python server
maps a request onto a file and nothing else, so it 404s on `/technology` while
Pages 200s — every internal link would look broken locally and fine in
production. `scripts/serve.mjs` resolves in the same order Pages does and serves
`404.html` with a real 404 status. Opening the documents straight from disk no
longer navigates, for the same reason.

## Source, architecture, and build

The nine public documents, `404.html`, and `assets/` are **generated**. The
maintained source is in `src/`: one shared header/footer, one static React
component per page, and small vanilla TypeScript controllers in `src/client.ts`.
React and React DOM are development-only dependencies used by
`react-dom/server`; neither is included in the browser bundle.

    npm install
    npm run dev        # watch, rebuild, prerender, and serve on port 8080
    npm run build      # write the ten HTML files and assets/ into this directory
    npm run serve      # serve the existing build with Pages-style URLs
    npm run typecheck  # TypeScript validation without emitting files
    npm run verify     # design-token contrast plus structural integrity
    npm run measure    # design metrics against a running local server

`npm run dev` starts the preview after its first successful build. Later source
changes rebuild the generated site; refresh the browser to see them. It does
not use Vite's hydration/HMR entry or the retired `?page=` development route.

The static HTML exposes navigation, filters, FAQ entries, the contact form, and
final KPI values without JavaScript. Controllers add mobile menus, the
Applications dropdown, filtering, FAQ search, and exact `mailto:` formatting.
CSS scroll timelines optionally add section reveals, reading progress, header
condensation, and back-to-top visibility. Reduced-motion, printing, and browsers
without scroll-timeline support retain visible, functional content.

The design contract lives in `src/styles.css`: Inter weights 400–800, the
`#1D4ED8` brand ramp, `#F1F4FD` secondary surfaces, large/small section spacing,
and asymmetric grid tokens. Inline SVG diagrams and the inline India flag make
no external requests. The embedded map and remote font/flag dependencies are
removed; external map and social links still work when selected.

Current generated-output budgets from the local production build:

| Asset | Raw | Gzip |
|---|---:|---:|
| Browser JavaScript | 3,528 bytes | 1.46 KB |
| Stylesheet | 29,089 bytes | 6.61 KB |
| Inter Latin variable WOFF2 | 48,432 bytes | — |
| Shared `BG.webp` hero | 88,772 bytes | — |

`verify` proves the built tree is structurally sound rather than comparing it
against an older one: every page file exists, every internal link and fragment
resolves, every relative asset exists, images carry alt text, indexable pages
declare title/description/canonical/og:url, only `404.html` declares noindex,
and `sitemap.xml` lists exactly the indexable pages at their canonical
addresses. The pre-migration word-parity baseline is retired — the content
replan (CONTENT-REPORT.md) rewrote the copy on purpose.

The HTML-to-JSX codemod is retired. `scripts/html-to-jsx.mjs` remains only as
historical tooling and is intentionally absent from routine npm scripts; do not
run it against the maintained page source.

Commit generated files only with release approval. GitHub Pages serves this
branch's root without a build step, so the approved source and generated output
must correspond. Root filenames, `CNAME`, media paths, routes, metadata, and
visible copy remain part of the publication contract.

## Deployment

Upload every HTML file, the `assets/` directory, and the media files listed in
`ASSET-MANIFEST.txt` to the same web-root directory. The package works with
static hosting and requires no build process on the host — the build runs here,
and its output is what gets committed.

One host requirement: because the links are extensionless, the server must be
able to resolve `/technology` to `technology.html`. GitHub Pages, Netlify, and
Cloudflare Pages all do. A plain `nginx` or Apache root will not until you add
the equivalent of `try_files $uri $uri.html /index.html`, and every internal link
will 404 without it.

For local review use `npm run serve`. Opening `index.html` straight from disk no
longer navigates, and `python -m http.server` resolves only exact filenames, so
both disagree with production on the one thing the URLs depend on.

## Additional deployment files

- `404.html` — static error page
- `robots.txt` — search-engine access rules
- `sitemap.xml` — public page index
- `ASSET-MANIFEST.txt` — exact retained root-relative media paths
