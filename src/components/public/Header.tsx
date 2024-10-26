import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="md:text-lg flex items-center justify-center pt-6 h-10 ">
      <nav className="flex items-center  rounded-full bg-gold lg:w-headerLg md:w-headerMd  ">
        <Link
          to="/"
          className="text-black font-semibold flex-1 flex justify-center text-center items-center gap-2 py-2 hover:bg-darkgold pl-4 rounded-l-full transition"
        >
          <FaHome />
          Accueil
        </Link>

        <Link
          to="/login"
          className=" hover:bg-darkgold transition flex-1   min-w-36 text-center py-2"
        >
          Se connecter
        </Link>
        <Link
          to="/signup"
          className="hover:bg-darkgold py-2 pr-4 flex-1 rounded-r-full text-center   transition"
        >
          S&apos;inscrire
        </Link>
      </nav>
    </header>
  );
}
export default Header;
