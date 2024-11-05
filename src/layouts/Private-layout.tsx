import { Outlet } from 'react-router-dom';
import Header from '../components/private/Header';
import { useUserStore } from '../store';
import 'react-toastify/dist/ReactToastify.css';

function PrivateLayout() {
  const { darkTheme } = useUserStore();
  return (
    <div className={`${darkTheme && 'dark'}`}>
      <div
        className={`flex   h-screen transition-colors duration-500  bg-white ${darkTheme && 'dark'} dark:bg-darkTheme`}
      >
        <Header />
        <main className="w-full px-20 py-6 overflow-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PrivateLayout;
