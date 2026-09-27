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
    <div className="fixed inset-0 z-40 flex cursor-default items-center justify-center bg-ink/40 p-4 backdrop-blur-md">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="global-error-message"
        className="w-full max-w-sm rounded-3xl bg-white2 p-7 text-ink shadow-2xl dark:bg-night-surface dark:text-paper"
      >
        <p
          id="global-error-message"
          className="font-display text-lg font-bold leading-snug"
        >
          {message}
        </p>
        <button
          type="button"
          onClick={handleResetSession}
          className="dv-btn-primary mt-6 w-full"
        >
          Se reconnecter
        </button>
      </div>
    </div>
  );
}
export default GlobalError;
