import { ReactNode } from 'react';
import Loader from './Loader';
import { useSettingsStore } from '../../../store';

interface LoaderWrapperProps {
  children: ReactNode;
}

// We must use this component by wrapping a child directly, if we use this component in the publicLayout component by wrapping "<Outlet/>", all child components will be unmounted, so we can't make a loaderWrapper for all page just for each child componenet

function LoaderWrapper({ children }: LoaderWrapperProps) {
  const { loading } = useSettingsStore();
  return loading ? <Loader /> : <div>{children}</div>;
}

export default LoaderWrapper;
