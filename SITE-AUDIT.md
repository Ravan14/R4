# R4 Aerospace & Defence — Site and URL Audit

Audited 24 October 2026 against the live site at `https://www.r4space.com` and the
committed build at `9d84ebd` on `main`. Every status code, byte count and link
count below was measured, not inferred; the "basis" column in `site-audit.tsv`
names the command that produced each figure.

---

## 1. Why every page still ends in `.html`

Short answer: **because the file on disk is called `technology.html`, and nothing
has asked it to be anything else.** It is not a React or Vite limitation, and —
the part worth knowing — the extensionless form already works.

The published site is the repository root. GitHub Pages takes the branch and
serves it as a file tree with no build step, no rewrite engine and no server you
control. So the document `technology.html` is reachable at `/technology.html`
because that is its filename. The migration changed how the file is *made*, not
what it is *called*, because the filename is the one contract the site could not
break: `CNAME`, `sitemap.xml`, every internal link, and any link someone else has
already pointed at r4space.com all name the `.html` form.

What most people assume is that removing `.html` requires a server. It does not.
Measured live today:

| Request | Status | What happened |
|---|---|---|
| `/technology.html` | 200 | served |
| `/technology` | 200 | **served — same bytes, same `etag: "6adca0b6-5d2f"`** |
| `/technology/` | 404 | directory form, needs `technology/index.html` |
| `/index.html` | 200 | served |
| `/index` | 200 | served |
| `/` | 200 | served |
| `/TECHNOLOGY.html` | 404 | the host is case-sensitive |
| `/technology.HTML` | 404 | ditto |
| `/nope-not-here` | 404 | serves `404.html` |
| `/styles.css` | 404 | correctly gone — moved to `src/` and bundled |
| `/main.js` | 404 | correctly gone — retired in `17b2325` |
| `/One%20pager` | 200 | see finding F4 |

GitHub Pages appends `.html` when a path has no extension, so `/technology` and
`/technology.html` are **the same document at two addresses**, byte for byte. The
site is already extensionless-capable. The `.html` survives in the links and the
sitemap as a naming convention, not a constraint.

That fact is what turns a cosmetic question into a real finding — see F2.

---

## 2. Every page that exists

Nine published documents. Eight are indexable; `404.html` is not.

| # | File | URL | Page title | `<h1>` | Words | H2 | H3 | Img | Doc | Sitemap | Prio | In-links |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `index.html` | `/` | R4 Aerospace & Defence \| Integrated Earth Intelligence | Integrated Earth Intelligence | 405 | 5 | 8 | 5 | 13.8 KB | yes | 1.0 | 1 |
| 2 | `technology.html` | `/technology.html` | Technology \| R4 Aerospace & Defence | From isolated observations to integrated Earth intelligence. | 891 | 8 | 23 | 3 | 23.3 KB | yes | 0.9 | 4 |
| 3 | `applications.html` | `/applications.html` | Applications \| R4 Aerospace & Defence | A common Earth-intelligence architecture for heterogeneous mission domains. | 434 | 4 | 16 | 5 | 14.5 KB | yes | 0.9 | 4 |
| 4 | `defence.html` | `/defence.html` | Defence & Security Applications \| R4 Aerospace & Defence | Sovereign Earth intelligence for persistent operational awareness. | 427 | 4 | 9 | 4 | 12.7 KB | yes | 0.8 | 2 |
| 5 | `civil.html` | `/civil.html` | Civil & Commercial Applications \| R4 Aerospace & Defence | Earth intelligence for environmental, public-safety, and industrial systems. | 441 | 5 | 16 | 4 | 12.6 KB | yes | 0.8 | 2 |
| 6 | `company.html` | `/company.html` | Company \| R4 Aerospace & Defence | Building an integrated Earth-intelligence capability from orbital sensing to decision systems. | 503 | 6 | 14 | 4 | 13.1 KB | yes | 0.7 | 2 |
| 7 | `careers.html` | `/careers.html` | Careers \| R4 Aerospace & Defence | Work on distributed space systems and integrated Earth intelligence. | 363 | 3 | 19 | 3 | 11.8 KB | yes | 0.6 | 1 |
| 8 | `contact.html` | `/contact.html` | Contact \| R4 Aerospace & Defence | Initiate a technical, institutional, or strategic discussion. | 201 | 1 | 7 | 3 | 11.9 KB | yes | 0.7 | 7 |
| 9 | `404.html` | *(error)* | Page Not Found \| R4 Aerospace & Defence | 404 | 12 | 0 | 0 | 0 | 1.4 KB | no — `noindex` | — | 0 |

Totals: 3,667 words of visible copy across the eight public pages, 32 images, one
form, one embedded map. "In-links" counts links from inside `<main>` on other
pages, so header and footer chrome is excluded — `contact.html` at 7 is the
conversion hub every page's CTA points at, which is the intended shape.

## 3. How the pages are wired together

The header carries six top-level destinations on every page — Home, Technology,
Applications (a dropdown holding Application Portfolio, Defence & Security, Civil
& Commercial, each with a one-line description), Company, Careers, Contact. The
logo links `index.html`. The footer repeats all eight pages plus
`mailto:info@r4space.com`, `tel:+919487266145`, the Puliampatti address on Google
Maps, and the LinkedIn company page. Those two external hosts are the only
outbound destinations anywhere on the site.

