import { Outlet, Navigate } from 'react-router-dom';
import useAppStore from '../store';

function PrivateRoute() {
  const { logged } = useAppStore();
  return logged ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoute;
