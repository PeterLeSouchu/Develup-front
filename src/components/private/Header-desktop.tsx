import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { GrProjects } from 'react-icons/gr';
import { FaRegMessage } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { IoIosSearch } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { FaMoon, FaRegFile, FaShieldAlt } from 'react-icons/fa';
import logo from '../../assets/images/logo-black.png';
import { useSettingsStore, useUserStore } from '../../store';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';

function HeaderDesktop() {
  const { darkTheme, setDarkTheme, setLogged } = useUserStore();
  const navigate = useNavigate();
  const { setGlobalErrorMessage } = useSettingsStore();

  async function handleLogout() {
    try {
      await axiosWithoutCSRFtoken.post('/logout');
      setLogged(false);
      setDarkTheme(false);
      localStorage.removeItem('csrfToken');
      localStorage.removeItem('user-storage');
      return navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        return setGlobalErrorMessage(message);
      }
      return setGlobalErrorMessage(
        'Erreur innatendu, essayez de vous reconnecter'
      );
    }
  }
  return (
    <header className=" min-w-56 flex  p-3  ">
      <div className="rounded-2xl flex-grow overflow-scroll bg-gradient-to-b  from-lightgold2 to-lightgold flex flex-col  dark:from-darkgold2 dark:to-darkgold">
        <img src={logo} alt="logo Develup" className="w-40 pl-2 pt-2 " />
        <nav className="flex flex-col flex-grow">
          <NavLink
            to="/dashboard/search"
            className={({ isActive }) =>
              `relative font-extrabold py-5 mt-7 text-xl pl-4 hover:bg-black transition hover:bg-opacity-20 flex  items-center ${
                isActive
                  ? 'after:content-[""] after:absolute after:right-0 after:rounded-full after:top-1/2 after:transform after:-translate-y-1/2 after:h-2/3 after:border-r-4 after:border-darkgold dark:after:border-gold'
                  : ''
              }`
            }
          >
            <IoIosSearch className="mr-2" />
            Recherche
          </NavLink>
          <NavLink
            to="/dashboard/my-projects"
            className={({ isActive }) =>
              `relative font-extrabold py-5  text-xl pl-4 hover:bg-black transition hover:bg-opacity-20 flex items-center ${
                isActive
                  ? 'after:content-[""] after:absolute after:right-0 after:rounded-full after:top-1/2 after:transform after:-translate-y-1/2 after:h-2/3 after:border-r-4 after:border-darkgold dark:after:border-gold'
                  : ''
              }`
            }
          >
            <GrProjects className="mr-2" />
            Vos projets
          </NavLink>
          <NavLink
            to="/dashboard/conversation"
            className={({ isActive }) =>
              `relative font-extrabold py-5  text-xl pl-4 hover:bg-black transition hover:bg-opacity-20 flex items-center ${
                isActive
                  ? 'after:content-[""] after:absolute after:right-0 after:rounded-full after:top-1/2 after:transform after:-translate-y-1/2 after:h-2/3 after:border-r-4 after:border-darkgold dark:after:border-gold'
                  : ''
              }`
            }
          >
            <FaRegMessage className="mr-2" />
            Message
          </NavLink>
          <NavLink
            to="/dashboard/my-profile"
            className={({ isActive }) =>
              `relative font-extrabold py-5 text-xl pl-4 hover:bg-black transition hover:bg-opacity-20 flex items-center ${
                isActive
                  ? 'after:content-[""] after:absolute after:right-0 after:rounded-full after:top-1/2 after:transform after:-translate-y-1/2 after:h-2/3 after:border-r-4 after:border-darkgold dark:after:border-gold'
                  : ''
              }`
            }
          >
            <CgProfile className="mr-2" />
            Profil
          </NavLink>
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
            <NavLink
              to="/dashboard/general-conditions-of-use"
              className={({ isActive }) =>
                `relative underline underline-offset-2 text-sm py-3 pl-4 w-full hover:bg-black transition hover:bg-opacity-20 flex items-center ${
                  isActive
                    ? 'after:content-[""] after:absolute after:right-0 after:rounded-full after:top-1/2 after:transform after:-translate-y-1/2 after:h-2/3 after:border-r-4 after:border-darkgold dark:after:border-gold'
                    : ''
                }`
              }
            >
              <FaShieldAlt className="mr-2" />
              CGU
            </NavLink>
            <NavLink
              to="/dashboard/legal-notices"
              className={({ isActive }) =>
                `relative underline underline-offset-2 text-sm py-3 pl-4 w-full hover:bg-black transition hover:bg-opacity-20 flex items-center ${
                  isActive
                    ? 'after:content-[""] after:absolute after:right-0 after:rounded-full after:top-1/2 after:transform after:-translate-y-1/2 after:h-2/3 after:border-r-4 after:border-darkgold dark:after:border-gold'
                    : ''
                }`
              }
            >
              <FaRegFile className="mr-2" />
              Mentions légales
            </NavLink>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm py-3 pl-4 w-full hover:bg-black transition hover:bg-opacity-20 flex items-center font-extrabold"
            >
              <BiLogOut className="mr-2 " />
              Se déconnecter
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
export default HeaderDesktop;
