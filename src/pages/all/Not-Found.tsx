import { Link } from 'react-router-dom';
import { useUserStore } from '../../store';

function NotFound() {
  const { logged } = useUserStore();
  return (
    <div className="dv-dots flex min-h-screen items-center justify-center px-4 font-body text-ink">
      <div className="text-center">
        <p className="font-display text-[9rem] font-extrabold leading-none tracking-[-0.05em] text-ink sm:text-[12rem]">
          4
          <span className="mx-1 inline-block rotate-[-6deg] rounded-[0.18em] bg-pollen px-[0.08em]">
            0
          </span>
          4
        </p>
        <h1 className="mt-6 font-display text-2xl font-bold">
          Il ne semble pas y avoir de projets ici...
        </h1>
        <p className="mt-2 text-muted">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          to={logged ? '/dashboard/search' : '/'}
          className="dv-btn-primary mt-8"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
