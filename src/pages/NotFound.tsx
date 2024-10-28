import { Link } from 'react-router-dom';
import { useUserStore } from '../store';

function NotFound() {
  const { logged } = useUserStore();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-9xl font-montserrat text-darkgold">404</h1>
        <p className="text-lg font-montserrat text-gray-600 mt-2">
          Oops, il ne semble pas y avoir de projets ici ...
        </p>

        <Link
          to={logged ? '/dashboard' : '/'}
          className="bg-green mt-10 inline-block px-6 py-3 hover:bg-newgreen font-semibold rounded-full shadow-md bg-gold  transition duration-300 hover:scale-105 hover:bg-darkgold hover:text-white"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
