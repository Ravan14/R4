/*
 * The investor page (new with the content replan — CONTENT-REPORT.md).
 * Carries the one-pager story: thesis, the intelligence gap, the system,
 * the moat with TRL status, market and traction, the pre-seed ask, use of
 * funds, and the roadmap to Series A.
 */

import Layout from '../chrome/Layout.tsx';
import HeroMedia from '../chrome/HeroMedia.tsx';
import Icon, { CardIcon } from '../widgets/Icon.tsx';

/* The band above <main>: breadcrumb, page title and lead. */
function Hero() {
  return (
    <>
      <section className="page-hero page-hero--investors">
        <HeroMedia variant="investors" />
        <div className="container hero-copy">
          <div className="breadcrumb">
            <a href="./">Home</a>
            <span>/</span>
            <span>Investors</span>
          </div>
          <span className="eyebrow">Investor overview</span>
          <h1>The gap between seeing and deciding is worth closing.</h1>
          <p className="lead">R4 is building a satellite system that delivers fused, decision-ready Earth intelligence in minutes, not days. We are raising a pre-seed round to de-risk the software and autonomy stack before we commit to flight hardware.</p>
        </div>
      </section>
    </>
  );
}

export default function Investors() {
  return (
    <Layout page="investors" hero={<Hero />}>
      <section className="section section-grid">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The thesis</span>
            <h2>Minutes, not days.</h2>
            <p className="muted">Strategic decision-makers still rely on slow, fragmented Earth observation. Data arrives late, sensors work in silos, and the operational picture is incomplete when it matters most.</p>
          </div>
          <div className="grid card-list">
            <article className="card">
              <CardIcon name="layers" />
              <span className="card-tag">The gap</span>
              <h3>Sensors work alone</h3>
              <p className="muted">Cameras fail at night and under cloud. Radar sees shape but not identity. Cooperative tracking misses "dark" targets that switch their beacons off. No single sensor delivers a complete picture.</p>
            </article>
            <article className="card">
              <CardIcon name="clock" />
              <span className="card-tag">The gap</span>
              <h3>Workflows are slow and manual</h3>
              <p className="muted">Raw imagery is downloaded, stored, and processed on the ground. Tasking and cross-cueing are largely manual — so answers arrive in hours or days.</p>
            </article>
            <article className="card">
              <CardIcon name="shield" />
              <span className="card-tag">The gap</span>
              <h3>Operational risk compounds</h3>
              <p className="muted">Dark assets go untracked, damage assessment runs late, and situational awareness drops exactly when operational tempo rises.</p>
            </article>
          </div>
          <div className="cta-panel u-mt-l">
            <h2>R4 closes the gap: fused, decision-ready intelligence in minutes, not days.</h2>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The system</span>
            <h2>The Insight Set: one microsatellite, two CubeSats, four sensors.</h2>
            <p className="muted">A purpose-built three-satellite cluster for synchronous multi-modal collection and fusion — designed from day one for real-time intelligence delivery.</p>
          </div>
          <div className="grid card-list">
            <article className="card">
              <CardIcon name="satellite" />
              <span className="card-tag">On orbit</span>
              <h3>One microsatellite</h3>
              <p className="muted">Hyperspectral and thermal imaging provide the "what": what a surface is made of and how hot it is, day and night.</p>
            </article>
            <article className="card">
              <CardIcon name="radar" />
              <span className="card-tag">On orbit</span>
              <h3>Two CubeSats</h3>
              <p className="muted">Radar plus the beacons that ships, aircraft, and radio operators already broadcast (AIS, ADS-B, APRS) provide the "where, when, and who": all-weather change detection and declared movement.</p>
            </article>
            <article className="card">
              <CardIcon name="analytics" />
              <span className="card-tag">Unified software</span>
              <h3>ℝ Analytics Platform</h3>
              <p className="muted">One software stack turns raw sensor readings into mission-ready intelligence: a data platform, operational dashboards, and constellation control.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why now</span>
            <h2>Designed for fusion from the first line of code.</h2>
            <p className="muted">Readiness below uses the NASA TRL scale — technology readiness levels that track a capability from concept (1) to flight-proven (9).</p>
          </div>
          <div className="grid card-list">
            <article className="card">
              <CardIcon name="chip" />
              <span className="card-tag">TRL 3 — software engineering models</span>
              <h3>ℝ AI Engine</h3>
              <p className="muted">An architecture that fuses what the four sensors see — and lets the sensors cue each other automatically while cutting what must be sent to the ground.</p>
            </article>
            <article className="card">
              <CardIcon name="orbit" />
              <span className="card-tag">TRL 3 — concept and design</span>
              <h3>Autonomous formation control</h3>
              <p className="muted">An indigenous guidance, navigation, and control stack for formation flying and collision avoidance — minimising ground intervention.</p>
            </article>
            <article className="card">
              <CardIcon name="integration" />
              <span className="card-tag">PDR-level payload designs</span>
              <h3>Multi-modality by design</h3>
              <p className="muted">Synchronous collection from a coordinated cluster — architected as one integrated system, not stitched-together sensors.</p>
            </article>
          </div>
          <div className="split u-mt-l">
            <div>
              <span className="eyebrow">Market and traction</span>
              <h2>A $100B+ geospatial intelligence ecosystem.</h2>
              <p className="muted">R4 focuses on high-value defence, intelligence, and critical-infrastructure use cases. Early interest has come from government and defence stakeholders in "dark target" tracking and real-time battle-damage-assessment pilots.</p>
            </div>
            <div>
              <span className="eyebrow">Why R4, why now</span>
              <ul className="feature-list">
                <li>
                  <span>Fusion-first architecture — not a retrofitted imaging business.</span>
                </li>
                <li>
                  <span>No incumbent offers synchronous hyperspectral, thermal, radar, and cooperative signals from one coordinated cluster.</span>
                </li>
                <li>
                  <span>Capital-efficient: software, HIL, and payload engineering models come before flight hardware.</span>
                </li>
                <li>
                  <span>Defence and civil agencies are actively seeking resilient, all-weather, real-time intelligence, surveillance, and reconnaissance (ISR).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Pre-seed round</span>
            <h2>$2.0M for 8% equity — $25M post-money valuation.</h2>
          </div>
          <div className="kpi-band">
            <div className="kpi">
              <Icon name="analytics" />
              <strong>$2.0M</strong>
              <span>Pre-seed ask</span>
            </div>
            <div className="kpi">
              <Icon name="integration" />
              <strong>8%</strong>
              <span>Equity offered</span>
            </div>
            <div className="kpi">
              <Icon name="satellite" />
              <strong>$25M</strong>
              <span>Post-money valuation</span>
            </div>
          </div>
          <p className="muted u-mt-m">Capital is concentrated on payload engineering models, multi-modal AI development, and a hardware-in-the-loop autonomy testbed — de-risking the most critical elements before committing to flight hardware.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Roadmap to Series A</span>
            <h2>De-risk software first. Prove demand. Then build.</h2>
          </div>
          <div className="timeline roadmap-track" data-disclosure-group>
            <details className="timeline-item" open>
              <summary>
                <Icon name="chip" className="timeline-icon" />
                <time>Year 1</time>
                <span className="timeline-title" role="heading" aria-level={3}>PDR and fusion engineering models</span>
              </summary>
              <p className="muted">Ground-based engineering models for the sensors; first end-to-end ℝ AI Engine demonstration on multi-modal data; architecture locked at Preliminary Design Review.</p>
            </details>
            <details className="timeline-item">
              <summary>
                <Icon name="orbit" className="timeline-icon" />
                <time>Year 2</time>
                <span className="timeline-title" role="heading" aria-level={3}>CDR and autonomy de-risking</span>
              </summary>
              <p className="muted">Full hardware-in-the-loop testbed for constellation autonomy; Critical Design Review complete; 2–3 signed expressions of interest (LOIs/MOUs) with defence and critical-civil customers.</p>
            </details>
            <details className="timeline-item">
              <summary>
                <Icon name="satellite" className="timeline-icon" />
                <time>Outcome</time>
                <span className="timeline-title" role="heading" aria-level={3}>Series A ready</span>
              </summary>
              <p className="muted">A validated autonomy and fusion stack, clear customer demand, and flight-model specifications ready for manufacturing partners and larger institutional capital.</p>
            </details>
          </div>
        </div>
      </section>
      <section className="section section-sm">
        <div className="container">
          <div className="cta-panel">
            <span className="eyebrow">Partner with us</span>
            <h2>Help close the real-time intelligence gap.</h2>
            <p className="lead muted">For the data room and detailed materials, contact the team.</p>
            <div className="actions">
              <a className="btn btn-primary" href="contact">Request the investor materials</a>
              <a className="btn btn-ghost" href="company">Meet the company</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
