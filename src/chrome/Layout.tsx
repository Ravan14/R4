import type { ReactNode } from 'react';
import { PAGES, type PageKey } from '../site.ts';
import BackToTop from './BackToTop.tsx';
import Footer from './Footer.tsx';
import Header from './Header.tsx';
import SkipLink from './skipLink.tsx';

/* One place that assembles the chrome. Before this migration the header and
 * footer were pasted into eight files, which is why the last restyle needed
 * roughly 210 edits where 25 would have done. */
export default function Layout({
  page,
  mainClass,
  hero,
  children,
}: {
  page: PageKey;
  mainClass?: string;
  hero?: ReactNode;
  children: ReactNode;
}) {
  const main = (
    <main id="main" className={mainClass || undefined}>
      {children}
    </main>
  );

  // 404.html has never carried the site chrome; it is a standalone document.
  // Its <main> is itself the page hero, so only the chrome is absent.
  if (!PAGES[page].hasChrome) {
    return (
      <>
        {main}
        <BackToTop />
      </>
    );
  }

  /* Document order matters here: the page hero sat between </header> and
   * <main> in the hand-written pages, and it stays outside <main> so the
   * landmark still begins where it always did. */
  return (
    <>
      <SkipLink />
      <Header active={page} />
      {hero}
      {main}
      <Footer />
      <BackToTop />
    </>
  );
}
