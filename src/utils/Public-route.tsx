import { Outlet, Navigate } from 'react-router-dom';
import useAppStore from '../store';

function PublicRoute() {
  const { logged } = useAppStore();
  return logged ? <Navigate to="/dashboard" /> : <Outlet />;
}
export default PublicRoute;
