import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/private/Footer';
import Header from '../components/private/Header';
import { useUserStore } from '../store';

function PrivateLayout() {
  const navigate = useNavigate();
  const { logged } = useUserStore();

  /* 
  Using useEffect to verify if user is connected in addition to the verification done in the private route component
 */
  useEffect(() => {
    function isLogged() {
      if (!logged) {
        navigate('/');
      }
    }
    isLogged();
  }, [logged, navigate]);
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
