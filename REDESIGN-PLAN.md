# R4 Website Redesign — Implementation Plan

Repository: `/Users/subashpkuppusamy/Developer/R4`  
Production: `https://www.r4space.com`  
Design evidence: [SITE-DESIGN-REVIEW.md](/Users/subashpkuppusamy/Developer/R4/SITE-DESIGN-REVIEW.md)  
Status: rewritten implementation plan. This document does not authorise deployment.

## 1. Objective

Make the site feel richer and easier to scan without adding colour noise, rewriting its content, or sacrificing its static-site performance.

The redesign will:

- establish one recognisable blue brand system and one self-hosted typeface;
- replace repetitive card grids with clearer section hierarchy and asymmetric layouts;
- break oversized content bands into focused sections;
- add useful technical diagrams instead of unlicensed photography;
- restore restrained scroll motion with safe fallbacks;
- remove React and React DOM from the browser bundle while retaining React for static generation;
- preserve all published content, routes, deep links, metadata, and core behaviour.

## 2. Decisions

| Area | Decision |
|---|---|
| Primary colour | `#1D4ED8` for brand accents, actions, active states, and the closing CTA |
| Secondary surface | `#F1F4FD`, a 6% brand tint |
| Closing bands | CTA on `#1D4ED8`; footer on `#172554` |
| Typography | Inter only, self-hosted as one Latin variable WOFF2; weight creates hierarchy before size |
| Browser runtime | Small vanilla TypeScript modules; React remains a build-time dependency only |
| Count-up KPIs | Remove the animation and render the final values immediately |
| Visual assets | Inline SVG diagrams plus existing approved imagery; no new stock photography |
| Scroll effects | CSS scroll-driven animations where supported; no scroll listener for reveals or progress |
| Content | No visible-copy additions, deletions, or rewrites |
| In-page navigation | Preserve existing anchors; do not add the previously proposed label row because it would add copy |

## 3. Non-negotiable contract

### Content and URLs

- All nine generated documents remain at the repository root: eight public pages and `404.html`.
- Existing visible text, alt text, form values, metadata, link destinations, and asset paths remain unchanged unless a structural difference is explicitly allowlisted with a reason.
- Existing IDs and deep links, especially `technology#insight-set`, must continue to resolve.
- Extensionless URLs, `CNAME`, canonical URLs, `robots.txt`, and `sitemap.xml` remain valid.
- SVG diagrams must not introduce extra visible text. Reuse existing HTML copy for captions; mark decorative SVG content `aria-hidden="true"`.
- `npm run verify` must pass against a fixed pre-redesign baseline. New allowlist entries are for understood structural changes, not for hiding accidental content drift.

### Source and deployment

- Files under `src/` are the maintained source. Root HTML files and `assets/` are generated build output.
- GitHub Pages serves the repository root without running a build, so approved generated output remains committed.
- `npm run codemod` is retired from the normal workflow; running it again could overwrite maintained page source.
- Local review uses `npm run serve`, not a generic static server, so extensionless URLs behave like production.

### Accessibility and resilience

- Body text and controls meet WCAG AA contrast; meaningful non-text indicators meet at least 3:1.
- Navigation, filters, search, contact actions, and back-to-top remain keyboard operable.
- Focus indicators remain visible on every surface, including brand and footer bands.
- Content is visible before JavaScript runs, with JavaScript disabled, in browsers without scroll-timeline support, when printing, and under `prefers-reduced-motion`.
- Removing JavaScript must not remove access to any page, role, application card, FAQ item, or contact method.

## 4. Delivery sequence

| Phase | Deliverable | Why at this point |
|---|---|---|
| 0 | Frozen baseline and current measurements | Gives every later change a trustworthy comparison |
| 1 | Brand tokens, Inter, and typography | Approves the visual foundation before structural work |
| 2 | Section layouts and diagrams, page by page | Stabilises markup before JavaScript selectors are rewritten |
| 3 | Vanilla browser runtime | Removes hydration without repeatedly adapting to changing markup |
| 4 | Scroll progress, reveals, header state, and back-to-top | Adds motion after layout and runtime behaviour are stable |
| 5 | Asset and request optimisation | Measures the final design rather than an intermediate one |
| 6 | Full verification, documentation, and approved baselines | Produces the release candidate |

Phases 1, 3, and 6 are separate reviewable changes. Phase 2 is delivered one page at a time, with Technology first. Phases 4 and 5 may be reviewed together, but neither may weaken the no-JavaScript or reduced-motion fallbacks.

