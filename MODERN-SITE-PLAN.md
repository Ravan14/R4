# R4 — Modern Site Plan: Industrial Print

**Directive.** The current light-editorial design reads as boring. Move the whole site to a
modern design language that is distinctive and energetic, explicitly avoiding "AI slop"
conventions. Scope: **visual + layout only** — every existing word of copy, every page, and
the information architecture stay exactly as they are. The design system, typography,
imagery treatment, components, and motion change completely.

**Direction.** *Industrial Print* — a light, loud, print-inspired language: oversized
expanded display type, hard-edged ink panels with offset shadows, ink + brand blue + signal
orange, technical-drawing devices (blueprint grids, registration marks, dimension lines),
mono metadata everywhere, and grayscale documentary photography. Like an engineering
manual, a safety poster, and a mission dossier printed at poster scale.

---

## 1. Why the current design reads as boring

The current system is coherent but self-effacing. Diagnosis:

1. **Everything whispers.** One hue at 100% usage, hairline separators, weight-based
   hierarchy only, no size contrast between "statement" and "body". Nothing raises its voice.
2. **No signature moments.** Every component is a variation of "text on paper with a
   hairline". A visitor cannot remember a single visual element.
3. **Soft motion.** Fades and drifts are pleasant, never exciting.
4. **Photography is buried.** Real satellite imagery is washed behind 46–99% white scrims.
5. **No texture.** Flat paper with flat lines reads as a document, not a brand.

The fix is not more decoration — it is a design language with **contrast, edges, and
devices**: the difference between a memo and a poster.

---

## 2. Language rules — what this design IS and is NOT

These rules are the anti-AI-slop contract. Every implementation decision is checked
against them.

**IS**
- Hard edges: 2px ink borders, 0 radius, offset solid shadows (no blur).
- Oversized expanded display type; uppercase mono labels with wide tracking.
- Technical-drawing devices: blueprint grids, registration marks, dimension ticks,
  crosshairs, index numbers.
- Grayscale, high-contrast documentary photography with hard frames and mono captions.
- Signal orange as a *graphic* accent (marks, numerals, highlights) — never a wash.
- Ink structure, blue identity, orange signal. Three jobs, three colors.
- Print physics: press = shadow collapse; hover = offset shift or inversion.
- Step-and-wipe motion; ticker strips; stamped icon set.

**IS NOT**
- Glassmorphism, backdrop blur cards, translucent panels.
- Gradient text, purple→cyan gradients, soft color washes.
- Rounded pills, floating orbs, 3D blobs, soft drop shadows.
- Pastel tints as the primary surface system.
- Stock "HUD" glow, neon sci-fi, emoji icons, generic stock 3D renders.
- Fade-on-scroll as the only motion.

---

## 3. Design tokens

All values are final. Contrast ratios are computed against `--paper`; the existing
`scripts/contrast.mjs` guard is extended with these tokens.

### 3.1 Color

| Token | Value | Role |
|---|---|---|
| `--paper` | `#FAF8F4` | Page ground — warm paper, not white |
| `--paper-2` | `#F1EDE6` | Sunken bands, hover tints |
| `--raised` | `#FFFFFF` | Raised surfaces inside hard borders |
| `--blueprint` | `#EEF1F7` | Cool grid-tint sections (contrast to warm paper) |
| `--ink` | `#111318` | Structure: borders, plates, footer, primary buttons |
| `--ink-2` | `#3A3B42` | Headings (≈8.6:1) |
| `--body` | `#56565E` | Running copy (≈7.4:1) |
| `--faint` | `#6E6E77` | Labels, meta (≈5.3:1) |
| `--brand` | `#1D4ED8` | Identity blue, unchanged (≈6.3:1) |
| `--brand-deep` | `#172554` | Ink-dark blue band |
| `--signal` | `#C43300` | Orange marks/graphics on paper (≈3.2:1 non-text) |
| `--signal-text` | `#8A2600` | Small orange text on paper only (≈4.5:1) — rare |
| `--signal-bright` | `#FF6A2B` | Orange on ink surfaces (≈6:1 on `--ink`) |
| `--paper-on-ink` | `#F5F3EE` | Text on ink |
| `--muted-on-ink` | `#A9B4C4` | Secondary text on ink |
| `--brand-on-ink` | `#93C5FD` | Blue links on ink |

