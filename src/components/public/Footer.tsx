import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex justify-evenly  gap-3 items-center md:h-8 p-5 backdrop-blur-mini text-center flex-col lg:flex-row text-sm lg:text-base">
      <p>Copyright © {currentYear} - Develup - Tous droits réservés</p>
      <Link to="*" className="underline underline-offset-3">
        Contact
      </Link>
      <Link to="/legal-notices" className="underline underline-offset-3">
        Mentions légales
      </Link>
    </footer>
  );
}
export default Footer;
