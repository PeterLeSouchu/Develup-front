import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuMenu, LuX } from 'react-icons/lu';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { useSettingsStore, useUserStore } from '../../store';
import Logo from '../public/Logo';
import DashboardNav from './Dashboard-nav';
import ThemeToggle from './Theme-toggle';

function HeaderMobile() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const { setDarkTheme, setLogged } = useUserStore();
  const navigate = useNavigate();
  const { setGlobalErrorMessage } = useSettingsStore();

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
    <>
      {/* navbar with btn toggle sidebar */}
      <header className="fixed inset-x-0 top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md dark:border-night-line dark:bg-night/85">
        <div className="flex h-16 items-center justify-between px-4">
          <button
            type="button"
            className="dv-icon-btn text-2xl"
            aria-label="Ouvrir le menu"
            onClick={() => setIsNavbarOpen(true)}
          >
            <LuMenu />
          </button>
          <Logo to="/dashboard/search" />
          <ThemeToggle />
        </div>
      </header>

      {/* Overlay */}
      {isNavbarOpen && (
        <div
          aria-label="close side bar"
          onKeyDown={() => setIsNavbarOpen(false)}
          role="button"
          tabIndex={0}
          className="fixed inset-0 z-40 cursor-default bg-ink/40 backdrop-blur-sm"
          onClick={() => setIsNavbarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col overflow-y-auto rounded-r-3xl bg-white2 px-4 py-5 transition-transform duration-300 dark:bg-night-surface ${
          isNavbarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between pl-2">
          <Logo to="/dashboard/search" />
          <button
            type="button"
            className="dv-icon-btn"
            aria-label="Fermer le menu"
            onClick={() => setIsNavbarOpen(false)}
          >
            <LuX />
          </button>
        </div>
        <DashboardNav
          onNavigate={() => setIsNavbarOpen(false)}
          onLogout={() => handleLogout()}
        />
      </div>
    </>
  );
}

export default HeaderMobile;
