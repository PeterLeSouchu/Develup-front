import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import './styles/reset.css';
import './styles/index.css';
import Home from './pages/public/Home';
import NotFound from './pages/NotFound';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import Dashboard from './pages/private/Dashboard';
import LegalNotices from './pages/public/Legal-notices';
import Signin from './pages/public/Signin';
import Signup from './pages/public/Signup';
import ForgotPassword from './pages/public/Forgot-password';
import Conditions from './pages/public/Conditions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicLayout />} errorElement={<NotFound />}>
        <Route path="/" element={<Home />} />
        <Route path="/legal-notices" element={<LegalNotices />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/general-conditions-of-use" element={<Conditions />} />
      </Route>

      {/* <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route> */}

      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
