import type { PageKey } from '../site.ts';
import Icon, { type IconName } from '../widgets/Icon.tsx';

/* GENERATED from the header that was copy-pasted into eight files, then wired
 * up. There is now one header in the codebase. Nav labels, hrefs and the brand
 * lockup are the published strings, moved verbatim.
 *
 * This is static markup. src/client.ts enhances the menu and dropdown after
 * registering their behavior; without it, every navigation destination remains
 * available and the mobile panel stays expanded. */

const HEAD_LINKS: { href: string; label: string; page: PageKey; icon: IconName }[] = [
  { href: './', label: 'Home', page: 'home', icon: 'home' },
  { href: 'technology', label: 'Technology', page: 'technology', icon: 'technology' },
];

const DROPDOWN_LINKS: { href: string; title: string; note: string; icon: IconName }[] = [
  {
    href: 'applications',
    title: 'Application overview',
    note: 'One system, many missions',
    icon: 'applications',
  },
  {
    href: 'defence',
    title: 'Defence & Security',
    note: 'Sovereign monitoring and operational awareness',
    icon: 'defence',
  },
  {
    href: 'civil',
    title: 'Civil & Commercial',
    note: 'Disaster, climate, infrastructure and industry',
    icon: 'civil',
  },
];

const TAIL_LINKS: { href: string; label: string; page: PageKey; icon: IconName; cta?: boolean }[] =
  [
    { href: 'company', label: 'Company', page: 'company', icon: 'company' },
    { href: 'investors', label: 'Investors', page: 'investors', icon: 'analytics' },
    { href: 'careers', label: 'Careers', page: 'careers', icon: 'careers' },
    { href: 'contact', label: 'Contact', page: 'contact', icon: 'contact', cta: true },
  ];

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Header({ active }: { active: PageKey }) {
  const applicationsActive = ['applications', 'defence', 'civil'].includes(active);
  const navClass = (page: PageKey, cta?: boolean) =>
    [page === active ? 'active' : '', cta ? 'nav-cta' : '']
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <header className="site-header" data-site-header>
      <div className="container navbar">
        <a className="brand" href="./" aria-label="R4 Aerospace and Defence home">
          <img className="brand-mark" src="logo.webp" alt="R4 Aerospace and Defence logo" width="44" height="44" decoding="async" />
          <span className="brand-copy">
            <strong>ℝ<sup>4</sup> Aerospace &amp; Defence</strong>
            <small>Integrated Earth Intelligence</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Open navigation"
          aria-expanded="false"
          aria-controls="primary-navigation"
          data-menu-toggle
        >
          <svg className="icon-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          <svg className="icon-close" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
        <nav
          id="primary-navigation"
          className="nav-links"
          aria-label="Primary navigation"
          data-nav-links
        >
          {HEAD_LINKS.map((item) => (
            <a
              key={item.href}
              className={navClass(item.page)}
              href={item.href}
            >
              <Icon name={item.icon} className="nav-icon" />
              <span>{item.label}</span>
            </a>
          ))}
          <div
            className="nav-dropdown"
            data-dropdown
          >
            <button
              type="button"
              className={applicationsActive ? 'active' : undefined}
              aria-expanded="false"
              aria-controls="application-menu"
              data-dropdown-toggle
            >
              <Icon name="applications" className="nav-icon" />
              <span>Applications</span>
              <Chevron />
            </button>
            <div className="dropdown-menu" id="application-menu">
              {DROPDOWN_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                >
                  <Icon name={item.icon} className="dropdown-icon" />
                  <span>
                    <strong>{item.title}</strong>
                    <span>{item.note}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          {TAIL_LINKS.map((item) => (
            <a
              key={item.href}
              className={navClass(item.page, item.cta)}
              href={item.href}
            >
              <Icon name={item.icon} className="nav-icon" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="reading-progress" aria-hidden="true" />
    </header>
  );
}
