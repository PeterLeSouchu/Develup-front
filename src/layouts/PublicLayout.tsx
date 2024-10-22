import { Outlet } from 'react-router-dom';
import Footer from '../components/public/Footer';
import Header from '../components/public/Header';

function PublicLayout() {
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

export default PublicLayout;
