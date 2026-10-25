/*
 * Published copy, rewritten in plain language (CONTENT-REPORT.md).
 * This page is now a hub: audience split, delivery formats, and links out.
 * The nine-record explorer was removed — each domain is described once,
 * on its audience page (Defence or Civil).
 */

import Layout from '../chrome/Layout.tsx';
import HeroMedia from '../chrome/HeroMedia.tsx';
import { FrameworkDiagram } from '../widgets/Diagrams.tsx';
import Icon, { CardIcon } from '../widgets/Icon.tsx';

/* The band above <main>: breadcrumb, page title and lead. */
function Hero() {
  return (
    <>
      <section className="page-hero page-hero--applications">
        <HeroMedia variant="applications" />
        <div className="container hero-copy">
          <div className="breadcrumb">
            <a href="./">Home</a>
            <span>/</span>
            <span>Applications</span>
          </div>
          <span className="eyebrow">Applications</span>
          <h1>One system, many missions.</h1>
          <p className="lead">The same satellites that watch over national security also map floods, monitor crops, and protect infrastructure. Choose the world you work in.</p>
        </div>
      </section>
    </>
  );
}

export default function Applications() {
  return (
    <Layout page="applications" hero={<Hero />}>
      <section className="section section-grid">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Choose your mission</span>
            <h2>One sensing system, two audiences.</h2>
            <p className="muted">The sensors are the same. What changes is what you ask them to watch — and what you receive.</p>
          </div>
          <div className="grid grid-2 portfolio-split">
            <article className="card">
              <CardIcon name="shield" />
              <span className="card-tag">Defence &amp; security</span>
              <h3>Watch what matters, day and night.</h3>
              <p className="muted">A persistent, all-weather view of sea lanes, borders, and strategic sites — with evidence verified the moment it is collected.</p>
              <ul className="feature-list">
                <li><span>Dark vessels that switch off their radios</span></li>
                <li><span>Borders, corridors, and temporary structures</span></li>
                <li><span>Airfields, ports, and strategic sites</span></li>
              </ul>
              <p className="card-action">
                <a className="link-arrow" href="defence">Explore defence applications <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
              </p>
            </article>
            <article className="card">
              <CardIcon name="globe" />
              <span className="card-tag">Civil &amp; commercial</span>
              <h3>See the disaster, the change, the risk.</h3>
              <p className="muted">Same-moment, all-weather observation for public safety, the environment, industry, and insurance.</p>
              <ul className="feature-list">
                <li><span>Flood and fire maps within hours</span></li>
                <li><span>Crop, water, and climate intelligence</span></li>
                <li><span>Infrastructure condition and risk evidence</span></li>
              </ul>
              <p className="card-action">
                <a className="link-arrow" href="civil">Explore civil applications <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
              </p>
            </article>
          </div>
        </div>
      </section>
      <section id="delivery" className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What you receive</span>
            <h2>Answers in the formats your team already uses.</h2>
          </div>
          <div className="mission-panel">
            <img className="mission-map" src="D3.webp" alt="Illustrative Earth intelligence mission display" width="1400" height="1400" loading="lazy" decoding="async" />
            <div className="mission-readout">
              <div className="readout">
                <Icon name="layers" />
                <small>Sensors</small>
                <strong>Radar · Camera · Heat · Radio</strong>
              </div>
              <div className="readout">
                <Icon name="sync" />
                <small>Status</small>
                <strong className="status">Same-moment correlation active</strong>
              </div>
              <div className="readout">
                <Icon name="analytics" />
                <small>Outputs</small>
                <strong>Alert · Map layer · Change map · Evidence report</strong>
              </div>
              <div className="readout">
                <Icon name="integration" />
                <small>Fits into</small>
                <strong>Command systems · GIS · API · Dashboard</strong>
              </div>
              <div className="readout">
                <Icon name="compass" />
                <small>Goal</small>
                <strong>Less uncertainty, faster decisions</strong>
              </div>
            </div>
          </div>
          <figure className="diagram-frame diagram-frame--flat">
            <FrameworkDiagram />
          </figure>
          <div className="grid card-list u-mt-m">
            <article className="card">
              <CardIcon name="signal" />
              <h3>Event alerts</h3>
              <p className="muted">A notification with location, confidence, and the evidence behind it — the moment a threshold is crossed.</p>
            </article>
            <article className="card">
              <CardIcon name="layers" />
              <h3>Geospatial layers</h3>
              <p className="muted">Raster, vector, and time-series layers that drop into standard GIS environments.</p>
            </article>
            <article className="card">
              <CardIcon name="analytics" />
              <h3>Analytical dashboards</h3>
              <p className="muted">A live view of your areas of interest: what changed, what it means, and what happened before.</p>
            </article>
            <article className="card">
              <CardIcon name="link" />
              <h3>Secure APIs</h3>
              <p className="muted">Machine-readable feeds for command, enterprise, and automated-response systems.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cta-panel">
            <span className="eyebrow">Your mission</span>
            <h2>Tell us the problem. We'll translate it into a sensing and delivery plan.</h2>
            <div className="actions">
              <a className="btn btn-primary" href="contact">Discuss an application</a>
              <a className="btn btn-ghost" href="defence">Defence portfolio</a>
              <a className="btn btn-ghost" href="civil">Civil portfolio</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
