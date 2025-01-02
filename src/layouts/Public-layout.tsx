import { Outlet } from 'react-router-dom';
import Footer from '../components/public/Footer';
import Header from '../components/public/Header';
import ScrollToTop from '../components/all/ScrollToTop';

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <div className="bg-grid-pattern overflow-hidden">
        <Header />

        <main className="min-h-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default PublicLayout;
