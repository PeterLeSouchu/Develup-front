import { Link } from 'react-router-dom';
import useAppStore from '../../store';

function Dashboard() {
  const { logged } = useAppStore();

  console.log('du dashboard');
  console.log(logged);
  return (
    <h1>
      Vous êtes desormais connecté{' '}
      <Link to="/login">clique ici pour te rediriger vers /login</Link>
    </h1>
  );
}
export default Dashboard;
