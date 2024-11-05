import axios from 'axios';
import { Link } from 'react-router-dom';
import { GrProjects } from 'react-icons/gr';
import { FaRegMessage } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { IoIosSearch } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { FaMoon, FaRegFile, FaShieldAlt } from 'react-icons/fa';
import logo from '../../assets/images/logo-black.png';
import { useUserStore } from '../../store';
import axiosWithCSRFtoken from '../../utils/request/axios-with-csrf-token';
import BackErrorNotification from '../errors/back-error-notification/Back-error-component';
import errorNotification from '../errors/back-error-notification/notification-function';

function Header() {
  const { darkTheme, setDarkTheme } = useUserStore();

  async function handleLogout() {
    try {
      await axiosWithCSRFtoken.post('/logout');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorAPImessage = error.response?.data?.message;
        console.log("lancement de la notification d'erreur");
        errorNotification(errorAPImessage);
      }
    }
  }
  return (
    <>
      <header className="h-screen min-w-56 flex  p-2  ">
        <div className="rounded-2xl flex-grow bg-gradient-to-b from-lightgold2 to-lightgold flex flex-col  dark:from-darkgold2 dark:to-darkgold">
          <img src={logo} alt="logo Develup" className="w-40 pl-2 pt-2 " />
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
                  <div className="thumb">
                    <FaMoon />
                  </div>
                </button>
              </span>
              <Link
                to="/dashboard/general-conditions-of-use"
                className="text-sm py-3 pl-4 w-full hover:bg-black transition hover:bg-opacity-20 flex items-center"
              >
                <FaShieldAlt className="mr-2" />
                CGU
              </Link>
              <Link
                to="/dashboard/legal-notices"
                className="text-sm py-3 pl-4 w-full hover:bg-black transition hover:bg-opacity-20 flex items-center"
              >
                <FaRegFile className="mr-2" />
                Mentions légales
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm py-3 pl-4 w-full hover:bg-black transition hover:bg-opacity-20 flex items-center"
              >
                <BiLogOut className="mr-2 font-bold" />
                Se déconnecter
              </button>
            </div>
          </nav>
        </div>
      </header>
      <BackErrorNotification />
    </>
  );
}
export default Header;
