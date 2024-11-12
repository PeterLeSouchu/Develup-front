import { useMediaQuery } from 'usehooks-ts';
import { Outlet } from 'react-router-dom';
import HeaderDesktop from '../components/private/Header-desktop';
import HeaderMobile from '../components/private/Header-mobile';
import { useSettingsStore, useUserStore } from '../store';
import GlobalError from '../components/all/errors/Global-error';
import 'react-toastify/dist/ReactToastify.css';

function PrivateLayout() {
  const { darkTheme } = useUserStore();
  const { globalErrorMessage } = useSettingsStore();
  const matches = useMediaQuery('(max-width: 1024px)');
  return (
    <div className={`${darkTheme && 'dark'}`}>
      <div className="md:flex md:h-screen min-h-screen transition-colors duration-500 bg-white  dark:bg-darkTheme">
        {matches ? <HeaderMobile /> : <HeaderDesktop />}

        {globalErrorMessage ? (
          <GlobalError message={globalErrorMessage} />
        ) : (
          <main className="dark:text-white overflow-scroll w-full  md:px-10 px-4 max-w-7xl mx-auto   py-6 lg:pt-6 pt-24 lg:pb-6  ">
            <Outlet />
          </main>
        )}
      </div>
    </div>
  );
}

export default PrivateLayout;
