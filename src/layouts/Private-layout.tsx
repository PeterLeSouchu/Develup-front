import { useMediaQuery } from 'usehooks-ts';
import { Outlet, useNavigation } from 'react-router-dom';
import HeaderDesktop from '../components/private/Header-desktop';
import HeaderMobile from '../components/private/Header-mobile';
import { useSettingsStore, useUserStore } from '../store';
import GlobalError from '../components/all/errors/Global-error';
import Loader from '../components/all/loader/Loader';

function PrivateLayout() {
  const { darkTheme } = useUserStore();
  const { globalErrorMessage } = useSettingsStore();
  const matches = useMediaQuery('(max-width: 1023px)');
  const { state } = useNavigation();
  return (
    <div className={`${darkTheme && 'dark'}`}>
      <div className="flex sm:h-screen min-h-screen transition-colors duration-500 bg-white  dark:bg-darkTheme">
        {matches ? <HeaderMobile /> : <HeaderDesktop />}

        {globalErrorMessage ? (
          <GlobalError message={globalErrorMessage} />
        ) : (
          <main
            className={`dark:text-white overflow-scroll w-full  md:px-10 px-4 max-w-8 mx-auto   py-6 lg:pt-6 sm:pt-20 pt-24 lg:pb-6  flex-grow   `}
          >
            {state === 'loading' ? <Loader /> : <Outlet />}
          </main>
        )}
      </div>
    </div>
  );
}

export default PrivateLayout;