Rule: orange is for **marks, numerals, highlights, and hover states** — it is never a
background wash on paper and never body text (except `--signal-text`, sparingly). Blue stays
the link/brand color. Ink does all structure.

### 3.2 Typography

- **Display:** Archivo Variable, `wght 780–900`, `wdth 120` (expanded). Uppercase for hero
  statements and KPI numerals. Tracking `-0.01em`, line-height 0.98. Size scale goes up:
  hero `clamp(2.75rem, 6.5vw + 1rem, 5.5rem)`; h2 `clamp(2rem, 4vw, 3.25rem)`.
- **Body:** Inter 400/500, 16px floor, `--lh-body` stays 1.65. Measure 68ch.
- **Mono:** IBM Plex Mono — every eyebrow, label, button, meta value, index number, table
  header, caption. Uppercase, tracking `0.12em`, size `0.78rem`. This is the industrial
  voice of the site; the old "uppercase tracked sans" pattern returns as mono on purpose.
- Numerals: Archivo expanded black, tabular-nums, with a small mono unit label.

### 3.3 Space, borders, shadows

- Spacing stays on the 4/8 base; band sizes increase: `--band-lg: clamp(4.5rem, 11vw, 10rem)`,
  `--band-sm: clamp(3rem, 7vw, 5.5rem)`.
- Radius: **0 everywhere** (one value: `--r: 0`).
- Border: `2px solid var(--ink)` is the default frame. Hairlines survive only inside dense
  tables and ticker separators.
- Shadows (the signature):
  - `--shadow-off: 6px 6px 0 var(--ink)` (resting plate)
  - `--shadow-off-lg: 10px 10px 0 var(--ink)` (hero media, CTA)
  - Hover: shadow grows +2px and plate shifts `-2px`; active: `2px 2px 0` + plate shifts
    `+2px` (press physics). No blur shadows anywhere.
- Container: `1280px`.

### 3.4 Texture devices

- **Blueprint grid:** `linear-gradient` hairlines at 24px + a 2px crosshair dot every 120px,
  in `--brand` at 4% opacity — used on `--blueprint` sections and diagram panels.
- **Registration marks:** 12px corner ticks (print crop marks) on media frames, hero plates,
  and the dropdown panel — one pseudo-element set, reusable class `.reg-marks`.
- **Dimension line:** the section eyebrow becomes a drawing callout — mono text + 48px rule
  with end ticks and a small orange square at the start.

### 3.5 Motion

- `--ease-print: cubic-bezier(0.16, 1, 0.3, 1)`; durations 160 / 240 / 400ms.
- Reveals: clip-path wipes (block 0→100%) or 14px vertical steps — **never opacity fades**.
- Hover: offset-shadow shift; press: collapse (above).
- Ticker: 40s linear marquee, CSS only.
- Scroll-driven (keep the existing `animation-timeline` architecture): steps/wipes for
  sections, media slide-up inside frames.
- `prefers-reduced-motion`: ticker and wipes disabled; content is fully visible by default.

---

## 4. Component system

| Component | Now | Becomes |
|---|---|---|
| Header | Light blur bar, hairlines | Paper bar with **2px ink bottom border**; nav items as mono labels with index numbers `01–06`; active item = inverted chip (ink bg, paper text, no radius) |
| Dropdown | 900px hairline panel | Spec-sheet panel: 2px ink border, offset shadow, registration marks, mono headings |
| Buttons | 2px radius, soft | Block buttons: mono uppercase labels, 2px ink border + offset shadow; primary = ink bg/paper text; hover = shadow shift; a `.btn-signal` (orange bg on ink only) for CTA panels |
| Cards | Hairline top border | **Offset plates**: 2px ink border + `--shadow-off`, paper bg; hover = shift + orange left bar; grid cells share borders (no gutters) |
| Eyebrow | Blue 600-weight text | Mono uppercase dimension-line callout with orange tick |
| Section head | Left-aligned text block | Numbered: mono `01` index + dimension line, then oversized h2 |
| KPI band | 4-up hairlines | Ink plate: white expanded-black numerals (up to 5rem), mono labels, orange corner marks |
| Spec tables | Light rows | Engineering spec sheet: ink header row (paper mono text), zebra `--paper-2` rows, 1px rules, selected column = orange inset bar |
| Filter buttons | Underline tabs | Stamped toggles: bordered mono chips; active = ink fill + paper text; hover = orange border |
| Details/FAQ | `+` toggles | Dossier rows: mono index `R1…`, title in display weight, open state gets orange left bar + `--paper-2` bg |
| Timeline | Dotted center line | Printed milestone track: ink baseline, orange square nodes, mono dates |
| Media | Rounded 4px | Hard 2px ink frame + `--shadow-off-lg`, registration marks, mono caption strip beneath ("FIG. 01 — ...") |
| Forms | Soft bordered | Requisition style: mono uppercase labels, 2px ink borders, focus = orange 2px border + offset shadow, submit = full-width ink block |
| Footer | Blue band | Ink colophon: big paper wordmark, mono link columns with index numbers, print-style fine print block |
| Icons | 24px line icons | Stamped: 2px stroke linework inside a hard square stamp with corner notch — same bespoke Icon.tsx set, restyled |

