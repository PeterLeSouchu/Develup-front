import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="p-5 md:p-0  bg-slate-300">
      <div className="flex justify-evenly gap-3 items-center min-h-8 backdrop-blur-mini text-center flex-col md:flex-row text-sm md:text-base">
        <p>Copyright © {currentYear} - Develup - Tous droits réservés</p>
        <Link to="*" className="underline underline-offset-3">
          Contact
        </Link>
        <Link to="/legal-notices" className="underline underline-offset-3">
          Mentions légales
        </Link>
      </div>
    </footer>
  );
}
export default Footer;
