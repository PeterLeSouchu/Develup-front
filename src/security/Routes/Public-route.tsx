import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '../../store';

function PublicRoute() {
  const { logged } = useUserStore();
  return logged ? <Navigate to="/dashboard/search" /> : <Outlet />;
}
export default PublicRoute;
