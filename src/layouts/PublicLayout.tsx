import { Outlet } from 'react-router-dom';
import Footer from '../components/public/Footer';
import Header from '../components/public/Header';

function PublicLayout() {
  return (
    <div>
      <Header />
      <main className="min-h-84 bg-grid-pattern">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
