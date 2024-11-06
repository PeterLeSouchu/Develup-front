import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import du composant Link
import { IoIosSearch } from 'react-icons/io';
import { GrProjects } from 'react-icons/gr';
import { FaMoon, FaRegMessage } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { IoMenu } from 'react-icons/io5';
import logo from '../../assets/images/logo-black.png';
import BackErrorNotification from '../all/errors/back-error-notification/Back-error-component';
import axiosWithCSRFtoken from '../../utils/request/axios-with-csrf-token';
import { useUserStore } from '../../store';
import errorNotification from '../all/errors/back-error-notification/notification-function';

function HeaderMobile() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const { darkTheme, setDarkTheme, setLogged } = useUserStore();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsNavbarOpen((state) => !state);
  };

  async function handleLogout() {
    try {
      await axiosWithCSRFtoken.post('/logout');
      setLogged(false);
      localStorage.removeItem('csrfToken');
      localStorage.removeItem('user-storage');
      setDarkTheme(false);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorAPImessage = error.response?.data?.message;
        errorNotification(errorAPImessage);
      }
    }
  }

  return (
    <>
      <header className="w-full fixed backdrop-blur-sm p-3">
        <div className="relative flex justify-center items-center h-14 rounded-2xl bg-gradient-to-b from-lightgold2 to-lightgold dark:from-darkgold2 dark:to-darkgold">
          <button
            type="button"
            className="absolute left-4 text-4xl"
            onClick={toggleNavbar}
          >
            <IoMenu />
          </button>
          <img src={logo} alt="logo Develup" className="w-28" />
        </div>
      </header>

      {/* Sidebar Navbar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-lightgold2 to-lightgold dark:from-darkgold2 dark:to-darkgold  transition-transform duration-300 ${
          isNavbarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-full shadow-lg z-50`}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-3xl"
          onClick={toggleNavbar}
        >
          <RxCross1 />
        </button>
        <nav className="p-4">
          <ul>
            <li className="py-2 flex justify-center items-center">
              <Link
                onClick={() => setIsNavbarOpen(false)}
                to="/dashboard/search"
                className="py-8 pt-7 text-3xl flex items-center "
              >
                <IoIosSearch className="mr-2" />
                Recherche
              </Link>
            </li>
            <li className="py-2 flex justify-center items-center">
              <Link
                onClick={() => setIsNavbarOpen(false)}
                to="/dashboard/search"
                className="text-3xl py-8 flex items-center"
              >
                <GrProjects className="mr-2" />
                Projets
              </Link>
            </li>
            <li className="py-2 flex justify-center items-center">
              <Link
                onClick={() => setIsNavbarOpen(false)}
                to="/dashboard/search"
                className="text-3xl py-8  flex items-center"
              >
                <FaRegMessage className="mr-2" />
                Message
              </Link>
            </li>
            <li className="py-2 flex justify-center items-center">
              <Link
                onClick={() => setIsNavbarOpen(false)}
                to="/dashboard/search"
                className="text-3xl py-8 flex items-center"
              >
                <CgProfile className="mr-2" />
                Profil
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="text-md pt-10 pb-3 pl-4 w-full  flex justify-center items-center"
              >
                <BiLogOut className="mr-2 font-bold" />
                Se déconnecter
              </button>
            </li>
            <li>
              <span className="pl-3 py-3 flex justify-center items-center ">
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
            </li>
          </ul>
        </nav>
      </div>

      <BackErrorNotification />
    </>
  );
}

export default HeaderMobile;
