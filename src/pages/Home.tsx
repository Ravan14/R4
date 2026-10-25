/*
 * Published copy, rewritten in plain language (CONTENT-REPORT.md).
 * Structure preserved where the section rhythm worked; every sentence
 * rewritten so the first screen is understandable by anyone.
 */

import Layout from '../chrome/Layout.tsx';
import Icon, { CardIcon } from '../widgets/Icon.tsx';
import MissionStage from '../widgets/MissionStage.tsx';

export default function Home() {
  return (
    <Layout page="home">
      <section className="home-hero">
        <img className="hero-poster" src="optical-sat.webp" alt="Satellite Earth observation mission visualisation" width="907" height="775" fetchPriority="high" decoding="async" />
        <div className="container">
          <div className="hero-content">
            <span className="eyebrow">Earth intelligence for defence and civil missions</span>
            <h1>One picture of the Earth. <span className="text-gradient">Same moment. Any weather. Any hour.</span></h1>
            <p className="lead">R4 flies a small formation of satellites that look at the same place with four kinds of sensors at the same time — radar, camera, heat, and radio — so decision-makers get one complete, trustworthy picture, in minutes rather than days.</p>
            <div className="actions">
              <a className="btn btn-primary" href="technology">See how it works</a>
              <a className="btn btn-ghost" href="applications">See what it can do</a>
            </div>
            <div className="hero-data-strip">
              <div className="hero-data">
                <Icon name="layers" />
                <strong>4 Sensors</strong>
                <span>Radar · Camera · Heat · Radio</span>
              </div>
              <div className="hero-data">
                <Icon name="orbit" />
                <strong>3 Satellites</strong>
                <span>One coordinated formation</span>
              </div>
              <div className="hero-data">
                <Icon name="integration" />
                <strong>1 Picture</strong>
                <span>Same place, same moment</span>
              </div>
            </div>
          </div>
        </div>
        <span className="hero-scroll">Scroll to see the system</span>
      </section>
      <section className="section mission-story-section">
        <div className="container mission-story">
          <div className="mission-stage-wrap">
            <MissionStage />
          </div>
          <div className="mission-story-steps">
            <article className="mission-story-step">
              <span className="eyebrow">The problem</span>
              <h2>Satellites look at the world one sensor at a time.</h2>
              <p className="muted">Most satellites carry one kind of sensor. A camera cannot see at night or through clouds. Radar sees through weather but cannot identify what it sees. A heat sensor cannot read a ship's name. So operators wait for several satellites, several passes, and hours — sometimes days — to put the picture together.</p>
              <div className="media-frame">
                <img src="BG2.webp" alt="Earth observation problem visualisation" width="1400" height="933" loading="lazy" decoding="async" />
              </div>
            </article>
            <article className="mission-story-step">
              <span className="card-tag">The answer</span>
              <h2>Four sensors look at the same place at the same time.</h2>
              <p className="muted">R4's Insight Set — one microsatellite and two CubeSats flying together — collects radar, camera, heat, and radio observations in a single pass. Each sensor sees what the others cannot, and every observation is stamped to the same moment.</p>
              <ul className="feature-list">
                <li><span>Every observation is aligned to the same place and time.</span></li>
                <li><span>Sees day and night, in clear sky and through clouds.</span></li>
                <li><span>Onboard computing turns observations into answers before they reach the ground.</span></li>
                <li><span>Outputs drop into the maps and command systems you already use.</span></li>
              </ul>
            </article>
            <article className="mission-story-step">
              <span className="eyebrow">The system</span>
              <h2>Three satellites. One analytical platform.</h2>
              <p className="muted">The spacecraft and the ground software are designed as one continuous chain — from sensor to decision.</p>
              <div className="mission-architecture">
                <article className="card">
                  <CardIcon name="satellite" />
                  <span className="card-tag">In space</span>
                  <h3>Insight Set™</h3>
                  <p className="muted">One microsatellite and two CubeSats that fly in formation and share the sensing workload.</p>
                  <a className="link-arrow" href="technology#insight-set">See the system <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
                </article>
                <article className="card">
                  <CardIcon name="analytics" />
                  <span className="card-tag">On the ground</span>
                  <h3>ℝ Analytics Platform</h3>
                  <p className="muted">Software that matches every observation to the same place and time, spots what changed, and flags what matters.</p>
                  <a className="link-arrow" href="technology#analytics">See how decisions are made <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
                </article>
                <article className="card">
                  <CardIcon name="integration" />
                  <span className="card-tag">With you</span>
                  <h3>Operational Integration</h3>
                  <p className="muted">Alerts, maps, dashboards, and APIs that fit the systems your team already uses.</p>
                  <a className="link-arrow" href="applications#delivery">See what you receive <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
                </article>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Who it serves</span>
            <h2>One system. Two missions.</h2>
            <p className="muted">The same satellites watch over national security and public safety alike.</p>
          </div>
          <div className="grid grid-2 portfolio-split">
            <article className="card">
              <CardIcon name="shield" />
              <span className="card-tag">Defence &amp; security</span>
              <h3>Protect what matters, day and night.</h3>
              <p className="muted">Track dark vessels that switch off their radios, watch borders and strategic sites, and verify activity without waiting for the next cloud-free day.</p>
              <div className="pill-row">
                <span className="pill">Dark-vessel detection</span>
                <span className="pill">All-weather watch</span>
                <span className="pill">Change alerts</span>
              </div>
              <p className="card-action">
                <a className="link-arrow" href="defence">Explore defence applications <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
              </p>
            </article>
            <article className="card">
              <CardIcon name="globe" />
              <span className="card-tag">Civil &amp; commercial</span>
              <h3>See the disaster, the change, the risk.</h3>
              <p className="muted">Map floods and fires within hours, watch crops and water, monitor infrastructure, and give insurers hard evidence.</p>
              <div className="pill-row">
                <span className="pill">Rapid damage maps</span>
                <span className="pill">Crop and water health</span>
                <span className="pill">Asset monitoring</span>
              </div>
              <p className="card-action">
                <a className="link-arrow" href="civil">Explore civil applications <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <div className="kpi-band">
            <div className="kpi">
              <Icon name="satellite" />
              <strong>3</strong>
              <span>Satellites flying together</span>
            </div>
            <div className="kpi">
              <Icon name="layers" />
              <strong>4</strong>
              <span>Sensing methods in one pass</span>
            </div>
            <div className="kpi">
              <Icon name="sync" />
              <strong>1</strong>
              <span>Complete, same-moment picture</span>
            </div>
            <div className="kpi">
              <Icon name="clock" />
              <strong>24/7</strong>
              <span>Day and night, clear or cloudy</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cta-panel">
            <span className="eyebrow">Work with R4</span>
            <h2>Tell us what you need to see. We'll show you how to see it.</h2>
            <p className="lead muted">R4 works with institutions on mission studies, pilot programmes, data integration, and strategic partnerships.</p>
            <div className="actions">
              <a className="btn btn-primary" href="contact">Start a conversation</a>
              <a className="btn btn-ghost" href="company">Meet the company</a>
            </div>
            <p className="muted trust-note">Founded and led by Dr. Kathiravan Thanagvel, R4 is building its first satellite formation. <a className="link-arrow" href="investors">Investor overview <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a></p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