---

## 5. Page-by-page treatment (copy untouched)

### 5.1 Home
- **Hero:** full-bleed grayscale satellite plate (`BG.webp` at full strength, no white wash —
  the legibility problem disappears because the wash becomes a hard paper panel: copy sits on
  a bordered paper plate offset over the image, offset shadow). Headline in expanded black
  uppercase: line 1 ink, line 2 with an orange rectangular highlight block behind it.
  Eyebrow = dimension-line callout. Buttons: ink + ghost-outline. Data strip becomes three
  hard spec cells (mono label, expanded numeral, orange unit).
- **Mission story:** sticky instrument plate gets the blueprint treatment (grid + crosshairs),
  orange scan line, mono readouts; the step column gets `01/02/03` display numerals above
  each h2, hard media frames.
- **Portfolio split:** two offset plates; hover inverts one cell; pills become stamped mono
  tags.
- **KPI band:** ink plate with white expanded-black numerals and orange marks (Section 4).
- **CTA:** ink panel, registration marks, `--shadow-off-lg`, `.btn-signal` orange button,
  mono status ticker strip along its top edge.

### 5.2 Technology
- Hero keeps orbital geometry but restyled: ink strokes + orange accent orbit, media at full
  grayscale strength behind a hard plate.
- SVG diagrams (Diagrams.tsx): restyle to **schematic** — ink 1.5px strokes, orange signal
  paths, blueprint panel backgrounds. No fill pastels.
- Compare table → engineering spec sheet (Section 4). Model selector becomes three stamped
  chips tied to the existing `data-observation-model` controller.

### 5.3 Applications
- Explorer index = mono catalogue (numbered rows, `▸` markers); detail panels = hard-framed
  grayscale imagery + spec meta strip; filters = stamped toggles.

### 5.4 Defence
- Question-to-evidence chain: questions become stamped chips; the comparison rows keep the
  `is-selected` controller with orange inset bars; media frames get FIG-captions.

### 5.5 Civil
- Event-response flow: numbered `STEP 01…` mono index, hard-framed imagery, dossier-style
  disclosure rows.

### 5.6 Company
- Principle grid: four hard plates sharing borders, the existing `R1–R4` mono numerals at
  display scale (3rem, expanded black, orange).
- Roadmap: printed milestone track (ink baseline, orange nodes, mono years).

### 5.7 Careers
- Roles explorer as job-spec index; team list as spec rows with mono metadata.

### 5.8 Contact
- Task-first layout stays; form becomes requisition style (Section 4); contact items become
  bordered spec rows; map frame gets hard border + registration marks.

### 5.9 404
- Giant `404` in expanded black with orange shadow offset, mono "SIGNAL LOST" eyebrow,
  hard-framed media, unchanged links.

---

## 6. Imagery strategy (zero new third-party assets)

- All existing photographs stay in place but get the **grayscale + contrast** treatment:
  `filter: grayscale(1) contrast(1.12) brightness(1.02)`, implemented in CSS (no image
  reprocessing, no new files, no script changes).
- Hero images are no longer washed out — copy moves onto hard paper plates instead of scrims.
- Every media block gets a hard ink frame, offset shadow, and an optional mono FIG-caption.
- The `hero-geometry` SVG layers are restyled as ink/orange schematics.
- Optional later: a tiny ink-grain overlay via inline SVG turbulence (pure CSS, no asset).

---

## 7. UX upgrades (same copy, better experience)

1. **Hierarchy that shouts:** display type at poster scale vs. quiet body — one glance orders
   the page.
