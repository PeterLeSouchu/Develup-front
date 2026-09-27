import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';
import {
  LuFolderKanban,
  LuLogOut,
  LuMessagesSquare,
  LuSearch,
  LuUserCircle,
} from 'react-icons/lu';
import ThemeToggle from './Theme-toggle';

const mainLinks: { to: string; label: string; icon: IconType }[] = [
  { to: '/dashboard/search', label: 'Recherche', icon: LuSearch },
  { to: '/dashboard/my-projects', label: 'Vos projets', icon: LuFolderKanban },
  {
    to: '/dashboard/conversation',
    label: 'Conversations',
    icon: LuMessagesSquare,
  },
  { to: '/dashboard/my-profile', label: 'Profil', icon: LuUserCircle },
];

interface DashboardNavProps {
  onNavigate: () => void;
  onLogout: () => void;
}

// Navigation content shared by desktop sidebar and mobile drawer
function DashboardNav({ onNavigate, onLogout }: DashboardNavProps) {
  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-col gap-1">
        {mainLinks.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex h-11 items-center gap-3 rounded-xl px-3 font-semibold transition ${
                  isActive
                    ? 'bg-pollen text-ink'
                    : 'text-ink hover:bg-paper dark:text-paper dark:hover:bg-night-line'
                }`
              }
            >
              <Icon aria-hidden className="text-lg" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-1 border-t border-line pt-4 dark:border-night-line">
        <div className="flex h-11 items-center justify-between px-3 text-sm font-medium text-ink dark:text-paper">
          Mode sombre
          <ThemeToggle />
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex h-[2.5rem] items-center gap-3 rounded-xl px-3 text-sm font-semibold text-ink transition hover:bg-paper dark:text-paper dark:hover:bg-night-line"
        >
          <LuLogOut aria-hidden />
          Se déconnecter
        </button>
      </div>
    </nav>
  );
}

export default DashboardNav;
