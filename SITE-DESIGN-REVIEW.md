# UI Alignment Review: Needs fixes

Target site: `https://www.r4space.com` — measured against the local build at
`http://127.0.0.1:8080` (byte-identical output).
Complaints under review, in the words they arrived in:

1. "The whole site is not using a Minimalist Simple colour Design language."
2. "A rich experience is not there across the site."
3. "Scrolling experience is worst."

## Summary

The colour complaint is the one the measurements contradict. The site is
disciplined to the point of severity: 376 token references against 18 raw hex
and 20 `rgba()` in a 986-line stylesheet, one accent hue, every ink annotated
with its contrast ratio. Nothing is off-language. What the measurements do
confirm is the other two, and they share one cause — the page has no
**contrast of scale, band, or motion**. Below the hero, every page is white and
pale grey at the same size, with nothing moving, and on `/technology` one
section runs 3,125px unbroken.

There is also a specific regression, not a preference: the scroll-reveal
animation existed before the restyle, the restyle deleted its CSS, and the
migration then stripped the classes. All eight pages now render **zero
`@keyframes` and zero animated elements** at both viewports. The site was
static before; it became staticer.

Verdict: **Needs fixes.** Six findings below, three of them must-fix.

## Reference Mapping

| | |
|---|---|
| Screens | All 8 public pages plus `404.html` |
| Approved design reference | **None exists.** No `DESIGN.md`, no `SCREEN_SPEC.md`, no `design.qa.yaml`, no baseline screenshots |
| What stands in for it | The token contract in `src/styles.css:6-45`, and the `pre-redesign` git tag for behaviour that existed before |
| Implementation | Built HTML served by `scripts/serve.mjs` (Pages-faithful), same files as production |
| Viewports | 1440×900 and 390×844, device scale 1 |
| Mode | Conformance to the token spec + regression against `pre-redesign` |
| Dynamic regions masked | None |
| Evidence quality | Partial — strong on rendered geometry and computed style, no approved visual target to compare against |

Because there is no approved reference, nothing below is "the build does not
match the design." It is "the design itself is under-specified in three places:
band rhythm, visual density, and motion."

## Measured, both viewports

Full table in [`site-design-metrics.tsv`](/Users/subashpkuppusamy/Developer/R4/site-design-metrics.tsv)
(16 rows, opens in Excel). At 1440×900:

| Page | Screens | Bands | Bands with no visual | Tallest band | White | Tint | Dark | Rendered type | Images | Keyframes | Animated |
|---|---|---|---|---|---|---|---|---|---|---|---|
| index | 5.2 | 6 | 2 | 1,047px | 76% | 24% | 0% | 13–61px | 5 | 0 | 0 |
| technology | 8.2 | 6 | **5** | **3,125px** | 79% | 21% | 0% | 13–48.8px | 3 | 0 | 0 |
| applications | 5.3 | 4 | 2 | 1,359px | 65% | 35% | 0% | 13–48.8px | 5 | 0 | 0 |
| defence | 4.6 | 4 | 3 | 1,151px | 65% | 35% | 0% | 13–48.8px | 4 | 0 | 0 |
| civil | 4.9 | 5 | 4 | 1,215px | 70% | 30% | 0% | 13–48.8px | 4 | 0 | 0 |
| company | 6.1 | 6 | 5 | 1,300px | 70% | 30% | 0% | 13–48.8px | 4 | 0 | 0 |
| careers | 3.7 | 3 | **3** | 1,260px | 75% | 25% | 0% | 13–48.8px | 3 | 0 | 0 |
| contact | 3.3 | 2 | 1 | 1,570px | 74% | 26% | 0% | 13–48.8px | 3 | 0 | 0 |

"Dark" is 0% on every page. The one dark band on an interior page is the hero,
above the fold. After it, nothing — with two nested exceptions, a 465px image
plate on `/applications` and one on `/company`, too small to register in a
band-level share.

