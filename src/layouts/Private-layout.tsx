import { useMediaQuery } from 'usehooks-ts';
import { Outlet } from 'react-router-dom';
import HeaderDesktop from '../components/private/Header-desktop';
import HeaderMobile from '../components/private/Header-mobile';
import { useUserStore } from '../store';
import 'react-toastify/dist/ReactToastify.css';

function PrivateLayout() {
  const { darkTheme } = useUserStore();
  const matches = useMediaQuery('(max-width: 768px)');
  return (
    <div className={`${darkTheme && 'dark'}`}>
      <div className="md:flex md:h-screen min-h-screen transition-colors duration-500 bg-white  dark:bg-darkTheme">
        {matches ? <HeaderMobile /> : <HeaderDesktop />}

        <main className="dark:text-white overflow-scroll w-full md:px-12 px-6  py-6 md:pt-6 pt-24 md:pb-6 md:min-h-0 min-h-78 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PrivateLayout;
