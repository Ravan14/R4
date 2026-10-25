/*
 * Published copy, rewritten in plain language (CONTENT-REPORT.md).
 * The nine disclosure items now carry the plain records from src/pageData.ts;
 * the disaster case is told as a story; the event flow keeps its
 * data-event-flow / data-flow-step hooks for the scroll controller.
 */

import Layout from '../chrome/Layout.tsx';
import HeroMedia from '../chrome/HeroMedia.tsx';
import Icon, { CardIcon } from '../widgets/Icon.tsx';
import DisclosureList from '../widgets/DisclosureList.tsx';
import { civilRecords } from '../pageData.ts';

/* The band above <main>: breadcrumb, page title and lead. */
function Hero() {
  return (
    <>
      <section className="page-hero page-hero--civil">
        <HeroMedia variant="civil" />
        <div className="container hero-copy">
          <div className="breadcrumb">
            <a href="./">Home</a>
            <span>/</span>
            <span>Civil &amp; Commercial</span>
          </div>
          <span className="eyebrow">Civil &amp; Commercial</span>
          <h1>See the disaster. See the change. See the risk — in hours, not days.</h1>
          <p className="lead">R4 helps civil and commercial teams map floods and fires fast, watch crops and water, keep infrastructure safe, and give insurers hard evidence.</p>
        </div>
      </section>
    </>
  );
}

export default function Civil() {
  return (
    <Layout page="civil" hero={<Hero />}>
      <section className="section section-grid">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Public and economic value</span>
            <h2>What R4 can do for you</h2>
            <p className="muted">Because the four sensors measure the same moment, the picture stays true even while conditions change rapidly.</p>
          </div>
          <DisclosureList records={civilRecords} className="civil-domains" />
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How a request becomes an answer</span>
            <h2>From event to decision support</h2>
          </div>
          <div className="flow" data-event-flow>
            <a className="flow-step" href="#civil-response" data-flow-step>
              <Icon name="signal" />
              <strong>Event or request</strong>
              <span>A hazard, an asset, or a policy question</span>
            </a>
            <a className="flow-step" href="#civil-response" data-flow-step>
              <Icon name="compass" />
              <strong>Task area</strong>
              <span>Define the area, timing, and priority</span>
            </a>
            <a className="flow-step" href="#civil-response" data-flow-step>
              <Icon name="satellite" />
              <strong>Acquire evidence</strong>
              <span>Four sensors, one pass</span>
            </a>
            <a className="flow-step" href="#civil-response" data-flow-step>
              <Icon name="analytics" />
              <strong>Analyse</strong>
              <span>Extent, change, anomaly, and risk</span>
            </a>
            <a className="flow-step" href="#civil-response" data-flow-step>
              <Icon name="link" />
              <strong>Disseminate</strong>
              <span>Authorities, operators, or enterprises</span>
            </a>
          </div>
        </div>
      </section>
      <section id="civil-response" className="section">
        <div className="container">
          <div className="split reverse event-response" data-event-response>
            <div className="media-frame">
              <img src="D3.webp" alt="Dual-use Earth intelligence applications" width="1400" height="1400" loading="lazy" decoding="async" />
            </div>
            <div>
              <span className="eyebrow">Example: the morning after the storm</span>
              <h2>One operating picture, before the clouds clear.</h2>
              <p className="muted">A storm has passed and clouds still cover the region. A camera alone sees nothing. R4's radar maps the flood extent through the clouds; the heat sensor finds lingering fires and running generators; the camera fills in detail wherever the sky clears; radio data tracks ships and aircraft in the area. Combined, they give response teams one operating picture — hours before a single-sensor approach could.</p>
              <ul className="feature-list">
                <li>
                  <span>Flood extent and severity, in hours</span>
                </li>
                <li>
                  <span>Which roads and bridges are still open</span>
                </li>
                <li>
                  <span>Status of hospitals, power, and water</span>
                </li>
                <li>
                  <span>Prioritised maps for response coordination</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Delivery models</span>
            <h2>Built around how you work.</h2>
          </div>
          <div className="grid card-list">
            <article className="card">
              <CardIcon name="sync" />
              <h3>Monitoring subscription</h3>
              <p className="muted">Recurring observation of your areas of interest, with change alerts and periodic reports.</p>
            </article>
            <article className="card">
              <CardIcon name="signal" />
              <h3>Event response</h3>
              <p className="muted">Time-critical tasking and analysis when a hazard strikes.</p>
            </article>
            <article className="card">
              <CardIcon name="link" />
              <h3>API integration</h3>
              <p className="muted">Machine-readable indicators that plug into your own platforms.</p>
            </article>
            <article className="card">
              <CardIcon name="compass" />
              <h3>Pilot and validation</h3>
              <p className="muted">Evaluate the capability against your reference data before you commit.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-sm">
        <div className="container">
          <div className="cta-panel">
            <span className="eyebrow">Civil application study</span>
            <h2>Tell us what you need to measure. We'll define how often and how fast.</h2>
            <div className="actions">
              <a className="btn btn-primary" href="contact">Discuss a civil application</a>
              <a className="btn btn-ghost" href="applications">View all applications</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