---

## Phase 0 — Freeze the baseline

### Work

1. Start from a clean, approved commit and archive it as the fixed content baseline used by `scripts/verify-content.mjs`.
2. Run the existing build, typecheck, and content verification before changing source.
3. Serve the generated site with `npm run serve` and capture all eight public pages at 1440×900 and 390×844.
4. Re-run `node scripts/measure-design.mjs` and record current values. The numbers in the design review are historical evidence, not a substitute for a fresh baseline.
5. Save the current request counts, JavaScript and CSS sizes, font requests, image weights, and third-party origins per page.
6. Confirm that any existing partial work, such as the local Inter asset, is treated as current state rather than implemented again blindly.

### Exit criteria

- The fixed baseline is reproducible and is not advanced as phases are implemented.
- Current build and measurement commands are documented with their actual results.
- Any pre-existing failure is recorded separately from redesign regressions.

---

## Phase 1 — Brand and typography foundation

### 1.1 Colour tokens

Introduce the brand ramp in `src/styles.css` and migrate consumers from the old accent ramp.

| Token | Value | Use |
|---|---|---|
| `--brand` | `#1D4ED8` | Links, buttons, labels, active navigation, CTA band |
| `--brand-strong` | `#1E40AF` | Hover, active, and pressed states |
| `--brand-deep` | `#172554` | Footer and deepest brand surface |
| `--brand-tint` | `#F1F4FD` | Alternating section surface |
| `--brand-line` | `rgba(29, 78, 216, .14)` | Decorative hairlines on tinted surfaces |
| `--brand-on-dark` | `#BFDBFE` | Secondary text and links on brand surfaces |
| `--brand-ring` | `rgba(29, 78, 216, .35)` | Focus treatment, supplemented where needed for 3:1 visibility |

Make these related changes:

- replace `--accent`, `--accent-strong`, `--accent-tint`, and `--accent-on-dark` usage with the brand ramp;
- change `--surface-sunken` from `#F4F6F8` to `#F6F8FD`;
- change `--line` and `--line-hair` to `#DCE3F4` and `#EBEFFA`;
- replace the off-system `#A5E3FF` hero hover literal with the appropriate brand token;
- scope ink, muted text, lines, buttons, and focus states explicitly for CTA and footer surfaces rather than adding component-specific hex values.

### 1.2 Typography

Use the existing `src/fonts/inter-latin.woff2` if validation confirms it is the required Latin variable font covering weights 400–800. Otherwise replace it with the correctly licensed subset and include the SIL Open Font License with the distributed font.

- Declare one `@font-face` with `font-display: swap`.
- Preload only the emitted WOFF2, using the Vite manifest path already available to `scripts/prerender.mjs`.
- Remove Google Fonts stylesheet and font-origin dependencies.
- Keep Inter as the single family across body, navigation, tables, buttons, and headings.

| Role | Weight | Size direction |
|---|---:|---|
| Body | 400 | `--step-0`; preserve readable line length |
| Navigation, buttons, table cells, chips | 500 | `--step--1` or `--step-0`; remove unnecessary uppercase styling |
| Labels and eyebrows | 600 | `--step--1`; brand colour, normal case |
| Card and list titles | 600 | `--step-1` |
| Section headings | 700 | Open from `--step-4` toward `--step-5` where layout permits |
| Page statement and closing CTA | 800 | Up to `--step-6`; preserve mobile fit |

Re-measure heading wrapping and rendered sizes at both target viewports. Adjust display tracking conservatively for Inter rather than carrying over Plus Jakarta Sans metrics unchanged.

### 1.3 Automated contrast guard

Add `scripts/contrast.mjs` and include it in `npm run verify`. Test the actual approved foreground/background pairs for normal text, large text, controls, and focus indicators. Keep decorative-only values out of text contrast claims.

### Exit criteria

- No old accent or off-system hover colour remains in active styling.
- No Google Fonts request remains.
- Contrast checks pass, including CTA and footer states.
- All pages are captured at both viewports for visual approval.
- **Approval gate:** sign off the colour and Inter foundation before Phase 2.

---

## Phase 2 — Section hierarchy and visual explanations

Combine layout and diagram work so each page is redesigned as a complete composition rather than restyled twice.

### 2.1 Shared section grammar

