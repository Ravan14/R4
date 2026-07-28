# R4 Aerospace & Defence — Multi-page Website

This package converts the original single-page website into a responsive multi-page architecture.

## Retained media paths

Place the existing media files in the same root directory as `index.html`:

- `LOGO.png`
- `BG.jpg`
- `Intro.mp4`
- `4.mp4`
- `4D2.png`
- `D3.png`

The filenames and relative paths are unchanged.

## Pages

- `index.html` — Home
- `technology.html` — Insight Set and R Analytics
- `applications.html` — Dual-use application portfolio
- `defence.html` — Defence and security applications
- `civil.html` — Civil, environmental, and commercial applications
- `company.html` — Principles, roadmap, team, and FAQ
- `careers.html` — Career disciplines and internships
- `contact.html` — Contact information, enquiry form, and office map

## Deployment

Upload every HTML file, `styles.css`, `main.js`, and the six retained media files to the same web-root directory. The package works with static hosting and requires no build process.

For local review, open `index.html` directly or serve this directory with any static HTTP server.

## Additional deployment files

- `404.html` — static error page
- `robots.txt` — search-engine access rules
- `sitemap.xml` — public page index
- `ASSET-MANIFEST.txt` — exact retained root-relative media paths
