import { useMediaQuery } from 'usehooks-ts';
import { Outlet } from 'react-router-dom';
import HeaderDesktop from '../components/private/Header-desktop';
import HeaderMobile from '../components/private/Header-mobile';
import Footer from '../components/private/Footer';
import { useUserStore } from '../store';
import 'react-toastify/dist/ReactToastify.css';

function PrivateLayout() {
  const { darkTheme } = useUserStore();
  const matches = useMediaQuery('(max-width: 768px)');
  return (
    <div className={`${darkTheme && 'dark'}`}>
      <div className="md:flex md:h-screen min-h-screen transition-colors duration-500 bg-white  dark:bg-darkTheme">
        {matches ? <HeaderMobile /> : <HeaderDesktop />}
        <main className="dark:text-white w-full md:px-14 px-6 md:py-6 pt-24 pb-6 overflow-scroll">
          <Outlet />
        </main>
        {matches && <Footer />}
      </div>
    </div>
  );
}

export default PrivateLayout;
