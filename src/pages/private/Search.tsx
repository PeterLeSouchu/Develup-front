import { Link } from 'react-router-dom';
import { useUserStore } from '../../store';

function Search() {
  const { logged } = useUserStore();

  console.log('du dashboard');
  console.log(logged);
  return (
    <main>
      Vous êtes desormais connecté{' '}
      <Link to="/login">clique ici pour te rediriger vers /login</Link>
    </main>
  );
}
export default Search;