1. **Left-align section openings.** Use the existing eyebrow, heading, and lead copy in a consistent, width-limited lockup. Remove the remaining centred section treatment and then remove unused centering utilities.
2. **Use asymmetry for statement-plus-support content.** Use a 4/8 or 5/7 split where appropriate. Equal columns remain valid for genuinely parallel items, not as the default for every band.
3. **Convert repetitive card rows to hairline-separated lists.** Lead with the existing title at weight 600, followed by its existing description. Preserve semantic headings, filters, links, and category data.
4. **Give each band one job.** Split bands that combine separate explanations, tables, and charts.
5. **Alternate surfaces and density.** Use white → tint → white where it helps orientation. Introduce explicit large and small band-padding tokens:
   - `--band-lg: clamp(4rem, 10vw, 9rem)`;
   - `--band-sm: clamp(3rem, 6vw, 5rem)`.
6. **Close on brand.** Apply the brand CTA surface and deep footer through shared layout styles. Do not invent per-page dark themes.
7. **Open the type scale.** Promote appropriate interior section and CTA headings without causing overflow or changing copy.
8. **Keep mobile intentional.** Collapse asymmetric layouts to one column, preserve reading order, and avoid horizontal scrolling in tables and diagrams.

### 2.2 Technology restructure

Split the current `section#insight-set` into three focused bands:

1. sensing modes and spacecraft formation;
2. comparison table and modality/timing relationship;
3. temporal-richness chart and its existing explanation.

Keep `id="insight-set"` on the first band so existing links land correctly. Give any new anchors a clear purpose and update the structural allowlist only after link checks pass.

### 2.3 Diagram set

Build lightweight inline SVGs using `--brand`, `--brand-tint`, `--line`, and `currentColor`. They must be responsive, decorative to assistive technology, and accompanied by existing HTML copy where explanation is needed.

| Page | Diagram | Placement |
|---|---|---|
| Technology | Two-CubeSat formation with shared footprint | First split Insight Set band |
| Technology | Modality × timing grid | Beside the existing comparison content |
| Applications | 4D framework as a stepped plan | Replace one repetitive equal-card grouping |
| Defence | Observe → Correlate → Assess → Prioritise → Deliver chain | Existing observation-to-decision band |
| Company | Orbital ground-track strip | Image-light middle section |
| Careers | Four-part candidate-profile composition | Existing candidate-profile band, without adding labels |

Do not add diagrams merely to satisfy a count. Each must explain content already on its page.

### 2.4 Page order

1. Technology — establishes the split-band pattern and technical diagram language.
2. Applications and Defence — establishes stepped frameworks and process diagrams.
3. Company and Careers — applies the visual language to text-heavy pages.
4. Home, Civil, and Contact — applies shared section, list, CTA, and responsive rules without unnecessary restructuring.
5. 404 — receives shared brand and typography only; it is excluded from long-page metrics.

### Exit criteria

- `npm run verify` shows no unauthorised copy or destination changes.
- No top-level band exceeds 1,600px at either measurement viewport unless a documented structural exception is approved.
- Technology has no more than two visual-free bands after the split.
- Every measured multi-section page uses at least two deliberate band-padding sizes.
- Every public page has a below-the-fold brand/deep-brand anchor, with the shared footer included consistently.
- Interior pages reach at least 55px rendered type where the layout supports it, without mobile overflow.
- Each page is visually reviewed at 1440×900 and 390×844 before moving to the next.

---

## Phase 3 — Replace hydration with a small browser runtime

React continues to render static markup through `src/server.tsx` and `scripts/prerender.mjs`. It no longer runs in the browser.

### 3.1 Entry and dependency changes

- Replace `src/main.tsx` with `src/client.ts`.
- Import global CSS from the new client entry because the browser entry will no longer import `App.tsx`.
- Point `app/index.html` at `src/client.ts`.
- Remove `hydrateRoot`, client-side page selection, and the `?page=` development route.
- Move `react` and `react-dom` to `devDependencies`; retain `react-dom/server` for prerendering.
- Replace the Vite hydration development workflow with a build-watch/prerender workflow plus `npm run serve`. Document the new `npm run dev` behaviour.
- Convert interactive TSX components into static markup sources with stable `data-*` hooks for the vanilla runtime. Event-handler props disappear from generated HTML; visible markup and accessible names remain stable.

### 3.2 Behaviour migration

