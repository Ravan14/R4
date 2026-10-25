/*
 * Published copy, rewritten in plain language (CONTENT-REPORT.md).
 * Adds the mission and vision from the one-pager, a leadership section,
 * plain ℝ⁴ principles, and a rewritten FAQ whose first question is the
 * one visitors actually ask. The five FAQ items render statically; the
 * vanilla search controller enhances their existing search input.
 */

import Layout from '../chrome/Layout.tsx';
import HeroMedia from '../chrome/HeroMedia.tsx';
import SearchableList from '../widgets/SearchableList.tsx';
import { GroundTrackDiagram } from '../widgets/Diagrams.tsx';
import Icon, { CardIcon } from '../widgets/Icon.tsx';

/* The band above <main>: breadcrumb, page title and lead. */
function Hero() {
  return (
    <>
      <section className="page-hero page-hero--company">
        <HeroMedia variant="company" />
        <div className="container hero-copy">
          <div className="breadcrumb">
            <a href="./">Home</a>
            <span>/</span>
            <span>Company</span>
          </div>
          <span className="eyebrow">Company</span>
          <h1>We exist to close the gap between seeing and deciding.</h1>
          <p className="lead">R4 Aerospace &amp; Defence Private Limited builds satellite systems that turn same-moment, all-weather observation into decisions — for defence, civil, environmental, and commercial missions.</p>
        </div>
      </section>
    </>
  );
}