`sitemap.xml` lists exactly the eight indexable pages, `/` for home, with the
priorities in the table above. `robots.txt` is `Allow: /` for all agents plus the
sitemap URL. `404.html` carries `noindex` and is correctly absent from the
sitemap. The sitemap and the published documents agree completely — no orphan and
no phantom entry.

## 4. Anchor and deep-link map

Six in-page anchors are linked from chrome, so each is reachable from all eight
pages. Every one resolves to a real `id` in the served document:

| Target | Linked label | `id` exists |
|---|---|---|
| `technology.html#insight-set` | Insight Set | yes |
| `technology.html#analytics` | ℝ Analytics | yes |
| `technology.html#framework` | 4D Framework | yes |
| `technology.html#capabilities` | Capabilities | yes |
| `applications.html#portfolio` | Application Portfolio | yes |
| `applications.html#delivery` | Intelligence Delivery | yes |

Zero broken anchors. Other `id`s exist for component wiring rather than
navigation and are correctly never linked: `timing-chart-title`,
`timing-chart-caption` and `zoneGradient` on technology, `faqSearch` on company,
and the seven field ids on the contact form.

---

## 5. Findings

**F2 — every page is reachable at two or three addresses and none of them is
declared canonical. (Medium, worth fixing.)**
There is no `<link rel="canonical">` on any of the nine documents, and no
`og:url`. Combined with the extensionless behaviour in section 1, that means
`/technology` and `/technology.html` are both live, both indexable, and
indistinguishable to a crawler; home is triply reachable as `/`, `/index` and
`/index.html`. Search engines resolve this by picking one, which splits any link
equity you earn between the two forms and can surface the URL you did not
intend. This is the only finding in the report that is a genuine defect rather
than a trade-off, and it exists in the pre-migration site too — the migration
just made it a one-file fix.

**F4 — an investor one-pager is sitting in the web root, publicly downloadable.
(High, your call.)**
`One pager` is a 36,646-byte HTML document tracked in git at the repository root,
with no extension, no link pointing to it and no sitemap entry. It is live:
`https://www.r4space.com/One%20pager` returns 200 and the full 36 KB, typed
`application/octet-stream` so a browser offers it as a download instead of
rendering it. Its title is "R4 Aerospace – Real-Time Multi-Modal Earth
Intelligence" and its sections read *Vision · The Critical Intelligence Gap · The
"Insight Set" Constellation · Deep Technology Moat · Investment Opportunity*. It
also carries a different phone number from the public site — `+91 80567 86145`
against the contact page's `+91 94872 66145`.

It predates this work (it arrived in `b535fc1`) and nothing in the migration
touched it. Unlinked is not the same as private: the URL is guessable, it is in
the repository, and it is in the git history. Whether a public "Deep Technology
Moat / Investment Opportunity" document is a problem is a judgement only you can
make — I have left it exactly where it was.

**F5 — the trailing-slash form 404s.** `/technology/` is dead because Pages only
finds a directory index at `technology/index.html`. Not a defect; it is the cost
of the flat-file layout, and it matters only if you want that specific shape.

**F6 — the host is case-sensitive.** `/TECHNOLOGY.html` 404s. Correct behaviour,
but it means a mistyped or auto-capitalised link from someone else's document
lands on the 404 page. The 404 page handles that gracefully, so no action.

**F1 — `.html` in the URLs is a naming convention, not a limitation.** Recorded
as context, not a problem. Section 6 gives the options if you want it gone.

---

## 6. If you do want the `.html` gone

Three routes, in the order I would take them.

**A. Keep the filenames, declare the canonical. ~6 lines, one file.**
Add `<link rel="canonical" href="https://www.r4space.com/technology.html" />` and
the matching `og:url` inside `head()` in `src/server.tsx`. Because the head is now
shared code rather than pasted into nine documents, this is a single edit that
lands on every page at the next build, and it closes F2 outright. URLs stay
exactly as they are, so nothing that already points at the site breaks. This is
what I would ship.

**B. Go extensionless for real. ~30 edits, and it does not fully work here.**
Drop `.html` from the sitemap, from every internal href, and from the canonical —
`src/server.tsx` plus the header, footer and nine page components. The catch is
that Pages will not 301 `/technology.html` to `/technology`; it keeps serving the
old address with a 200, so you have traded one duplicate pair for another and
broken any external link you did not write. Doing this properly means moving each
page to `technology/index.html`, which changes every URL, invalidates the
`ASSET-MANIFEST.txt` rule that fixes the filenames, and 404s anything that already
links you.

**C. Move the host, get real redirects.** Cloudflare Pages or Netlify will 301
`.html` to the extensionless form in a `_redirects` file, and keep the CNAME.
You gain clean URLs and lose the property that makes this repo work today: the
branch root *is* the site, with no build configuration on the host and no third
party in the path. For a nine-page brochure site I would not pay that.

Recommendation: **A**. It removes the only real defect in this report and leaves
the published contract untouched.

## 7. Also verified while measuring

The deployed build is the current one — `https://www.r4space.com/technology.html`
references `assets/index-BIIJpcAX.js` and `assets/index-DbnbuiPk.css`, matching
`assets/` in the working tree byte for byte, so the push in `9d84ebd` is live.
`lang="en"` is set on all nine documents. Every page loads exactly one script, the
bundled React entry. Content parity against the pre-migration baseline is
independently enforced by `npm run verify`, which exits 0 on all nine pages.
