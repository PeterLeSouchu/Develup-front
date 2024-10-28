import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/public/Footer';
import Header from '../components/public/Header';
import { useUserStore } from '../store';

function PublicLayout() {
  const navigate = useNavigate();
  const { logged } = useUserStore();

  /* 
  Using useEffect to verify if user is connected in addition to the verification done in the public route component
 */

  useEffect(() => {
    function isLogged() {
      if (logged) {
        navigate('/dashboard');
      }
    }
    isLogged();
  }, [logged, navigate]);

  return (
    <div className="bg-grid-pattern">
      <Header />
      <main className="min-h-80">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
