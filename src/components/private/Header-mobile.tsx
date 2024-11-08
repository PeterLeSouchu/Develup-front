import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { GrProjects } from 'react-icons/gr';
import { FaMoon, FaRegFile, FaRegMessage } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';
import { IoMenu } from 'react-icons/io5';
import { FaShieldAlt } from 'react-icons/fa';
import logo from '../../assets/images/logo-black.png';
import axiosWithCSRFtoken from '../../utils/request/axios-with-csrf-token';
import { useUserStore } from '../../store';
import errorNotification from '../all/errors/back-error-notification/notification-function';
import BackErrorNotification from '../all/errors/back-error-notification/Back-error-component';

function HeaderMobile() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const { darkTheme, setDarkTheme, setLogged } = useUserStore();
  const navigate = useNavigate();

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = '';
  };

  useEffect(() => {
    if (isNavbarOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
    return () => enableScroll();
  }, [isNavbarOpen]);

  async function handleLogout() {
    try {
      await axiosWithCSRFtoken.post('/logout');
      setLogged(false);
      localStorage.removeItem('csrfToken');
      setDarkTheme(false);
      localStorage.removeItem('user-storage');
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
      {/* navbar with btn toggle sidebar */}
      <header className="w-full fixed backdrop-blur-sm p-3 z-30">
        <div className="px-3 flex justify-between items-center h-14 rounded-2xl bg-gradient-to-b from-lightgold2 to-lightgold dark:from-darkgold2 dark:to-darkgold">
          <button
            type="button"
            className=" text-4xl"
            onClick={() => setIsNavbarOpen(true)}
          >
            <IoMenu />
          </button>
          <img src={logo} alt="logo Develup" className="w-28" />
          <span className=" py-2 flex justify-start items-center ">
            <button
              className={`toggle-btn py-3  ${darkTheme ? 'toggled' : ''}`}
              onClick={() => setDarkTheme(!darkTheme)}
              type="button"
              aria-label="theme button"
            >
              <div className="thumb">
                <FaMoon />
              </div>
            </button>
          </span>
        </div>
      </header>

      {/* Overlay */}
      {isNavbarOpen && (
        <div
          aria-label="close side bar"
          onKeyDown={() => setIsNavbarOpen(false)}
          role="button"
          tabIndex={0}
          className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm cursor-default"
          onClick={() => setIsNavbarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed rounded-r-xl top-0 left-0 h-full bg-gradient-to-b from-lightgold2 to-lightgold dark:from-darkgold2 dark:to-darkgold transition-transform duration-300 ${
          isNavbarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-72  z-50`}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-3xl z-50"
          onClick={() => setIsNavbarOpen(false)}
        >
          <RxCross1 />
        </button>
        <nav className="p-4 relative h-full">
          <ul>
            <li className="py-2 flex justify-start items-center">
              <Link
                onClick={() => setIsNavbarOpen(false)}
                to="/dashboard/search"
                className="font-extrabold py-3 pt-7 text-3xl flex items-center "
              >
                <IoIosSearch className="mr-2" />
                Recherche
              </Link>
            </li>
            <li className="py-2 flex justify-start items-center">
              <Link
                onClick={() => setIsNavbarOpen(false)}
                to="/dashboard/search"
                className="font-extrabold text-3xl py-3 flex items-center"
              >
                <GrProjects className="mr-2" />
                Projets
              </Link>
            </li>
            <li className="py-2 flex justify-start items-center">
              <Link
                onClick={() => setIsNavbarOpen(false)}
                to="/dashboard/search"
                className="font-extrabold text-3xl py-3 flex items-center"
              >
                <FaRegMessage className="mr-2" />
                Message
              </Link>
            </li>
            <li className="py-2 flex justify-start items-center">
              <Link
                onClick={() => setIsNavbarOpen(false)}
                to="/dashboard/search"
                className="font-extrabold text-3xl py-3 pb-12 flex items-center"
              >
                <CgProfile className="mr-2" />
                Profil
              </Link>
            </li>
          </ul>
          <div className="absolute bottom-5 left-5">
            <div className="pt-44 py-2 flex justify-start items-center">
              <Link
                onClick={() => setIsNavbarOpen(false)}
                to="/dashboard/legal-notices"
                className="text-md  w-full underline-offset-2 underline  flex justify-start items-center"
              >
                <FaRegFile className="mr-2" />
                Mentions légales
              </Link>
            </div>
            <div className="py-2 flex justify-start items-center">
              <Link
                onClick={() => setIsNavbarOpen(false)}
                to="/dashboard/general-conditions-of-use"
                className="text-md w-full underline-offset-2 underline flex justify-start items-center"
              >
                <FaShieldAlt className="mr-2" />
                CGU
              </Link>
            </div>
            <div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-md py-2  font-bold w-full flex justify-start items-center"
              >
                <BiLogOut className="mr-2 font-bold" />
                Se déconnecter
              </button>
            </div>
          </div>
        </nav>
      </div>
      <BackErrorNotification />
    </>
  );
}

export default HeaderMobile;
