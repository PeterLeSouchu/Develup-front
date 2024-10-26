import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className=" min-h-10">
      <div className="flex justify-evenly gap-3 items-center min-h-8  text-center flex-col md:flex-row text-sm md:text-base">
        <p>Copyright © {currentYear} - Develup - Tous droits réservés</p>
        <Link to="/contact" className="underline underline-offset-3">
          Contactez-nous
        </Link>
        <Link to="/legal-notices" className="underline underline-offset-3">
          Mentions légales
        </Link>
      </div>
    </footer>
  );
}
export default Footer;
