import { Outlet, Navigate } from 'react-router-dom';
import useAppStore from '../store';

function PublicRoute() {
  const { logged } = useAppStore();
  console.log(`on est dans public route et voici le state logged : ${logged}`);
  return logged ? <Navigate to="/dashboard" /> : <Outlet />;
}
export default PublicRoute;
