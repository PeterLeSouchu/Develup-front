function Header() {
  return (
    <nav className="flex justify-between p-7">
      <a href="/" className="text-darkgold font-semibold">
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
  );
}
export default Header;
