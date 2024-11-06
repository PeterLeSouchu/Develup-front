import { Link } from 'react-router-dom';

function Search() {
  return (
    <main>
      Vous êtes desormais connecté{' '}
      <Link to="/login">clique ici pour te rediriger vers /login</Link>
    </main>
  );
}
export default Search;
