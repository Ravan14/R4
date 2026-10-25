/* Maps a page key to its component. This is the whole router: nine documents,
 * no client-side route changes, because the site is nine files on Pages. */

import type { PageKey } from './site.ts';
import Home from './pages/Home.tsx';
import Technology from './pages/Technology.tsx';
import Applications from './pages/Applications.tsx';
import Defence from './pages/Defence.tsx';
import Civil from './pages/Civil.tsx';
import Company from './pages/Company.tsx';
import Investors from './pages/Investors.tsx';
import Careers from './pages/Careers.tsx';
import Contact from './pages/Contact.tsx';
import NotFound from './pages/NotFound.tsx';

import './styles.css';

const COMPONENTS: Record<PageKey, () => React.JSX.Element> = {
  home: Home,
  technology: Technology,
  applications: Applications,
  defence: Defence,
  civil: Civil,
  company: Company,
  investors: Investors,
  careers: Careers,
  contact: Contact,
  'not-found': NotFound,
};

export default function App({ page }: { page: PageKey }) {
  const Page = COMPONENTS[page] ?? NotFound;
  return <Page />;
}
