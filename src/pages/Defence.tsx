/*
 * Published copy, rewritten in plain language (CONTENT-REPORT.md).
 * The decision table is kept and simplified; the six domains become short
 * outcome cards; the data-question-select controller still targets the
 * decision-chain diagram below the table.
 */

import Layout from '../chrome/Layout.tsx';
import HeroMedia from '../chrome/HeroMedia.tsx';
import { DecisionChainDiagram } from '../widgets/Diagrams.tsx';
import { CardIcon } from '../widgets/Icon.tsx';

/* The band above <main>: breadcrumb, page title and lead. */
function Hero() {
  return (
    <>
      <section className="page-hero page-hero--defence">
        <HeroMedia variant="defence" />
        <div className="container hero-copy">
          <div className="breadcrumb">
            <a href="./">Home</a>
            <span>/</span>
            <span>Defence &amp; Security</span>
          </div>
          <span className="eyebrow">Defence &amp; Security</span>
          <h1>Watch what matters. Day and night. Even when someone hides.</h1>
          <p className="lead">R4 gives defence and security teams a persistent, all-weather view of sea lanes, borders, and strategic sites — with evidence that is verified the moment it is collected, not hours later.</p>
        </div>
      </section>
    </>
  );
}

export default function Defence() {
  return (
    <Layout page="defence" hero={<Hero />}>
      <section className="section section-grid">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Four sensors answer the question together.</h2>
            <p className="muted">Defence decisions depend on telling declared activity from observed behaviour. Here is how the four sensors answer four questions.</p>
          </div>
          <div className="compare-wrap" tabIndex={0} role="region" aria-label="Comparison table, scrollable">
            <table className="compare-table" data-question-table>
              <thead>
                <tr>
                  <th>Observation question</th>
                  <th>Primary evidence</th>
                  <th>Corroborating evidence</th>
                  <th>Potential output</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a className="compare-question" href="#decision-chain" data-question-select><strong>Is something there?</strong></a>
                  </td>
                  <td data-label="Primary evidence">Radar sees structure</td>
                  <td data-label="Corroborating evidence">Camera or heat confirms</td>
                  <td data-label="Potential output">A flagged location with a confidence score</td>
                </tr>
                <tr>
                  <td>
                    <a className="compare-question" href="#decision-chain" data-question-select><strong>Is its identity real?</strong></a>
                  </td>
                  <td data-label="Primary evidence">Radio beacons say who it claims to be</td>
                  <td data-label="Corroborating evidence">The other sensors check position and behaviour</td>
                  <td data-label="Potential output">An identity-consistency check</td>
                </tr>
                <tr>
                  <td>
                    <a className="compare-question" href="#decision-chain" data-question-select><strong>Has activity changed?</strong></a>
                  </td>
                  <td data-label="Primary evidence">Radar and camera images over time</td>
                  <td data-label="Corroborating evidence">Heat or radio activity shifts</td>
                  <td data-label="Potential output">A change map with an event label</td>
                </tr>
                <tr>
                  <td>
                    <a className="compare-question" href="#decision-chain" data-question-select><strong>Does it need review?</strong></a>
                  </td>
                  <td data-label="Primary evidence">Anomaly indicators from all four sensors</td>
                  <td data-label="Corroborating evidence">Historical baseline and context</td>
                  <td data-label="Potential output">A prioritised alert with an evidence package</td>
                </tr>
              </tbody>
            </table>
          </div>
          <figure id="decision-chain" className="diagram-frame diagram-frame--flat decision-chain" data-decision-chain>
            <DecisionChainDiagram />
          </figure>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Mission domains</span>
            <h2>What R4 watches for you</h2>
            <p className="muted">High-level, non-tactical capability areas — developed further through mission studies with your team.</p>
          </div>
          <div className="grid card-list">
            <article className="card">
              <CardIcon name="wave" />
              <span className="card-tag">Maritime</span>
              <h3>Dark vessels and busy sea lanes</h3>
              <p className="muted">Track ships that switch off their radios, and see the ports, routes, and offshore sites they use.</p>
              <ul className="feature-list">
                <li>
                  <span>Non-cooperative and dark-vessel indications</span>
                </li>
                <li>
                  <span>Rendezvous and loitering patterns</span>
                </li>
                <li>
                  <span>Port and sea-lane activity</span>
                </li>
              </ul>
            </article>
            <article className="card">
              <CardIcon name="shield" />
              <span className="card-tag">Land</span>
              <h3>Borders and corridors</h3>
              <p className="muted">Watch designated border regions and access routes for change — in any weather.</p>
              <ul className="feature-list">
                <li>
                  <span>Change over time, route by route</span>
                </li>
                <li>
                  <span>Temporary structures and mobility indicators</span>
                </li>
                <li>
                  <span>Weather-independent radar coverage</span>
                </li>
              </ul>
            </article>
            <article className="card">
              <CardIcon name="satellite" />
              <span className="card-tag">Aerospace</span>
              <h3>Airfields and flight activity</h3>
              <p className="muted">Monitor designated airfields, runway use, aircraft presence, and heat activity — and check identities against transponders.</p>
              <ul className="feature-list">
                <li>
                  <span>Transponder consistency analysis</span>
                </li>
                <li>
                  <span>Infrastructure and apron change</span>
                </li>
                <li>
                  <span>Activity-state indicators</span>
                </li>
              </ul>
            </article>
            <article className="card">
              <CardIcon name="infrastructure" />
              <span className="card-tag">Strategic</span>
              <h3>Critical infrastructure</h3>
              <p className="muted">Keep persistent watch over selected energy, transport, communications, and logistics sites.</p>
              <ul className="feature-list">
                <li>
                  <span>Structural and land-use change</span>
                </li>
                <li>
                  <span>Thermal anomaly detection</span>
                </li>
                <li>
                  <span>Operational continuity indicators</span>
                </li>
              </ul>
            </article>
            <article className="card">
              <CardIcon name="radar" />
              <span className="card-tag">Intelligence support</span>
              <h3>Wide-area situational awareness</h3>
              <p className="muted">Give analysts a prioritised feed of corroborated changes — not raw imagery.</p>
              <ul className="feature-list">
                <li>
                  <span>Object and activity detection</span>
                </li>
                <li>
                  <span>Evidence-linked alerting</span>
                </li>
                <li>
                  <span>Confidence and uncertainty metadata</span>
                </li>
              </ul>
            </article>
            <article className="card">
              <CardIcon name="people" />
              <span className="card-tag">Humanitarian</span>
              <h3>Defence support to civil authorities</h3>
              <p className="muted">Support disaster response with rapid flood maps, access routes, and infrastructure status.</p>
              <ul className="feature-list">
                <li>
                  <span>Rapid flood and damage mapping</span>
                </li>
                <li>
                  <span>Access and logistics assessment</span>
                </li>
                <li>
                  <span>Common operating picture support</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="media-frame">
              <img src="D3.webp" alt="Illustrative defence and civil applications overview" width="1400" height="1400" loading="lazy" decoding="async" />
            </div>
            <div>
              <span className="eyebrow">Sovereign by design</span>
              <h2>Fits the systems and rules you already have.</h2>
              <p className="muted">Outputs are delivered as alerts, map layers, imagery, change maps, summaries, and machine-readable feeds — and can be deployed under sovereign data custody, with controlled access and full auditability.</p>
              <div className="pill-row">
                <span className="pill">Command-system integration</span>
                <span className="pill">GIS interoperability</span>
                <span className="pill">Role-based access</span>
                <span className="pill">Auditability</span>
                <span className="pill">On-premise options</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-sm">
        <div className="container">
          <div className="cta-panel">
            <span className="eyebrow">Defence mission study</span>
            <h2>Tell us what you need to watch. We'll propose how to watch it.</h2>
            <div className="actions">
              <a className="btn btn-primary" href="contact">Request a mission discussion</a>
              <a className="btn btn-ghost" href="technology">See the technology</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