| Behaviour | Source | Required vanilla behaviour |
|---|---|---|
| Mobile navigation | `src/chrome/Header.tsx` | Toggle, accurate `aria-expanded`, close on navigation, outside interaction, and Escape |
| Applications dropdown | `src/chrome/Header.tsx` | Keyboard and pointer operation, focus-safe closing, accurate expanded state |
| Application and careers filters | `src/widgets/FilterGrid.tsx` | Toggle `hidden` and `aria-pressed`; show every item before enhancement |
| Company FAQ search | `src/widgets/SearchableList.tsx` | Filter against item text; restore all items for an empty query |
| Contact form | `src/pages/Contact.tsx`, `src/mailto.ts` | Prevent native submission only when JS is active; generate the identical `mailto:` subject and body |
| Back-to-top action | `src/chrome/BackToTop.tsx` | Use an anchor to the page top so navigation still works without JavaScript |
| Header/back-to-top scroll state | `src/hooks.ts` | Remove the React scroll hook; CSS handles progressive visual state in Phase 4 |
| KPI count-up | `src/widgets/Counter.tsx` | Remove; prerendered final values remain unchanged |

Delete unused hooks and components only after all imports are gone. Keep `buildMailto` reusable and add focused tests for its exact output rather than duplicating a second email-format implementation.

### 3.3 Progressive-enhancement rules

- Default generated HTML exposes all content and navigation.
- Collapsible or filtered presentation activates only after the relevant controller initialises successfully.
- The mobile menu toggle is hidden when it cannot operate; the navigation links remain available.
- The contact page always retains its direct email link. Give the form a native `mailto:` action as its no-JavaScript fallback; the enhanced controller prevents that default and preserves the current exact message format. Never leave an apparently active button that does nothing.
- Initialisation is scoped by `data-page` and local selectors, so one page's controller cannot affect another page's markup.

### Exit criteria

- React and React DOM are absent from the emitted browser bundle.
- First-party JavaScript is at most 20KB raw and 6KB gzipped.
- Every behaviour above passes keyboard and pointer testing.
- With JavaScript disabled, all content is visible, all navigation works, and contact remains possible through a working email path.
- Contact email subject, body, line breaks, and recipient match the current implementation.
- Build, typecheck, and content verification pass.

---

## Phase 4 — Scroll and motion

Motion is progressive enhancement, never a prerequisite for visibility or navigation.

### 4.1 Section reveals

- Apply a subtle opacity/12px translate reveal with `animation-timeline: view()` and an entry range inside `@supports`.
- Apply motion to section heads and meaningful content groups, not every text node.
- Keep the hidden/from state inside the supported, motion-allowed rules. Unsupported browsers, printing, and reduced-motion users see the final visible state immediately.
- Avoid large movement, parallax, scroll snapping, and continuous background animation.

### 4.2 Reading progress

Add a 2px brand progress rule below the sticky header using `animation-timeline: scroll(root)` and a compositor-friendly scale transform. It is decorative and hidden from assistive technology. Without support, omit it; reduced-motion users receive no animated progress movement.

### 4.3 Header and back-to-top

- Drive header condensation and back-to-top visual state with supported scroll timelines where practical.
- Keep their base states fully functional without animation support. If a scroll-driven hidden state cannot be applied safely, leave back-to-top visible rather than hiding it permanently.
- Preserve `scroll-padding-top` for anchored navigation.
- Honour reduced motion without removing the back-to-top link or access to anchored content.

### Exit criteria

- Metrics report supported animated elements and at least two keyframe groups at both viewports.
- Full-page captures with JavaScript disabled show every band at full opacity.
- Reduced-motion mode contains no reveal, smooth-scroll, progress, or condensation animation.
- Firefox/unsupported-engine fallback, printing, keyboard navigation, and anchor landing positions are manually checked.

---

## Phase 5 — Performance and request budget

| Item | Baseline from original review | Target | Implementation |
|---|---:|---:|---|
| First-party JavaScript | 324,750 bytes raw / 88,702 gz | ≤20,000 / ≤6,000 | Phase 3; measure final emitted bundle |
| Font | Cross-origin Google CSS + WOFF2 | One local preloaded variable WOFF2 | Phase 1; no duplicate preload/download |
| Third-party requests on page load | Fonts, flag CDN, embedded map | 0 | Local assets; replace embedded map as below |
| Interior hero image | 144,194-byte JPEG CSS background | ≤90KB WebP where visually acceptable | Sized `<img>`, high fetch priority, CSS scrim |
| Below-fold images | Inconsistent lazy loading | Every below-fold image lazy-loaded | Audit all pages; never lazy-load LCP media |
| Layout shift | Hero lacks intrinsic sizing in some paths | 0 avoidable CLS from site media | Width, height, and stable responsive aspect ratios |
| CSS | 25,780 bytes raw / 5,852 gz | ≤8,000 gz | Retain one stylesheet; remove superseded rules |

