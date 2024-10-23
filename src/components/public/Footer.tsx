function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex justify-center md:gap-20 gap-3 items-center p-6 pt-10 min-h-8 backdrop-blur-mini text-center flex-col lg:flex-row text-sm lg:text-base">
      <p>Copyright © {currentYear} - Develup - Tous droits réservés</p>
      <a href="*" className="underline underline-offset-3">
        Contact
      </a>
      <a href="/legal-notices" className="underline underline-offset-3">
        Mentions légales
      </a>
    </footer>
  );
}
export default Footer;