## Must Fix

### 1. Scroll reveal was deleted, and the classes that drove it were stripped

- **Category:** state / behaviour
- **Evidence:** `git show pre-redesign:styles.css` lines 437-438:
  ```css
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: none; }
  ```
  driven by a `main.js` IntersectionObserver at threshold 0.12, on 12 elements
  in `index.html` and 32 in `technology.html`. The restyle removed the CSS;
  `scripts/html-to-jsx.mjs:121-123` then filtered `reveal` out of every
  className during the port, with the comment "every one of the 151 survivors
  is inert weight." That was correct at the time and left a hole.
- **Observed:** 0 `@keyframes` rules, 0 elements with a non-`none`
  `animation-name`, on all 8 pages at both viewports. The only motion in the
  site is 9 hover/focus transitions and one counting animation
  (`src/widgets/Counter.tsx:32`).
- **Expected:** content arriving in stages as you scroll, the way it did before.
- **Likely cause:** two steps of a migration each removed half of a feature and
  nobody re-joined them.
- **Recommended fix:** a `<Reveal>` component wrapping section heads and card
  grids, using the same IntersectionObserver idea, with token timing
  (`--dur-2` is 200ms; the old 700ms was too slow for the current system —
  suggest ~450ms with `--ease`), `transform: translateY(12px)`, and:
  it must be opt-in from the client entry (add a class to `<html>` when React
  boots) so that with JavaScript off, or before hydration, nothing is hidden.
  The old CSS had that bug — `opacity: 0` in the stylesheet meant invisible
  content for crawlers and no-JS readers. Fix it while restoring it.
  Honour the existing `prefers-reduced-motion` block at `src/styles.css:979`.
- **Verification:** re-run `node scripts/measure-design.mjs`; `animated` should
  be non-zero on pages with reveals, and `curl`-fetched HTML with JS disabled
  must show every section at full opacity.

### 2. `/technology` has a 3,125px single band

- **Category:** layout
- **Evidence:** `section#insight-set` measures 3,125px tall at 1440×900 — 3.5
  screens with no band change — holding 4,131 characters, a four-card grid, a
  comparison table, a bubble chart and a pull-quote. At 390×844 the same section
  is 4,772px (5.7 screens).
- **Observed:** the reader scrolls two full screens of white before the surface
  changes colour once.
- **Expected:** a section should be roughly one idea, one screen, one surface.
- **Likely cause:** the restyle normalised structure but never capped band
  length; the content was ported verbatim, so the pre-redesign page had the
  same lump.
- **Recommended fix:** split `#insight-set` into three bands — the three
  sensing modes, the comparison table, the temporal-richness chart — and give
  the middle one `section-tint` so the eye registers a new movement. Keep the
  anchor `#insight-set` on the first so existing deep links still land.
  Add a guard to the measurement script later if you want this to stay fixed
  (e.g. fail any band over 1,600px).
- **Verification:** `tallest_band_px` ≤ 1,600 for every page in
  `site-design-metrics.tsv`.

### 3. Five of six bands on `/technology` and `/company`, and all three on
    `/careers`, contain no visual at all

- **Category:** asset / layout
- **Evidence:** the "Bands with no visual" column above; totals are 3-5 images
  per page across 2-6 bands. The site's whole photographic inventory is four
  files — `BG.webp`, `BG2.webp`, `D3.webp`, `4D2.webp` — and three of them are
  used once or twice.
- **Observed:** long stretches of headline + paragraph + bordered cards. The
  screenshot at [`.design-qa/actual/company-1440x900.png`](/Users/subashpkuppusamy/Developer/R4/.design-qa/actual/company-1440x900.png)
  is the typical case.
- **Expected:** a reader scanning `/technology` gets one image (the hero) and
  one chart for 8 screens.
- **Likely cause:** the original build had a video hero and Font Awesome icon
  tiles; the restyle replaced the icons with type and the video with a still,
  and nothing was put back in their place.
