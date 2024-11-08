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
import NotFound from './pages/all/Not-Found';
import PublicLayout from './layouts/Public-layout';
import PrivateLayout from './layouts/Private-layout';
import Search, { loadProjectsAndTechnos } from './pages/private/Search';
import LegalNotices from './pages/all/Legal-notices';
import Signin from './pages/public/Signin';
import Signup from './pages/public/Signup';
import ForgotPassword from './pages/public/Forgot-password';
import Conditions from './pages/all/Conditions';
import PrivateRoute from './security/routes/Private-route';
import PublicRoute from './security/routes/Public-route';
import ResetPassword from './pages/public/Reset-password';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoute />}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/legal-notices" element={<LegalNotices />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/general-conditions-of-use" element={<Conditions />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route
            path="/dashboard/search"
            loader={loadProjectsAndTechnos}
            element={<Search />}
          />
          <Route
            path="/dashboard/general-conditions-of-use"
            element={<Conditions />}
          />
          <Route path="/dashboard/legal-notices" element={<LegalNotices />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
