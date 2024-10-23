import { FaHome } from 'react-icons/fa';

function Header() {
  return (
    <header className="h-8 backdrop-blur-mini  md:text-lg flex items-center p-7  ">
      <nav className="flex justify-between items-center w-screen">
        <a
          href="/"
          className="text-darkgold font-semibold flex justify-center items-center gap-2"
        >
          <FaHome />
          Accueil
        </a>
        <div>
          <a href="/login" className="hover:text-darkgold mr-5 transition">
            Se connecter
          </a>
          <a href="/signup" className="hover:text-darkgold  transition">
            S&apos;inscrire
          </a>
        </div>
      </nav>
    </header>
  );
}
export default Header;
