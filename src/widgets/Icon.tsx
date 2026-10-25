import type { ReactNode } from 'react';

/* A small, site-owned icon language: orbital paths, collection geometry and
 * correlation nodes. Every glyph shares the same 24px grid and 1.35px stroke. */
export type IconName =
  | 'home' | 'technology' | 'applications' | 'defence' | 'civil'
  | 'company' | 'careers' | 'contact' | 'orbit' | 'satellite'
  | 'layers' | 'sync' | 'clock' | 'analytics' | 'integration'
  | 'optical' | 'radar' | 'thermal' | 'signal' | 'shield' | 'globe'
  | 'compass' | 'infrastructure' | 'leaf' | 'wave' | 'chip' | 'link'
  | 'people' | 'mail' | 'phone' | 'pin' | 'search';

const glyphs: Record<IconName, ReactNode> = {
  home: <><circle cx="12" cy="12" r="3" /><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-28 12 12)" /><circle cx="20" cy="7" r="1" fill="currentColor" stroke="none" /></>,
  technology: <><rect x="9" y="9" width="6" height="6" /><path d="M3 7h4v10H3zM17 7h4v10h-4zM7 12h2M15 12h2M12 3v6M10 3h4" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  applications: <><rect x="3" y="3" width="6" height="6" /><rect x="15" y="3" width="6" height="6" /><rect x="9" y="15" width="6" height="6" /><path d="M6 9v3h12V9M12 12v3" /></>,
  defence: <><path d="M12 2.5 20 6v5.5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6z" /><path d="M8 12h8M12 8v8" /><circle cx="12" cy="12" r="2.5" /></>,
  civil: <><circle cx="12" cy="12" r="9" /><path d="M3.5 10h17M5 16h14M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" /><path d="m4 18 16-12" /></>,
  company: <><path d="M4 21V7l8-4 8 4v14M8 21v-4h8v4M8 8h1M12 8h1M16 8h1M8 12h1M12 12h1M16 12h1M2 21h20" /></>,
  careers: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 14a5 5 0 0 1 6 4.9V20" /></>,
  contact: <><path d="M4 18a11 11 0 0 1 16 0M7 15a7 7 0 0 1 10 0M10 12a3 3 0 0 1 4 0" /><circle cx="12" cy="20" r="1.5" fill="currentColor" stroke="none" /><path d="M12 3v5" /></>,
  orbit: <><circle cx="12" cy="12" r="2.5" /><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-28 12 12)" /><path d="M5 5.5 3.5 4M19 18.5l1.5 1.5" /><circle cx="20" cy="7" r="1" fill="currentColor" stroke="none" /></>,
  satellite: <><rect x="9" y="9" width="6" height="6" /><path d="M3 7h4v10H3zM17 7h4v10h-4zM7 12h2M15 12h2M12 3v6M10 3h4M12 15v4l3 2" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5" /><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" /></>,
  sync: <><path d="M4 8a8 8 0 0 1 13-3l3 3M20 3v4h-4M20 16a8 8 0 0 1-13 3l-3-3M4 21v-4h4" /><circle cx="12" cy="12" r="2" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 3v18M12 7v5l3 2" /><path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" fillOpacity=".12" /></>,
  analytics: <><path d="M3 3v18h18M7 16l4-5 4 2 5-7" /><circle cx="7" cy="16" r="1.3" fill="currentColor" stroke="none" /><circle cx="11" cy="11" r="1.3" fill="currentColor" stroke="none" /><circle cx="15" cy="13" r="1.3" fill="currentColor" stroke="none" /><circle cx="20" cy="6" r="1.3" fill="currentColor" stroke="none" /></>,
  integration: <><circle cx="12" cy="12" r="3" /><circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="12" cy="20" r="2" /><path d="m6.5 6.5 3 3M17.5 6.5l-3 3M12 15v3" /></>,
  optical: <><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  radar: <><path d="M4 18a9 9 0 0 1 14-11M7 18a6 6 0 0 1 9-8M10 18a3 3 0 0 1 4-4" /><path d="m3 21 9-9" /><circle cx="18" cy="17" r="1.3" fill="currentColor" stroke="none" /></>,
  thermal: <><path d="M6 3c-3 3 3 5 0 8s3 5 0 8M12 3c-3 3 3 5 0 8s3 5 0 8M18 3c-3 3 3 5 0 8s3 5 0 8M3 22h18" /></>,
  signal: <><path d="M5 19a10 10 0 0 1 14 0M8 16a6 6 0 0 1 8 0M11 13a2 2 0 0 1 2 0" /><circle cx="12" cy="21" r="1" fill="currentColor" stroke="none" /><path d="M12 3v5M9 5l3-3 3 3" /></>,
  shield: <><path d="M12 2.5 20 6v5.5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6z" /><ellipse cx="12" cy="11" rx="5" ry="2.2" transform="rotate(-25 12 11)" /><circle cx="12" cy="11" r="1.3" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3.5 10h17M5 16h14M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" /><path d="m4 18 16-12" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" /><path d="m15.5 8.5-2 5-5 2 2-5z" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  infrastructure: <><path d="M3 21h18M5 21V9h14v12M8 9V5h8v4M8 13h2M14 13h2M8 17h2M14 17h2" /><path d="m2 9 10-6 10 6" /></>,
  leaf: <><path d="M20 3C11 3 5 7 5 13c0 4 3 6 6 6 6 0 9-7 9-16Z" /><path d="M3 22 16 9M8 17l-1-5M11 14h5" /><path d="M17 3h3v3" /></>,
  wave: <><path d="M2 16c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 21c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2" /><path d="m5 12 3-7h8l3 7zM12 5V2" /><circle cx="12" cy="2" r="1" fill="currentColor" stroke="none" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" /><path d="M9 1v5M15 1v5M9 18v5M15 18v5M1 9h5M1 15h5M18 9h5M18 15h5" /><circle cx="12" cy="12" r="3" /><path d="m10 12 2-2 2 2-2 2z" /></>,
  link: <><circle cx="5" cy="12" r="3" /><circle cx="19" cy="5" r="3" /><circle cx="19" cy="19" r="3" /><path d="m7.5 10.5 9-4M7.5 13.5l9 4" /></>,
  people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 14a5 5 0 0 1 6 4.9V20" /></>,
  mail: <><rect x="2.5" y="4.5" width="19" height="15" /><path d="m3 6 9 7 9-7M3 19l6-6M21 19l-6-6" /></>,
  phone: <><path d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5C3 13.6 10.4 21 19.5 21a1.5 1.5 0 0 0 1.5-1.5V17l-5-1-1.5 2a15.5 15.5 0 0 1-8.5-8.5L8 8z" /><path d="M14 3a7 7 0 0 1 7 7M14 7a3 3 0 0 1 3 3" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /><path d="M12 1v2M12 17v2" /></>,
  search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6M10 6v8M6 10h8" /></>,
};

export default function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <svg
      className={`technical-icon ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {glyphs[name]}
    </svg>
  );
}

export function CardIcon({ name }: { name: IconName }) {
  return <span className="card-icon"><Icon name={name} /></span>;
}