- **Recommended fix:** this is a content decision, not a CSS one, so it needs
  your input. Three options that stay inside the language: (a) put the two
  unused plates (`BG2.webp`, `4D2.webp`) into `/technology` and `/company` as
  full-bleed `media-frame--dark` bands; (b) build non-photographic anchors —
  the constellation geometry, the 4D framework, the acquisition timeline — as
  inline SVG diagrams in `--accent` and `--line`, which suits an aerospace
  reader better than stock imagery; (c) both, with (b) for the technical pages
  and (a) for company/careers.
- **Verification:** "Bands with no visual" drops to ≤ 2 on every page.

## Should Fix

### 4. The dark band exists in the system and is used three times in total

- **Category:** token
- **Evidence:** `--surface-inverse: #0B1220` with a full re-scoped token block
  above it (`src/styles.css:190-202` — ink, muted, faint, accent and line all
  swapped for dark-band values, `--accent-on-dark` at 11.2:1, so no component
  needs a dark twin). Three selectors get it: `.page-hero`, `.mission-map`,
  `.media-frame--dark`. Across the nine pages that resolves to seven heroes
  (all above the fold), one `.mission-map` image on `/applications` (465px) and
  one `.media-frame--dark` on `/company`. The CTA panel (`:824`) and the footer
  (`:837`) both take `--surface-sunken` — the same pale grey as the mid-page
  tint bands.
- **Observed:** the paint-share table counts top-level bands, so it reads 0%
  dark below the fold on all eight pages; the two nested dark elements above
  are the entire exception, at 5.5% and 6% of their pages. The rest of the site
  ends in the colour it spent its middle in.
- **Recommended fix:** move the closing CTA panel and the footer onto the
  inverse band. The tokens are already written for it, so this is a class
  change, not a redesign. One dark anchor per page below the fold is the single
  highest-leverage change on this list for "richness," and it costs nothing in
  contrast because the dark values were computed for it.
- **Verification:** `dark_share` ≥ 8% on every page.

### 5. Every section has identical padding, so there is no spacing rhythm

- **Category:** spacing
- **Evidence:** `.section { padding: clamp(var(--s-8), 8vw, var(--s-10)) 0 }`
  (`:128`) — one rule for every band. Measured pad-top: 115.2px on all six
  `/technology` bands at 1440, 64px on all of them at 390 (the clamp floor).
  Only `.section-sm` breaks it, and it appears once per page.
- **Observed:** bands cannot be told apart by their edges; separation is carried
  entirely by a 1px `--line-hair` rule.
- **Recommended fix:** give the system two band sizes and alternate them by
  role — a breathing band for a statement or a plate, a tight band for
  supporting content — e.g. `--s-band-lg: clamp(4rem, 10vw, 9rem)` and
  `--s-band-sm: clamp(3rem, 6vw, 5rem)`, applied by class rather than by the
  single `.section` rule.
- **Verification:** at least two distinct `padTop` values per page in the
  metrics output.

### 6. No sense of position while scrolling, and the type scale never opens up

- **Category:** typography / state
- **Evidence:** 0 `scroll-snap` or `animation-timeline` rules, no progress
  element, sticky set = `skip-link`, `site-header`, `back-to-top`. Rendered
  sizes top out at 48.8px on every interior page; `--step-6` (61px) appears
  only on the home `h1`. Interior `h2` is `--step-4` (39.1px) — within 1.3× of
  body copy at 16px.
- **Note:** the header does mark the current page, so cross-page orientation is
  fine. What is missing is *within-page* orientation on pages that run 5-8
  screens with five in-page anchors.
- **Recommended fix:** two small things. A 2px progress rule under the sticky
  header (`transform: scaleX()` driven by scroll, gated by
  `prefers-reduced-motion`), and promote one statement per page — the closing
  CTA headline — from `--step-3`/`--step-4` to `--step-5` so the scale is used
  for its full range instead of its bottom half.
