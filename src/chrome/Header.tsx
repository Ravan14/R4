import { useCallback, useState } from 'react';
import { useClickOutside } from '../hooks.ts';
import type { PageKey } from '../site.ts';

/* GENERATED from the header that was copy-pasted into eight files, then wired
 * up. There is now one header in the codebase. Nav labels, hrefs and the brand
 * lockup are the published strings, moved verbatim.
 *
 * The behaviour used to live in main.js: a [data-page-link] scan to mark the
 * current page, a class toggle for the mobile menu, a class toggle plus a
 * document click handler for the dropdown, and a link-click handler that
 * closed the menu. All four are component state now, so data-page-link is gone. */

const HEAD_LINKS: { href: string; label: string; page: PageKey }[] = [
  { href: 'index.html', label: 'Home', page: 'home' },
  { href: 'technology.html', label: 'Technology', page: 'technology' },
];

const DROPDOWN_LINKS: { href: string; title: string; note: string }[] = [
  {
    href: 'applications.html',
    title: 'Application Portfolio',
    note: 'Integrated dual-use intelligence domains',
  },
  {
    href: 'defence.html',
    title: 'Defence & Security',
    note: 'Sovereign monitoring and operational awareness',
  },
  {
    href: 'civil.html',
    title: 'Civil & Commercial',
    note: 'Disaster, climate, infrastructure and industry',
  },
];

const TAIL_LINKS: { href: string; label: string; page: PageKey; cta?: boolean }[] =
  [
    { href: 'company.html', label: 'Company', page: 'company' },
    { href: 'careers.html', label: 'Careers', page: 'careers' },
    { href: 'contact.html', label: 'Contact', page: 'contact', cta: true },
  ];

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Header({ active }: { active: PageKey }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const closeDrop = useCallback(() => setDropOpen(false), []);
  const setDropRef = useClickOutside<HTMLDivElement>(closeDrop, dropOpen);

  const navClass = (page: PageKey, cta?: boolean) =>
    [page === active ? 'active' : '', cta ? 'nav-cta' : '']
      .filter(Boolean)
      .join(' ') || undefined;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container navbar">
        <a className="brand" href="index.html" aria-label="R4 Aerospace and Defence home">
          <img className="brand-mark" src="logo.webp" alt="R4 Aerospace and Defence logo" width="44" height="44" decoding="async" />
          <span className="brand-copy">
            <strong>ℝ<sup>4</sup> Aerospace &amp; Defence</strong>
            <small>Integrated Earth Intelligence</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg className="icon-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          <svg className="icon-close" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
        <nav
          className={menuOpen ? 'nav-links open' : 'nav-links'}
          aria-label="Primary navigation"
        >
          {HEAD_LINKS.map((item) => (
            <a
              key={item.href}
              className={navClass(item.page)}
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <div
            className={dropOpen ? 'nav-dropdown open' : 'nav-dropdown'}
            ref={setDropRef}
          >
            <button type="button" aria-expanded={dropOpen} onClick={() => setDropOpen((v) => !v)}>
              Applications <Chevron />
            </button>
            <div className="dropdown-menu">
              {DROPDOWN_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    closeMenu();
                    setDropOpen(false);
                  }}
                >
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
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
