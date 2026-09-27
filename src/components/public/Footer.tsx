import { Link } from 'react-router-dom';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="border-t border-line bg-white2">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Logo to="/" />
          <p className="text-sm text-muted">
            Des projets web, à plusieurs, à votre rythme.
          </p>
        </div>
        <ul className="flex flex-col gap-3 text-sm text-ink md:flex-row md:gap-8">
          <li>
            <Link
              to="mailto:develup33@gmail.com"
              className="hover:text-pollen-deep hover:underline underline-offset-4"
            >
              develup33@gmail.com
            </Link>
          </li>
          <li>
            <Link
              to="/legal-notices"
              className="hover:text-pollen-deep hover:underline underline-offset-4"
            >
              Mentions légales
            </Link>
          </li>
          <li>
            <Link
              to="/general-conditions-of-use"
              className="hover:text-pollen-deep hover:underline underline-offset-4"
            >
              Conditions générales d&apos;utilisation
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
