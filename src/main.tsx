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
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import Dashboard from './pages/Dashboard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicLayout />} errorElement={<NotFound />}>
        <Route path="/" element={<Home />} />
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
