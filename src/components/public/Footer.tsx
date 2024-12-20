import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="  min-h-14 md:h-10 md:py-0 py-8">
      <div className="flex justify-evenly gap-3 items-center min-h-8  text-center flex-col md:flex-row text-sm md:text-base">
        <Link
          to="mailto:develup33@gmail.com"
          className="underline hover:text-darkgold underline-offset-3"
        >
          Contactez-nous : develup33@gmail.com
        </Link>
        <Link
          to="/legal-notices"
          className="underline hover:text-darkgold underline-offset-3 "
        >
          Mentions légales
        </Link>
        <Link
          to="/general-conditions-of-use"
          className="underline hover:text-darkgold underline-offset-3 "
        >
          Conditions générales d&apos;utilisation
        </Link>
      </div>
    </footer>
  );
}
export default Footer;