2. **Numbered system:** nav `01–06`, section indexes, dossier/step numbers — navigation and
   scanning become concrete.
3. **Signature moments:** offset-shadow media plate, orange highlight on the hero headline,
   ink KPI band, ticker strips — memorability replaces wallpaper.
4. **Press physics:** every interactive element responds with shadow collapse/shift, so the
   site feels machined, not painted.
5. **Ticker strips:** mono mission-status marquees between major sections (CSS-only, paused
   under reduced motion) add life without demanding attention.
6. **Sticky in-page index** (mono rail) on the three longest pages (Technology, Defence,
   Civil) — optional phase, existing anchor structure supports it with no copy changes.

---

## 8. Non-negotiables (carried forward)

- Zero third-party requests; self-hosted fonts unchanged.
- No JS in the runtime except the existing vanilla controllers (`client.ts`) — no hydration.
- No copy changes; no page removed or added; extensionless URLs unchanged.
- WCAG AA contrast on every token — `scripts/contrast.mjs` extended with the new palette
  and run in `npm run verify`.
- Focus-visible: 2px `--signal` outline, 3px offset (passes 3:1 non-text).
- No-JS parity: all content readable, ticker static, explorers fall back as today.
- `prefers-reduced-motion` and print stylesheets updated for the new language.

---

## 9. Implementation phases

**Phase 1 — Foundations.** Rewrite token block and base rules in `src/styles.css` (color,
type scale, radius 0, offset shadows, focus rings); add devices: `.reg-marks`, blueprint
grid, dimension-line eyebrow, stamped `.btn`, marquee utility. Update `scripts/contrast.mjs`
tokens. *Exit: build + typecheck + contrast pass; no layout breakage on any page.*

**Phase 2 — Chrome.** Header (numbered mono nav, inverted active chip, 2px ink border),
dropdown spec panel, footer colophon in `src/chrome/Header.tsx`, `Footer.tsx`, `Layout.tsx`.
*Exit: nav + dropdown keyboard/no-JS behavior unchanged per `src/client.ts`.*

**Phase 3 — Home.** Hero plate collage, story instrument blueprint restyle, plates, ink KPI
band, ticker, CTA. *Exit: Home visually complete at 1280/820/560 widths.*

**Phase 4 — Technology + Applications.** Schematics restyle (`Diagrams.tsx`, `Icon.tsx`),
spec-sheet tables, catalogue explorer, stamped filters. *Exit: both pages complete; explorer
controllers (keyboard, deep-link, no-JS) still pass.*

**Phase 5 — Defence + Civil.** Case-file selection chain, dossier disclosures, numbered
event flows. *Exit: pages complete; disclosure/question controllers still pass.*

**Phase 6 — Company + Careers + Contact + 404.** Principle plates, milestone track, job-spec
index, requisition form, giant 404. *Exit: all nine pages restyled; copy diff = empty.*

**Phase 7 — Motion.** Wipe reveals, offset-shadow hover/press physics, ticker, scroll-driven
step reveals; `prefers-reduced-motion` + print rules. *Exit: motion QA on a scroll-capable
browser; reduced-motion verified via `scripts/measure-design.mjs` CDP emulation.*

**Phase 8 — Imagery pass.** Grayscale/contrast treatment, hard frames, FIG-captions, remove
hero scrims in favor of plates. *Exit: hero legibility at 820px and 560px confirmed.*

**Phase 9 — QA.** `npm run build`, `typecheck`, `contrast`, `verify-content`; measure-design
full-page captures of all nine pages; manual keyboard/screen-reader pass; update
`ASSET-MANIFEST.txt` and `README.md` only if assets change.

**Rollout:** phases land in one branch; each phase keeps `npm run build` green; final release
is a single regenerated dist of all nine documents.

---

## 10. Risks and mitigations

- **Orange contrast:** orange is graphics-only on paper; small orange text uses
  `--signal-text`; contrast script fails the build on violations.
- **Loudness fatigue:** ink/paper stays the dominant pair; orange is capped at marks,
  numerals, and two per-viewport highlights.
- **Graduate legibility on grayscale imagery:** copy always sits on hard paper plates, never
  on photos — the old scrim system is replaced, not removed.
- **Offset shadows with grid gutters:** plates share borders (no gutters) to keep shadows
  from colliding; verified per page in Phase 3.
- **Marquee distraction:** single ticker instance per page, mono, small, `reduced-motion`
  disabled.
