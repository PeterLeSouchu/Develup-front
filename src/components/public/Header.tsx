import { Link } from 'react-router-dom';
import Logo from './Logo';

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-1 sm:gap-2">
          <Link to="/login" className="dv-btn-ghost h-[2.5rem] px-4">
            Se connecter
          </Link>
          <Link to="/signup" className="dv-btn-primary h-[2.5rem] px-5">
            S&apos;inscrire
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
