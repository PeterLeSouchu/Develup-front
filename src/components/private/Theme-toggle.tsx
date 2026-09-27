import { FaMoon } from 'react-icons/fa';
import { useUserStore } from '../../store';

function ThemeToggle() {
  const { darkTheme, setDarkTheme } = useUserStore();
  return (
    <button
      className={`toggle-btn shrink-0 ${darkTheme ? 'toggled' : ''}`}
      onClick={() => setDarkTheme(!darkTheme)}
      type="button"
      aria-label="theme button"
      aria-pressed={darkTheme}
    >
      <div className="thumb">
        <FaMoon className="text-[11px]" />
      </div>
    </button>
  );
}

export default ThemeToggle;
