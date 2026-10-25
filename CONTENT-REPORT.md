# R4 Website Content Report & Replan

**Date:** October 2026 · **Scope:** all nine public pages (`index.html`, `technology`, `applications`, `defence`, `civil`, `company`, `careers`, `contact`, `404`) · **Status:** implemented

---

## 1. Executive summary

The site reads like a technical document because it is written **from the inside out** — it describes the system's mechanics ("synchronous multi-modal observation", "common observation window") before it says what any reader gets. It repeats the same content three to four times across pages, never translates its specialist vocabulary, and omits the company's actual story: the founder, the investor thesis, and the one sentence that explains the business ("minutes, not days").

The replan in this report gives the site a plain-language layer first, an outcome-first voice, deduplicated page structure, and a new `/investors` page that carries the one-pager story. All nine pages were rewritten and the ten-page site rebuilt.

## 2. The company concept (source of truth)

R4's own one-pager ("One pager" at repo root) defines the company in three sentences that **never appeared on the website**:

- **Vision:** "To be the leading provider of multi-modal Earth intelligence, delivering real-time, all-weather situational awareness for defense, security, and critical civil infrastructure worldwide."
- **Objective:** "Deliver fused, decision-ready intelligence in **minutes, not days**."
- **Tagline:** "The first line of defense. The final word in rescue."

The one-pager also carries facts the site omitted entirely: the founder (Dr. Kathiravan Thanagvel), the pre-seed round ($2.0M for 8% equity, $25M post-money), TRL statuses of the technology moat, the $100B+ market framing, early traction signals, use of funds, and the roadmap to Series A.

The website is the company's public face; the one-pager is its best-written document. The replan closes the gap between them.

## 3. Findings (the audit)

### F1 — No plain-language layer
Every page opens with system mechanics. The Home hero lead: *"A distributed satellite system that acquires SAR, optical, thermal infrared, and cooperative radio-frequency observations during the same orbital event—then converts them into decision-grade intelligence."* The one-pager's plain equivalent — *"fused, decision-ready intelligence in minutes, not days"* — is nowhere on the site. A lay reader must reach line 4 of the Technology page before finding any concept they recognise.

### F2 — The audience is undefined
One message serves four audiences: defence officers, civil agencies, investors, and job seekers. Each has a different first question ("What can you watch for me?", "How fast?", "Why fund this?", "What would I build?"), and the site answers none of them first. There is no "who are you?" moment anywhere.

### F3 — The same content is told 3–4 times
- The application portfolio appears three times: 9 records in the Applications explorer (`src/pageData.ts`), 6 cards on Defence, 9 disclosure items on Civil — roughly the same list, three pages.
- The ℝ⁴ / "4D" principles appear twice: "ℝ⁴: Resilient, Responsive, Real-time, Reconnaissance" on Company, and "4D intelligence framework" on Technology.
- Two near-identical five-step pipelines: Technology ("Observe → Correlate → Assess → Prioritise → Deliver") and Civil ("Event → Task → Acquire → Analyse → Disseminate").
- One comparison idea is rendered four times on Technology alone: in the hero, in three accordions, in a five-row table, and in a two-axis SVG chart. That is a slide deck, not a web page.
- The Applications "delivery" section, the Company FAQ, and the Defence "integration" section all restate the same output list (alerts, APIs, GIS layers, dashboards).

### F4 — Jargon density
SAR, TIR, AIS/ADS-B/APRS, C2, GIS, tip-and-cue, co-temporal, reacquisition, "geolocated detection with confidence" — all used without translation on first use. The Technology page is the first navigation item after Home, so the densest page is the first destination offered to every visitor.

### F5 — Spec-like voice
Hedged, passive, abstract: *"can support"*, *"may be"*, *"candidate deployment pathways"*, *"residual ambiguity"*, *"application-specific analytical configuration"*. Sentences are noun-stacks; the subject is almost always the system, never the reader.

