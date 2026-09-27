import { Link } from 'react-router-dom';

function Logo({ to }: { to: string }) {
  return (
    <Link
      to={to}
      aria-label="Develup, accueil"
      className="inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pollen/60"
    >
      <span className="grid place-items-center w-9 h-9 rounded-[10px] bg-pollen font-display font-extrabold text-xl text-ink">
        D
      </span>
      <span className="font-display font-bold text-xl tracking-tight text-ink dark:text-paper">
        Develup
      </span>
    </Link>
  );
}

export default Logo;
