import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="h-8 border-b-2 border-slate-200  md:text-lg flex items-center px-4">
      <nav className="flex justify-between items-center w-screen">
        <Link
          to="/"
          className="text-darkgold font-semibold flex justify-center items-center gap-2"
        >
          <FaHome />
          Accueil
        </Link>
        <div>
          <Link to="/login" className="hover:text-darkgold mr-5 transition">
            Se connecter
          </Link>
          <Link to="/signup" className="hover:text-darkgold  transition">
            S&apos;inscrire
          </Link>
        </div>
      </nav>
    </header>
  );
}
export default Header;
