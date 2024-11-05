import { Link } from 'react-router-dom';
import { GrProjects } from 'react-icons/gr';
import { FaRegMessage } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { IoIosSearch } from 'react-icons/io';
import { CiLogout, CiFileOn } from 'react-icons/ci';
import { IoShieldOutline, IoSunny } from 'react-icons/io5';
import { FaMoon } from 'react-icons/fa';
import logo from '../../assets/images/logo-black.png';
import { useUserStore } from '../../store';

function Header() {
  const { darkTheme, setDarkTheme } = useUserStore();
  return (
    <header className="h-screen min-w-56  pt-2 bg-gradient-to-b from-lightgold2 to-lightgold flex flex-col">
      <img src={logo} alt="logo Develup" className="w-40 pl-2 " />
      <nav className="flex flex-col flex-grow">
        <Link
          to="/dashboard/search"
          className="py-5 pt-7 text-xl pl-4 hover:bg-black transition hover:bg-opacity-20 flex items-center "
        >
          <IoIosSearch className="mr-2" />
          Recherche
        </Link>
        <Link
          to="/dashboard/search"
          className="text-xl py-5 pl-4 hover:bg-black transition hover:bg-opacity-20 flex items-center"
        >
          <GrProjects className="mr-2" />
          Projets
        </Link>
        <Link
          to="/dashboard/search"
          className="text-xl py-5 pl-4 hover:bg-black transition hover:bg-opacity-20 flex items-center"
        >
          <FaRegMessage className="mr-2" />
          Message
        </Link>
        <Link
          to="/dashboard/search"
          className="text-xl py-5 pl-4 hover:bg-black transition hover:bg-opacity-20 flex items-center"
        >
          <CgProfile className="mr-2" />
          Profil
        </Link>
        <div className="flex-grow flex flex-col justify-end">
          <span className="pl-3 py-3 ">
            <button
              className={`toggle-btn py-3 pl-4 ${darkTheme ? 'toggled' : ''}`}
              onClick={() => setDarkTheme(!darkTheme)}
              type="button"
              aria-label="theme button"
            >
              {/* <div className="thumb">
                {darkTheme ? <FaMoon /> : <IoSunny />}
              </div> */}
              <div className="thumb">
                <FaMoon />
              </div>
            </button>
          </span>
          <Link
            to="/dashboard/search"
            className="text-sm py-3 pl-4 w-full hover:bg-black transition hover:bg-opacity-20 flex items-center"
          >
            <IoShieldOutline className="mr-2" />
            CGU
          </Link>
          <Link
            to="/dashboard/search"
            className="text-sm py-3 pl-4 w-full hover:bg-black transition hover:bg-opacity-20 flex items-center"
          >
            <CiFileOn className="mr-2" />
            Mentions légales
          </Link>
          <Link
            to="/dashboard/search"
            className="text-sm py-3 pl-4 w-full hover:bg-black transition hover:bg-opacity-20 flex items-center"
          >
            <CiLogout className="mr-2" />
            Se déconnecter
          </Link>
        </div>
      </nav>
    </header>
  );
}
export default Header;
