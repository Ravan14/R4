/*
 * Published copy, rewritten in plain language (CONTENT-REPORT.md).
 * The four-rendering comparison is collapsed to one short table; the
 * two-axis chart, the accordion trio, and the duplicated 4D-framework and
 * capability-overview sections are removed. Technical depth is now
 * reserved for controlled engagement.
 */

import Layout from '../chrome/Layout.tsx';
import HeroMedia from '../chrome/HeroMedia.tsx';
import { FormationDiagram, ModalityTimingDiagram } from '../widgets/Diagrams.tsx';
import Icon, { CardIcon } from '../widgets/Icon.tsx';

/* The band above <main>: breadcrumb, page title and lead. */
function Hero() {
  return (
    <>
      <section className="page-hero page-hero--technology">
        <HeroMedia variant="technology" />
        <div className="container hero-copy">
          <div className="breadcrumb">
            <a href="./">Home</a>
            <span>/</span>
            <span>Technology</span>
          </div>
          <span className="eyebrow">Technology</span>
          <h1>Four sensors. One pass. One picture.</h1>
          <p className="lead">R4's satellites look at the same place at the same moment using radar, camera, heat, and radio sensors. Each sees what the others miss — and the platform turns their combined observations into answers decision-makers can act on. Detailed engineering stays confidential; the capability does not.</p>
        </div>
      </section>
    </>
  );
}

export default function Technology() {
  return (
    <Layout page="technology" hero={<Hero />}>
      <section id="insight-set" className="section section-grid">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The system</span>
            <h2>Four ways of seeing, in a single pass.</h2>
            <p className="muted">Most satellites carry one sensor and see one thing. R4's formation carries four complementary sensors that observe the same area together. Each answers a different question — and the answers reinforce each other.</p>
          </div>
          <div className="diagram-layout diagram-layout--wide">
            <figure className="diagram-frame">
              <FormationDiagram />
            </figure>
            <div className="grid card-list">
              <article className="card">
                <CardIcon name="optical" />
                <h3>Camera — what it looks like</h3>
                <p className="muted">A camera in space shows what an area looks like — useful for identifying ships, buildings, and land use when the sky is clear and the sun is up.</p>
              </article>
              <article className="card">
                <CardIcon name="radar" />
                <h3>Radar — what's there, in any weather</h3>
                <p className="muted">Radar (SAR) bounces radio waves off the ground, so it sees shapes and changes at night and through clouds. It cannot name an object — but it always sees that something is there.</p>
              </article>
              <article className="card">
                <CardIcon name="thermal" />
                <h3>Heat — what's active</h3>
                <p className="muted">A thermal sensor sees temperature, revealing fires, running engines, operating plants, and other energetic activity.</p>
              </article>
              <article className="card">
                <CardIcon name="signal" />
                <h3>Radio — what it claims to be</h3>
                <p className="muted">Receivers read cooperative signals — a ship's identity beacon (AIS), an aircraft's transponder (ADS-B) — and compare what they claim against what the other sensors see.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section id="compare" className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The difference</span>
            <h2>Why same-moment matters.</h2>
            <p className="muted">Three ways satellites work together today. R4 chose the third — and built the whole system around it.</p>
          </div>
          <figure className="diagram-frame diagram-frame--flat">
            <ModalityTimingDiagram />
          </figure>
          <div className="compare-wrap" tabIndex={0} role="region" aria-label="Comparison table, scrollable">
            <table className="compare-table" aria-label="Comparison of single-sensor, tip-and-cue, and synchronous observation">
              <thead>
                <tr>
                  <th>How it works</th>
                  <th>Single-sensor</th>
                  <th>Tip-and-cue</th>
                  <th>Synchronous</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>What happens</strong>
                  </td>
                  <td data-label="Single-sensor">One satellite, one kind of sensor</td>
                  <td data-label="Tip-and-cue">One satellite spots something, another is cued to look later</td>
                  <td data-label="Synchronous">Four sensors in formation look together</td>
                </tr>
                <tr>
                  <td>
                    <strong>How long you wait</strong>
                  </td>
                  <td data-label="Single-sensor">Hours to days for a second pass</td>
                  <td data-label="Tip-and-cue">Minutes to hours between looks</td>
                  <td data-label="Synchronous">The same moment</td>
                </tr>
                <tr>
                  <td>
                    <strong>What you learn</strong>
                  </td>
                  <td data-label="Single-sensor">One kind of evidence</td>
                  <td data-label="Tip-and-cue">Two kinds of evidence, taken at different times</td>
                  <td data-label="Synchronous">Four kinds of evidence, aligned to one event</td>
                </tr>
                <tr>
                  <td>
                    <strong>What's missing</strong>
                  </td>
                  <td data-label="Single-sensor">Clouds, darkness, or a silent target can blind it</td>
                  <td data-label="Tip-and-cue">The scene can change between looks</td>
                  <td data-label="Synchronous">Each sensor covers the others' blind spots</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="analytics" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">From data to answers</span>
            <h2>Observations become decisions.</h2>
            <p className="muted">The ℝ Analytics Platform does the heavy lifting: it matches every observation to the same place and time, spots what changed, estimates confidence, and hands you a ranked list of what deserves attention.</p>
          </div>
          <div className="flow">
            <div className="flow-step">
              <Icon name="optical" />
              <strong>Observe</strong>
              <span>Four sensors, one pass</span>
            </div>
            <div className="flow-step">
              <Icon name="integration" />
              <strong>Correlate</strong>
              <span>Match everything to the same place and time</span>
            </div>
            <div className="flow-step">
              <Icon name="analytics" />
              <strong>Assess</strong>
              <span>Spot change and score confidence</span>
            </div>
            <div className="flow-step">
              <Icon name="signal" />
              <strong>Prioritise</strong>
              <span>Rank what deserves attention</span>
            </div>
            <div className="flow-step">
              <Icon name="link" />
              <strong>Deliver</strong>
              <span>Alerts, maps, and dashboards</span>
            </div>
          </div>
          <div className="grid card-list u-mt-l">
            <article className="card">
              <CardIcon name="integration" />
              <h3>One record per event</h3>
              <p className="muted">Every observation about a place, object, or event is matched into a single, coherent record.</p>
            </article>
            <article className="card">
              <CardIcon name="compass" />
              <h3>Confidence you can act on</h3>
              <p className="muted">The platform separates what is confirmed from what is probable — so decisions are made with open eyes.</p>
            </article>
            <article className="card">
              <CardIcon name="shield" />
              <h3>Delivered to the right people</h3>
              <p className="muted">Outputs reach authorised teams through role-based, auditable channels.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <div className="cta-panel">
            <span className="eyebrow">Proprietary by design</span>
            <h2>Capability is public. Implementation stays protected.</h2>
            <p className="muted">This page describes what the system does. Sensor parameters, timing methods, orbital geometry, and resilience mechanisms are shared only with qualified customers, partners, and investors under an appropriate confidentiality framework.</p>
            <div className="actions">
              <a className="btn btn-primary" href="contact">Request a capability briefing</a>
              <a className="btn btn-ghost" href="applications">See what it can do</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
