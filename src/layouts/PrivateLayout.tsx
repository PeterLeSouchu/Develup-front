import { Outlet } from 'react-router-dom';
import Header from '../components/private/Header';

function PrivateLayout() {
  return (
    <div className="flex">
      <Header />
      <main className="w-full h-screen pt-2">
        <Outlet />
      </main>
    </div>
  );
}

export default PrivateLayout;
