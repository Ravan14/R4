/* The shared footer. Tagline and links rewritten in plain language
 * (CONTENT-REPORT.md); the removed Technology anchors are gone with it. */

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand" href="./">
              <img src="logo.webp" alt="R4 logo" width="44" height="44" loading="lazy" decoding="async" />
              <span className="brand-copy">
                <strong>ℝ<sup>4</sup> Aerospace &amp; Defence</strong>
                <small>Resilient · Responsive · Real-time · Reconnaissance</small>
              </span>
            </a>
            <p>Same-moment, all-weather Earth intelligence for sovereign, civil, environmental, and commercial decision-makers.</p>
          </div>
          <div>
            <h3 className="footer-title">Technology</h3>
            <div className="footer-links">
              <a href="technology#insight-set">The system</a>
              <a href="technology#compare">Why same-moment matters</a>
              <a href="technology#analytics">From data to decisions</a>
              <a href="investors">Investor overview</a>
            </div>
          </div>
          <div>
            <h3 className="footer-title">Applications</h3>
            <div className="footer-links">
              <a href="defence">Defence &amp; Security</a>
              <a href="civil">Civil &amp; Commercial</a>
              <a href="applications">Application overview</a>
              <a href="applications#delivery">What you receive</a>
            </div>
          </div>
          <div>
            <h3 className="footer-title">Company</h3>
            <div className="footer-links">
              <a href="company">Mission and team</a>
              <a href="careers">Careers</a>
              <a href="investors">Investors</a>
              <a href="contact">Contact</a>
            </div>
            <div className="socials">
              <a href="https://www.linkedin.com/company/r4-aerospace-and-defence/" target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM2.5 9.5h5V21h-5zM9.5 9.5h4.8v1.6h.07a5.3 5.3 0 014.77-2.6c5.1 0 6.03 3.35 6.03 7.7V21h-5v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.71V21h-5z" />
                </svg>
              </a>
              <a href="mailto:info@r4space.com" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
                  <path d="M3 6l9 7 9-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ℝ4 Aerospace &amp; Defence Private Limited. All rights reserved.</span>
          <span>Built in India <svg className="india-flag" role="img" aria-label="India flag" width="20" height="15" viewBox="0 0 20 15">
            <path fill="#FF9933" d="M0 0h20v5H0z" />
            <path fill="#FFFFFF" d="M0 5h20v5H0z" />
            <path fill="#138808" d="M0 10h20v5H0z" />
            <circle cx="10" cy="7.5" r="1.65" fill="none" stroke="#000080" strokeWidth="0.45" />
            <circle cx="10" cy="7.5" r="0.3" fill="#000080" />
          </svg> for global operations.</span>
        </div>
      </div>
    </footer>
  );
}