- **Verification:** `progress_element` true; `max_font_px` ≥ 55 on interior
  pages.

## Polish

`.page-hero .btn-primary:hover { background: #A5E3FF }` at
`src/styles.css:360` is the only colour in the stylesheet that is not a token
and not a documented scrim. It is a bright cyan that appears nowhere else.
Either add `--accent-bright` to the token block and reference it, or use
`--accent-on-dark`, which is already the "accent on a dark band" value.

## Acceptable Differences — do not "fix" these

The one-accent palette is not the problem. 376 `var()` uses against 18 hex and
20 `rgba()` (all 20 of those are hero scrims and dark-band lines, each with a
stated purpose), four gradients that are all hero scrims, no decorative
shadows, two elevation levels, three line weights, a 1.25 modular scale, and
every ink carrying its measured contrast ratio in a comment.
This is a stronger colour system than most marketing sites have. If the fix for
"not rich" is more hues, the site gets worse. Richness here has to come from
scale, band, density and motion — findings 3, 4, 5 and 6.

The home hero's near-opaque white wash over the satellite plate
(`:399-409`) looks faded in the full-page capture, but it is a deliberate
legibility trade — the comment at `:376` says so, and the copy does sit on it at
18.7:1. Worth revisiting only if you add the dark band from finding 4, which
would let the plate show more and still hold contrast.

`404.html` is excluded from the measurements; it is one screen.

## Setup / Evidence Issues

There is no approved visual reference for this site, so this review cannot
issue a conformance verdict in the strict sense. It issued a regression verdict
against `pre-redesign` (finding 1, unambiguous) and a conformance verdict
against the in-repo token contract (findings 2-6). Before any of the fixes ship
as "the new design", capture them as the baseline: `.design-qa/expected/` from
the accepted state, so the next review has something to diff against rather
than my reading of the token block.

## Artifacts

- [`.design-qa/actual/`](/Users/subashpkuppusamy/Developer/R4/.design-qa/actual) —
  16 full-page captures, 8 pages × 2 viewports
- [`.design-qa/metrics.json`](/Users/subashpkuppusamy/Developer/R4/.design-qa/metrics.json) —
  raw per-band measurements
- [`site-design-metrics.tsv`](/Users/subashpkuppusamy/Developer/R4/site-design-metrics.tsv) —
  the same, one row per page-viewport, for Excel
- [`scripts/measure-design.mjs`](/Users/subashpkuppusamy/Developer/R4/scripts/measure-design.mjs) —
  the harness; `npm run serve` then `node scripts/measure-design.mjs` reproduces
  everything above
- This report, [`SITE-DESIGN-REVIEW.md`](/Users/subashpkuppusamy/Developer/R4/SITE-DESIGN-REVIEW.md)

All five are untracked. `.design-qa/` is a dot-directory, which GitHub Pages
ignores even if it were committed; the report and the TSV would publish at the
site root if committed, so they stay out of git like `SITE-AUDIT.md`.

## Suggested order

Finding 4 first — it is a class change, uses tokens that already exist, and
changes how the whole site reads. Then 1 (motion back, done properly this time),
then 5 (band rhythm), then 2 (split the technology lump). Finding 3 needs your
call on imagery versus diagrams. 6 last, since a progress bar on a page that
still has one 3,125px band just measures the boredom.

## Verification Checklist

- [x] Measured at two stated viewports, not from code reading
- [x] Regression evidence pulled from the `pre-redesign` tag rather than memory
- [x] Colour discipline quantified before being blamed
- [x] No thresholds or masks widened; nothing excluded from the counts
- [ ] Confirm the reveal restore keeps content visible with JavaScript off
- [ ] Confirm any new dark band uses the existing re-scoped token block, not new hex
- [ ] Re-run `node scripts/measure-design.mjs` after each fix and diff the TSV
- [ ] Capture accepted states as `.design-qa/expected/` for future reviews
