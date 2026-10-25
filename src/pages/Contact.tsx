/*
 * Published copy, rewritten in plain language (CONTENT-REPORT.md).
 * The native mailto form is still enhanced by src/client.ts, and the
 * locator diagram continues to avoid an embedded third-party map.
 */

import Layout from '../chrome/Layout.tsx';
import HeroMedia from '../chrome/HeroMedia.tsx';
import { LocatorDiagram } from '../widgets/Diagrams.tsx';
import Icon, { CardIcon } from '../widgets/Icon.tsx';

/* The band above <main>: breadcrumb, page title and lead. */
function Hero() {
  return (
    <>
      <section className="page-hero page-hero--contact">
        <HeroMedia variant="contact" />
        <div className="container hero-copy">
          <div className="breadcrumb">
            <a href="./">Home</a>
            <span>/</span>
            <span>Contact</span>
          </div>
          <span className="eyebrow">Contact</span>
          <h1>Tell us what you need to see.</h1>
          <p className="lead">Share the mission context, the area you care about, and how fast you need answers. We'll take it from there.</p>
        </div>
      </section>
    </>
  );
}

export default function Contact() {
  return (
    <Layout page="contact" hero={<Hero />}>
      <section className="section section-grid">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-stack">
              <a className="contact-item" href="mailto:info@r4space.com">
                <Icon name="mail" />
                <span>
                  <strong>General enquiries</strong>
                  <span>info@r4space.com</span>
                </span>
              </a>
              <a className="contact-item" href="mailto:careers@r4space.com">
                <Icon name="people" />
                <span>
                  <strong>Careers and internships</strong>
                  <span>careers@r4space.com</span>
                </span>
              </a>
              <a className="contact-item" href="tel:+919487266145">
                <Icon name="phone" />
                <span>
                  <strong>Telephone</strong>
                  <span>+91 94872 66145</span>
                </span>
              </a>
              <a className="contact-item" href="https://www.google.com/maps?q=Puliampatti,India" target="_blank" rel="noopener">
                <Icon name="pin" />
                <span>
                  <strong>Registered location</strong>
                  <span>Puliampatti, Tamil Nadu, India</span>
                </span>
              </a>
              <a className="contact-item" href="https://www.linkedin.com/company/r4-aerospace-and-defence/" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM2.5 9.5h5V21h-5zM9.5 9.5h4.8v1.6h.07a5.3 5.3 0 014.77-2.6c5.1 0 6.03 3.35 6.03 7.7V21h-5v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.71V21h-5z" />
                </svg>
                <span>
                  <strong>LinkedIn</strong>
                  <span>R4 Aerospace and Defence</span>
                </span>
              </a>
            </div>
            <form id="contactForm" className="contact-form" aria-label="Contact enquiry form" action="mailto:info@r4space.com" method="post" encType="text/plain" data-contact-form>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />
              </div>
              <div className="field">
                <label htmlFor="organisation">Organisation</label>
                <input id="organisation" name="organisation" type="text" />
              </div>
              <div className="field">
                <label htmlFor="domain">Application domain</label>
                <select id="domain" name="domain">
                  <option value="">Select a domain</option>
                  <option>Defence and security</option>
                  <option>Maritime</option>
                  <option>Disaster management</option>
                  <option>Environment and climate</option>
                  <option>Infrastructure and energy</option>
                  <option>Agriculture and water</option>
                  <option>Insurance and risk</option>
                  <option>Technology partnership</option>
                  <option>Investment and strategic collaboration</option>
                </select>
              </div>
              <div className="field full">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" defaultValue="R4 Website Enquiry" />
              </div>
              <div className="field full">
                <label htmlFor="message">What do you need to see?</label>
                <textarea id="message" name="message" placeholder="Describe the area, the event or asset, and how fast you need answers." required />
              </div>
              <button className="btn btn-primary" type="submit">Prepare Email</button>
              <p className="form-note">Submission opens the default email application with the completed enquiry. No form data is stored by this static website.</p>
            </form>
          </div>
          <div className="map-frame">
            <LocatorDiagram />
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Helpful details</span>
            <h2>What helps us answer faster</h2>
          </div>
          <div className="grid card-list">
            <article className="card">
              <CardIcon name="pin" />
              <h3>Where</h3>
              <p className="muted">Region, corridor, asset group, or geographic extent.</p>
            </article>
            <article className="card">
              <CardIcon name="clock" />
              <h3>How fast</h3>
              <p className="muted">Observation window, revisit need, and alert latency.</p>
            </article>
            <article className="card">
              <CardIcon name="compass" />
              <h3>What to measure</h3>
              <p className="muted">The object, activity, change, hazard, condition, anomaly, or risk.</p>
            </article>
            <article className="card">
              <CardIcon name="link" />
              <h3>How to deliver</h3>
              <p className="muted">Dashboard, alert, API, GIS layer, report, or command-system integration.</p>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
}
