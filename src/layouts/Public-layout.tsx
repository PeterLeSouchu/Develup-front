import { Outlet } from 'react-router-dom';
import Footer from '../components/public/Footer';
import Header from '../components/public/Header';
import ScrollToTop from '../components/all/ScrollToTop';

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <div className="dv-dots flex min-h-screen flex-col font-body text-ink antialiased">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default PublicLayout;
