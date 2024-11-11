import { useNavigate } from 'react-router-dom';
import { useSettingsStore, useUserStore } from '../../../store';

function GlobalError({ message }: { message: string }) {
  const navigate = useNavigate();
  const { setGlobalErrorMessage } = useSettingsStore();
  const { setLogged, setDarkTheme } = useUserStore();

  function handleResetSession() {
    setLogged(false);
    setGlobalErrorMessage('');
    setDarkTheme(false);
    localStorage.removeItem('csrfToken');
    localStorage.removeItem('user-storage');
    navigate('/login');
  }
  return (
    <div className="fixed flex items-center justify-center inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-md cursor-default">
      <div className="p-3 bg-white rounded-lg max-w-80 flex justify-center flex-col">
        <p className=" text-center">{message}</p>
        <button
          type="button"
          onClick={handleResetSession}
          className="p-3 mt-5 bg-gold dark:bg-darkgold rounded-lg hover:bg-darkgold dark:hover:bg-darkgold2 dark:hover:text-white transition"
        >
          {' '}
          Se reconnecter
        </button>
      </div>
    </div>
  );
}
export default GlobalError;
