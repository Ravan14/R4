/*
 * Published copy, rewritten in plain language (CONTENT-REPORT.md).
 * The six discipline buttons and twelve role cards still render statically
 * and are enhanced by the vanilla filter runtime; the role records now
 * carry the plain descriptions from src/pageData.ts.
 */

import Layout from '../chrome/Layout.tsx';
import HeroMedia from '../chrome/HeroMedia.tsx';
import RecordExplorer from '../widgets/RecordExplorer.tsx';
import { careerRecords } from '../pageData.ts';
import { CandidateProfileDiagram } from '../widgets/Diagrams.tsx';
import { CardIcon } from '../widgets/Icon.tsx';

/* The band above <main>: breadcrumb, page title and lead. */
function Hero() {
  return (
    <>
      <section className="page-hero page-hero--careers">
        <HeroMedia variant="careers" />
        <div className="container hero-copy">
          <div className="breadcrumb">
            <a href="./">Home</a>
            <span>/</span>
            <span>Careers</span>
          </div>
          <span className="eyebrow">Careers</span>
          <h1>Build the eyes that watch over Earth.</h1>
          <p className="lead">Join a team building satellites, sensing science, and the software that turns observations into decisions.</p>
        </div>
      </section>
    </>
  );
}

export default function Careers() {
  return (
    <Layout page="careers" hero={<Hero />}>
      <section className="section section-grid">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Disciplines</span>
            <h2>Where you can contribute</h2>
            <p className="muted">Open roles vary with programme phase. These disciplines show where we recruit, intern, and collaborate.</p>
          </div>
          <RecordExplorer
            records={careerRecords}
            categoryAttr="data-career-category"
            label="Career and research domains"
            variant="roles"
            filters={[
              { value: 'all', label: 'All' },
              { value: 'space', label: 'Space systems' },
              { value: 'data', label: 'Data & AI' },
              { value: 'platform', label: 'Software & security' },
              { value: 'business', label: 'Business & policy' },
              { value: 'intern', label: 'Internships' },
            ]}
          />
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What you'll work on</span>
            <h2>Hard problems, real outcomes.</h2>
          </div>
          <div className="grid card-list">
            <article className="card">
              <CardIcon name="orbit" />
              <h3>Spacecraft that fly together</h3>
              <p className="muted">Formation flying, payload integration, and mission operations for a three-satellite cluster.</p>
            </article>
            <article className="card">
              <CardIcon name="layers" />
              <h3>Sensing that corroborates itself</h3>
              <p className="muted">Radar, camera, heat, and radio fusion — from calibration to applied science.</p>
            </article>
            <article className="card">
              <CardIcon name="analytics" />
              <h3>Software that decides</h3>
              <p className="muted">AI, satellite-data pipelines, and secure platforms that turn observations into decisions.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Candidate profile</span>
            <h2>Scientific rigour and systems-level reasoning.</h2>
          </div>
          <div className="diagram-layout diagram-layout--wide">
            <figure className="diagram-frame">
              <CandidateProfileDiagram />
            </figure>
            <div className="grid card-list">
              <article className="card">
                <CardIcon name="optical" />
                <h3>Evidence-based</h3>
                <p className="muted">You form hypotheses, test them, and document uncertainty honestly.</p>
              </article>
              <article className="card">
                <CardIcon name="integration" />
                <h3>Interdisciplinary</h3>
                <p className="muted">You connect spacecraft, sensing physics, data systems, and customer goals.</p>
              </article>
              <article className="card">
                <CardIcon name="orbit" />
                <h3>Mission-oriented</h3>
                <p className="muted">You translate engineering work into measurable operational value.</p>
              </article>
              <article className="card">
                <CardIcon name="shield" />
                <h3>Responsible</h3>
                <p className="muted">You apply security, safety, legal, and ethical rigour throughout development.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cta-panel">
            <span className="eyebrow">Expression of interest</span>
            <h2>Send a short profile, your evidence, and the discipline you want to contribute to.</h2>
            <p className="lead muted">Email applications and research-collaboration proposals to careers@r4space.com. Include a curriculum vitae, portfolio or publication links, location, availability, and preferred engagement type.</p>
            <div className="actions">
              <a className="btn btn-primary" href="mailto:careers@r4space.com?subject=Career%20Expression%20of%20Interest">Email careers</a>
              <a className="btn btn-ghost" href="company">Meet the company</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
