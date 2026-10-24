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
| `/technology` | `technology.html` | Insight Set and R Analytics |
| `/applications` | `applications.html` | Dual-use application portfolio |
| `/defence` | `defence.html` | Defence and security applications |
| `/civil` | `civil.html` | Civil, environmental, and commercial applications |
| `/company` | `company.html` | Principles, roadmap, team, and FAQ |
| `/careers` | `careers.html` | Career disciplines and internships |
| `/contact` | `contact.html` | Contact information, enquiry form, and office map |
| *(error)* | `404.html` | Not indexed, not linked, not in the sitemap |

## Addresses

A request for `/technology` has no extension, so GitHub Pages appends one and
serves `technology.html`. Both forms answer 200 with identical bytes, and Pages
offers no way to 301 one to the other — it has no rewrite engine. The site
therefore links extensionlessly, lists extensionless `<loc>` entries in
`sitemap.xml`, and declares the extensionless form as `rel=canonical` and
`og:url` on every indexable page, which is what tells a crawler that the surviving
`.html` response is the same page and not a competing one.

The rule lives in `src/urls.ts` and is applied by `scripts/html-to-jsx.mjs`, so a
regeneration produces the same form rather than restoring the suffix.

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

## Source and build

Those eight, plus `404.html`, are **generated** — along with `assets/`. The
source is in `src/`: one `Header` and one `Footer` instead of the eight copies
each that used to be pasted around the site, one component per page, and the
interactive pieces (filters, FAQ search, counters, the enquiry form) as
components rather than as one script that patched the DOM after load.

    npm install
    npm run dev      # Vite dev server with hot reload
    npm run build    # writes the nine .html files and assets/ into this directory
    npm run serve    # preview the built site, resolving URLs the way Pages does
    npm run verify   # diffs the built pages against a content baseline

`verify` compares the built pages against an older tree, defaulting to
`/tmp/r4-base`. Point it at the last pre-migration commit, not at `HEAD` — once
the generated files are committed, comparing them to `HEAD` proves nothing:

    rm -rf /tmp/r4-base && mkdir -p /tmp/r4-base
    git archive <pre-migration-commit> | tar -x -C /tmp/r4-base
    node scripts/verify-content.mjs
    npm run codemod  # one-time HTML -> JSX conversion; see scripts/html-to-jsx.mjs

Commit the generated files. GitHub Pages serves this branch's root with no
build step and no build configuration, so shipping a change means committing
its output. What did not change: the nine filenames on disk, the `CNAME`, the
media at their root-relative paths, and every word on every page. What did: the
addresses visitors see, and the `<loc>` entries in `sitemap.xml` that name them.

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
