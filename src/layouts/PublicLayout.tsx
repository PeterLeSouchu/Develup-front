import { Outlet } from 'react-router-dom';
import Footer from '../components/public/Footer';
import Header from '../components/public/Header';

function PublicLayout() {
  return (
    <div className="bg-grid-pattern">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
