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

The filenames and relative paths of the pages themselves are unchanged.

## Pages

- `index.html` — Home
- `technology.html` — Insight Set and R Analytics
- `applications.html` — Dual-use application portfolio
- `defence.html` — Defence and security applications
- `civil.html` — Civil, environmental, and commercial applications
- `company.html` — Principles, roadmap, team, and FAQ
- `careers.html` — Career disciplines and internships
- `contact.html` — Contact information, enquiry form, and office map

## Source and build

Those eight, plus `404.html`, are **generated** — along with `assets/`. The
source is in `src/`: one `Header` and one `Footer` instead of the eight copies
each that used to be pasted around the site, one component per page, and the
interactive pieces (filters, FAQ search, counters, the enquiry form) as
components rather than as one script that patched the DOM after load.

    npm install
    npm run dev      # Vite dev server with hot reload
    npm run build    # writes the nine .html files and assets/ into this directory
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
its output. Nothing else about the published site changed: same nine filenames,
same `CNAME`, same `sitemap.xml`, same media at the same root-relative paths.

## Deployment

Upload every HTML file, the `assets/` directory, and the media files listed in
`ASSET-MANIFEST.txt` to the same web-root directory. The package works with
static hosting and requires no build process on the host — the build runs here,
and its output is what gets committed.

For local review, open `index.html` directly or serve this directory with any static HTTP server.

## Additional deployment files

- `404.html` — static error page
- `robots.txt` — search-engine access rules
- `sitemap.xml` — public page index
- `ASSET-MANIFEST.txt` — exact retained root-relative media paths
