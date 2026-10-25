export type HeroVariant = 'technology' | 'applications' | 'defence' | 'civil' | 'company' | 'investors' | 'careers' | 'contact' | 'not-found';

/* Shared LCP media: the spacecraft alone, with nothing drawn behind it. It is
 * cut out of its background and fitted into a grid-aligned box, so variants
 * change its attitude, not the request. */
export default function HeroMedia({ variant = 'not-found' }: { variant?: HeroVariant }) {
  return (
    <div className={`page-hero-visual page-hero-visual--${variant}`} aria-hidden="true">
      <img
        className="page-hero-media"
        src="sar-sat.webp"
        alt=""
        width="1011"
        height="890"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
