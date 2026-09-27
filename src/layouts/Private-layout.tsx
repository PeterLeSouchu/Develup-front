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
      <div className="flex min-h-screen bg-paper font-body text-ink antialiased transition-colors duration-300 dark:bg-night dark:text-paper">
        {matches ? <HeaderMobile /> : <HeaderDesktop />}

        {globalErrorMessage ? (
          <GlobalError message={globalErrorMessage} />
        ) : (
          <main className="mx-auto w-full max-w-6xl flex-grow px-4 pb-10 pt-24 md:px-8 lg:pt-10">
            {state === 'loading' ? <Loader /> : <Outlet />}
          </main>
        )}
      </div>
    </div>
  );
}

export default PrivateLayout;
