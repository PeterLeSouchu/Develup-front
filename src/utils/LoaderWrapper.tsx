import React, { ReactNode } from 'react';
import Loader from '../components/Loader';
import { useSettingsStore } from '../store';

interface LoaderWrapperProps {
  children: ReactNode;
}

function LoaderWrapper({ children }: LoaderWrapperProps) {
  const { loading } = useSettingsStore();
  return loading ? <Loader /> : <div>{children}</div>;
}

export default LoaderWrapper;