Additional request cleanup:

- Replace the footer flag CDN image with a local asset or inline SVG while preserving its accessible treatment.
- Remove the embedded Google Maps iframe from Contact. The existing external map link remains available and makes no request until selected. Use a local decorative locator treatment if the resulting layout needs a visual anchor.
- Do not preload below-fold images or diagrams.
- Keep social preview images and externally linked destinations unchanged unless separately approved; a clicked external link is not a page-load third-party dependency.

### Exit criteria

- A per-page request inventory shows zero third-party requests during initial page load, including Contact.
- No first paint waits on a cross-origin stylesheet or font.
- Budgets are measured from generated output, with gzip sizes recorded consistently.
- LCP media has dimensions and appropriate priority; below-fold media is lazy-loaded.
- No new layout shift or visible image-quality regression is observed at either viewport.

---

## Phase 6 — Verification, documentation, and release candidate

### Automated checks

Run from a clean install using the supported Node version:

1. `npm run build`
2. `npm run typecheck`
3. `npm run verify` — content/URL parity plus contrast checks
4. `node scripts/measure-design.mjs` against `npm run serve`

Record results rather than only reporting that commands were run. Any pre-existing or environment-limited check must be named explicitly.

### Manual browser matrix

Check Home, Technology, Applications, Careers, Company, and Contact at minimum, then smoke-test the remaining pages:

- 1440×900 and 390×844;
- current Chromium, Safari, and Firefox engines available in the test environment;
- keyboard-only navigation, visible focus, Escape, and outside-click behaviour;
- JavaScript disabled;
- reduced motion enabled;
- filters with every category and search with matches, no matches, and cleared input;
- contact mailto output and no-JavaScript contact path;
- all existing deep links, extensionless URLs, and the 404 page;
- 200% zoom, long heading wrapping, and horizontal-overflow checks.

### Documentation and generated output

- Update `README.md` with the static-prerender/vanilla-client architecture, new development workflow, token contract, budgets, and verification commands.
- Mark the HTML-to-JSX codemod as retired and remove it from routine instructions.
- Update `ASSET-MANIFEST.txt` for generated Inter output and any local replacement assets; include the font licence.
- Ensure generated root HTML and hashed `assets/` correspond to the approved source build.
- Do not overwrite the old visual baseline until the new design is approved. After approval, capture `.design-qa/expected/` at both viewports as the new reference.
- Deployment, commit, and push occur only after explicit release approval.

## 5. Final success measures

| Measure | Original baseline | Target |
|---|---:|---:|
| Technology height at 1440×900 | 8.2 screens | Approximately 7 screens, subject to content parity |
| Technology tallest band | 3,125px | ≤1,600px |
| Technology bands without a visual | 5 of 6 | ≤2 after restructuring |
| Below-the-fold brand/deep-brand share | 0% | 8–14% where composition supports it; never below 8% solely to hit a metric |
| Distinct band paddings per measured page | 1 | At least 2 |
| Interior maximum rendered type | 48.8px | ≥55px without mobile overflow |
| Animated elements | 0 | Restrained CSS-only reveals and progress in supported browsers |
| First-party JavaScript | 88.7KB gzipped | ≤6KB gzipped |
| Third-party requests on initial load | Fonts, flag CDN, map | 0 |
| Unauthorised visible-copy changes | — | 0 |
| Broken existing routes or deep links | — | 0 |

Metrics support design review; they do not justify hiding content, removing useful information, or adding meaningless decoration. If a metric conflicts with readability, accessibility, or the content contract, those constraints win and the exception is documented.

## 6. Approval gates

1. **After Phase 1:** approve Inter, brand colour usage, and type hierarchy.
2. **After Technology in Phase 2:** approve section grammar and diagram language before applying them broadly.
3. **After Phase 6:** approve the release candidate and new visual baselines before deployment.

No implementation choice is left open: count-up removal, no additional visible navigation labels, build-time-only React, CSS-first motion, and zero initial-load third-party requests are part of the approved scope when this plan is accepted.