### F6 — Missing website essentials
No founder or leadership. No investor story (the one-pager's entire raise section is absent). No milestones or TRL status. No traction. No "why now". The FAQ does not contain the most obvious question: "What does R4 do?"

### F7 — Process-flavored CTAs
"Request a Technical Discussion", "Request a Capability Briefing", "Request a Mission Discussion" — every CTA describes a process, none describes an outcome.

### F8 — Engineering constraint on copy changes
`scripts/verify-content.mjs` enforced word-parity with the pre-migration baseline; its whole purpose was proving the migration moved every word. That job is done, so the script was repurposed (see §7) into a structural and link-integrity check that remains useful after a copy rewrite.

## 4. Audience model

| Audience | First question the site must answer | Where it is answered now |
|---|---|---|
| Defence & security institutions | What can you watch for me, and how reliably? | `/defence` |
| Civil & commercial institutions | How fast, and what will I receive? | `/civil`, `/applications` |
| Investors | Why fund this, and what's the ask? | `/investors` (new) |
| Talent | What would I build, and what kind of team? | `/careers` |
| Everyone else | What does R4 do, in one sentence? | Home, first screen |

## 5. Message architecture

A four-layer ladder, so each reader can stop at the depth they need:

- **L0 — Everyone (one sentence):** R4's satellites look at the same place with four kinds of sensors at the same moment — radar, camera, heat, and radio — so decision-makers get one complete, trustworthy picture.
- **L1 — Outcomes:** minutes not days; sees through clouds and darkness; finds dark vessels; maps disasters in hours.
- **L2 — System at a glance:** 3 satellites (one microsatellite, two CubeSats), 4 sensors in one pass, one analytics platform delivering alerts, maps, dashboards, and APIs.
- **L3 — Technical depth:** reserved for controlled engagement. The site states capability; it no longer publishes the detailed comparison charts.

## 6. Voice rules (applied to every rewritten page)

1. **Outcome before mechanism.** Say what the reader gets, then how.
2. **One plain sentence before every term.** "Radar (SAR) bounces radio waves off the ground, so it sees shapes at night and through clouds."
3. **Active voice, reader as subject.** "You see the flood extent in hours", not "flood extent may be derived".
4. **Numbers over adjectives.** "Minutes, not days."
5. **Cut hedges.** No "can support", "may be", "potential", "candidate".
6. **One idea per section; ≤6 main sections per page.** Home and Technology target roughly half their previous word count.
7. **Confident, direct, mission-flavored.** Not marketing-fluffy, not spec-like.

## 7. What changed, page by page

- **Home** — plain hero ("One picture of the Earth. Same moment. Any weather. Any hour."), a plain problem section ("Why today's Earth intelligence arrives late"), the four-sensors answer, audience split, plain KPI band, founder credibility line with an investor link.
- **Technology** — accordion trio and two-axis chart removed; one short three-column comparison table kept; four sensing methods explained in plain language with the radar/camera/heat/radio names used everywhere; the duplicated 4D-framework and capability-overview sections removed (Company owns the ℝ⁴ story); confidentiality condensed to one short section.
- **Applications** — became a hub: audience split with outcome examples, delivery formats, and links out. The nine-record explorer was removed; domain detail now lives once, on Defence and Civil.
- **Defence** — plain hero, simplified decision table, six plain outcome cards.
- **Civil** — plain hero, nine short plain domain items, the event flow, a rewritten disaster example told as a story, delivery models.
- **Company** — added mission and vision from the one-pager, a leadership section (Dr. Kathiravan Thanagvel), plain ℝ⁴ principles, roadmap, and a rewritten FAQ whose first question is "What does R4 do?"
- **Investors (new, `/investors`)** — thesis, the intelligence gap, the Insight Set, the moat with TRL statuses, market and traction, the pre-seed ask ($2.0M for 8%, $25M post-money), use of funds, and the roadmap to Series A.
- **Careers** — plain hero ("Build the eyes that watch over Earth"), twelve roles shortened, "what you'll work on", candidate traits.
- **Contact** — plain hero and simplified form labels; enquiry-parameter cards renamed to plain questions ("How fast", "What to measure", "How to deliver").
- **Footer** — plain tagline; Technology links updated to the new anchors (the removed `#framework` and `#capabilities` anchors no longer exist anywhere).

## 8. Engineering changes that accompanied the copy

- `src/site.ts` — `investors` added to the page map; all titles, descriptions, and Open Graph fields rewritten in plain language.
- `src/App.tsx` — Investors component registered; `src/chrome/Header.tsx` — "Investors" nav item added.
- `src/pageData.ts` — career and civil records rewritten in plain language; the now-unused application records were removed with the Applications explorer.
- `src/widgets/MissionStage.tsx` — diagram labels now read Radar / Camera / Heat / Radio instead of SAR / Optical / Thermal IR / RF.
- `src/chrome/HeroMedia.tsx` + `src/experience.css` — `investors` hero variant added.
- `scripts/verify-content.mjs` — repurposed: the word-parity contract is retired. The script now verifies structural integrity of the built site: every page exists, every internal link and fragment resolves, every image carries alt text, canonical/og:url and meta presence agree with `sitemap.xml`, and only the 404 is `noindex`.
- `sitemap.xml` — `/investors` added.
- `README.md` — page table, document counts, and the `verify` description updated.

## 9. How success will be measured

1. **The layperson test:** someone outside the industry can state what R4 does after reading the Home hero only.
2. **The 5-second test:** each page's H1 states an outcome, not a mechanism.
3. **Dedup:** no application domain is listed on more than one page in full.
4. **Glossary test:** grep shows every jargon term's first use carries a plain gloss.
5. **Structure:** `npm run verify` passes on every build, including link and fragment integrity for the new page.

## 10. Out of scope (deliberate)

- Visual design system, tokens, and motion are unchanged; this was a copy-and-structure replan.
- All existing URLs are kept; Applications, Defence, and Civil remain three URLs (GitHub Pages cannot 301), now with non-overlapping content.
- 404 page content unchanged.
