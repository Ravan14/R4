/* The arrow-up glyph used to be a Font Awesome <i>; it is inline SVG now so
 * the site does not load an icon font for eight real uses. */
export default function BackToTop() {
  return (
    <a
      className="back-to-top"
      href="#"
      aria-label="Back to top"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </a>
  );
}
