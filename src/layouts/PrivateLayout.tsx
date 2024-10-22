import { Outlet } from 'react-router-dom';
import Footer from '../components/private/Footer';
import Header from '../components/private/Header';

function PrivateLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PrivateLayout;
