function Header() {
  return (
    <nav className="flex justify-between p-7">
      <a href="/">Accueil</a>
      <div>
        <a href="/login" className="mr-5">
          Se connecter
        </a>
        <a href="/signup">S&apos;inscrire</a>
      </div>
    </nav>
  );
}
export default Header;
