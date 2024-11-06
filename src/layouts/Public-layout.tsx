import { Outlet } from 'react-router-dom';
import Footer from '../components/all/Footer';
import Header from '../components/public/Header';

function PublicLayout() {
  return (
    <div className="bg-grid-pattern">
      <Header />

      <main className="min-h-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;
