import { Link } from 'react-router-dom';

function Search() {
  return (
    <div>
      Vous êtes desormais connecté{' '}
      <Link to="/login">clique ici pour te rediriger vers /login</Link>
    </div>
  );
}
export default Search;
