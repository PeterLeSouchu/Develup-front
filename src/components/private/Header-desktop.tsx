import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore, useUserStore } from '../../store';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import Logo from '../public/Logo';
import DashboardNav from './Dashboard-nav';

function HeaderDesktop() {
  const { setDarkTheme, setLogged } = useUserStore();
  const navigate = useNavigate();
  const { setGlobalErrorMessage } = useSettingsStore();

  async function handleLogout() {
    try {
      await axiosWithoutCSRFtoken.post('/logout');
      setLogged(false);
      setDarkTheme(false);
      localStorage.removeItem('csrfToken');
      localStorage.removeItem('user-storage');
      return navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        return setGlobalErrorMessage(message);
      }
      return setGlobalErrorMessage(
        'Erreur innatendu, essayez de vous reconnecter'
      );
    }
  }
  return (
    <header className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-line bg-white2 px-4 py-6 dark:border-night-line dark:bg-night-surface">
      <div className="mb-8 px-2">
        <Logo to="/dashboard/search" />
      </div>
      <DashboardNav onNavigate={() => {}} onLogout={() => handleLogout()} />
    </header>
  );
}
export default HeaderDesktop;
