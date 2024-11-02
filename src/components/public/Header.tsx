import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="md:text-lg flex items-center justify-center pt-6 h-10 min-h-14">
      <nav className=" flex items-center rounded-2xl bg-gold lg:w-headerLg md:w-headerMd  ">
        <Link to="/" className="  pl-4  flex-1 ">
          <p className="text-black font-semibold  flex justify-center text-center items-center gap-2   rounded-l-full transition link-underline py-2  ">
            <FaHome />
            Accueil
          </p>
        </Link>

        <Link
          to="/login"
          className="link-underline transition flex-1 min-w-36 text-center py-2"
        >
          Se connecter
        </Link>

        <Link
          to="/signup"
          className=" pr-4 flex-1 rounded-r-full text-center transition"
        >
          <p className="link-underline py-2">S&apos;inscrire</p>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