export default function Company() {
  return (
    <Layout page="company" hero={<Hero />}>
      <section className="section section-grid">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why we exist</span>
            <h2>Mission and vision</h2>
          </div>
          <div className="split">
            <div>
              <h3>Our objective</h3>
              <p className="muted">Deliver fused, decision-ready intelligence in minutes, not days.</p>
              <h3>Our vision</h3>
              <p className="muted">To be the leading provider of multi-modal Earth intelligence — delivering real-time, all-weather situational awareness for defence, security, and critical civil infrastructure worldwide.</p>
              <ul className="feature-list">
                <li>
                  <span>Indigenous intellectual property and sovereign data-custody pathways.</span>
                </li>
                <li>
                  <span>Dual-use architecture for defence, civil, environmental, and commercial missions.</span>
                </li>
                <li>
                  <span>Mission-oriented development through application studies, pilots, and institutional collaboration.</span>
                </li>
              </ul>
            </div>
            <div className="media-frame media-frame--dark">
              <img src="4D2.webp" alt="R4 integrated intelligence framework" width="1400" height="1424" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How we work</span>
            <h2>ℝ<sup>4</sup>: Resilient, Responsive, Real-time, Reconnaissance.</h2>
            <p className="muted">Four principles guide how we build, operate, and deliver.</p>
          </div>
          <div className="grid grid-2 principle-grid">
            <article className="card">
              <CardIcon name="shield" />
              <h3>Resilient</h3>
              <p className="muted">Distributed spacecraft and secure data handling keep the mission going when one path is constrained.</p>
            </article>
            <article className="card">
              <CardIcon name="sync" />
              <h3>Responsive</h3>
              <p className="muted">Tasking adapts to what is happening, with priorities set by the mission — not the sensor.</p>
            </article>
            <article className="card">
              <CardIcon name="clock" />
              <h3>Real-time</h3>
              <p className="muted">Onboard computing and automation cut the gap between sensing and deciding.</p>
            </article>
            <article className="card">
              <CardIcon name="optical" />
              <h3>Reconnaissance</h3>
              <p className="muted">Four sensors look together, producing evidence that corroborates itself.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Development roadmap</span>
            <h2>Progressive maturation from design to operational scale.</h2>
          </div>
          <figure className="diagram-frame diagram-frame--flat">
            <GroundTrackDiagram />
          </figure>
          <div className="timeline roadmap-track" data-disclosure-group>
            <details className="timeline-item" open>
              <summary>
                <Icon name="compass" className="timeline-icon" />
                <time>Q3–Q4 2026</time>
                <span className="timeline-title" role="heading" aria-level={3}>Architecture and preliminary design</span>
              </summary>
              <p className="muted">Complete preliminary design activities, payload trade studies, formation concepts, ground-segment architecture, and application requirements.</p>
            </details>
            <details className="timeline-item">
              <summary>
                <Icon name="chip" className="timeline-icon" />
                <time>2027</time>
                <span className="timeline-title" role="heading" aria-level={3}>Critical design and subsystem validation</span>
              </summary>
              <p className="muted">Advance critical design, payload and platform testing, analytical MVP development, interface validation, and pilot preparation.</p>
            </details>
            <details className="timeline-item">
              <summary>
                <Icon name="satellite" className="timeline-icon" />
                <time>Q4 2027–Q1 2028</time>
                <span className="timeline-title" role="heading" aria-level={3}>Pathfinder mission and early access</span>
              </summary>
              <p className="muted">Target pathfinder deployment, commissioning, calibration, reference-data validation, and early-access customer programmes.</p>
            </details>
            <details className="timeline-item">
              <summary>
                <Icon name="orbit" className="timeline-icon" />
                <time>2029 onward</time>
                <span className="timeline-title" role="heading" aria-level={3}>Constellation expansion</span>
              </summary>
              <p className="muted">Scale observation capacity, geographic coverage, revisit performance, analytical automation, and institutional service delivery.</p>
            </details>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Leadership and team</span>
            <h2>Engineer-led. Interdisciplinary.</h2>
          </div>
          <div className="grid card-list team-list">
            <article className="card">
              <CardIcon name="people" />
              <span className="card-tag">Leadership</span>
              <h3>Dr. Kathiravan Thanagvel</h3>
              <p className="muted">Founder. Leads R4's technical and institutional strategy, uniting spacecraft engineering, sensing science, and analytical software in one team.</p>
            </article>
            <article className="card">
              <CardIcon name="satellite" />
              <h3>Spacecraft and mission engineering</h3>
              <p className="muted">Architecture, systems engineering, payload integration, formation flight, reliability, verification, and mission operations.</p>
            </article>
            <article className="card">
              <CardIcon name="analytics" />
              <h3>Remote sensing and analytics</h3>
              <p className="muted">Radar, camera, heat, and radio science, geospatial analysis, machine learning, and Earth-observation applications.</p>
            </article>
            <article className="card">
              <CardIcon name="people" />
              <h3>Institutional and strategic collaboration</h3>
              <p className="muted">Defence, government, industry, research, regulatory, commercialisation, and international partnership development.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Frequently asked questions</span>
            <h2>Questions we are asked most</h2>
          </div>
          <SearchableList
            inputId="faqSearch"
            inputClass="search-field"
            placeholder="Search questions"
            ariaLabel="Search frequently asked questions"
            listClass="faq-list"
          >
            <details>
              <summary>What does R4 do?</summary>
              <p>R4 flies a small formation of satellites that look at the same place with four kinds of sensors at the same moment — radar, camera, heat, and radio. The result is one complete, trustworthy picture of what is happening, delivered in minutes rather than days, for defence and civil missions.</p>
            </details>
            <details>
              <summary>What is the Insight Set?</summary>
              <p>The Insight Set is our satellite formation: one microsatellite and two CubeSats flying together, sharing the sensing workload across radar, camera, heat, and radio.</p>
            </details>
            <details>
              <summary>Why does same-moment sensing matter?</summary>
              <p>Things change fast — a vessel moves, a fire spreads, a border shifts. When four sensors observe the same moment, their evidence reinforces rather than contradicts, and the picture stays true.</p>
            </details>
            <details>
              <summary>What does the ℝ Analytics Platform produce?</summary>
              <p>Map layers, detections, change products, anomaly indicators, risk scores, alerts, dashboards, secure APIs, and evidence reports — each with a confidence level.</p>
            </details>
            <details>
              <summary>Is this only for defence?</summary>
              <p>No. The same system serves public safety, environmental monitoring, agriculture, infrastructure, energy, maritime safety, and insurance.</p>
            </details>
            <details>
              <summary>How can an institution work with R4?</summary>
              <p>Through mission studies, application validation, data-pipeline integration, pilot projects, research collaboration, subsystem partnerships, or strategic investment.</p>
            </details>
          </SearchableList>
        </div>
      </section>
      <section className="section section-sm">
        <div className="container">
          <div className="cta-panel">
            <span className="eyebrow">Collaboration</span>
            <h2>Join the mission — as a partner, a customer, or a collaborator.</h2>
            <div className="actions">
              <a className="btn btn-primary" href="contact">Contact R4</a>
              <a className="btn btn-ghost" href="careers">Explore careers</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
