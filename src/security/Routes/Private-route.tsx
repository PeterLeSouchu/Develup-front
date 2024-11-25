import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '../../store';

function PrivateRoute() {
  const { logged } = useUserStore();
  return logged ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoute;
