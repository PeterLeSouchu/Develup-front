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
import PrivateRoute from './security/Routes/Private-route';
import PublicRoute from './security/Routes/Public-route';
import ResetPassword from './pages/public/Reset-password';
import ProjectDetails, {
  loadProjectDetails,
} from './pages/private/Project-details';
import UserDetails, { loadUserDetails } from './pages/private/User-details';
import MyProjects, { loadPersonalProjects } from './pages/private/My-projects';
import MyProfile, { loadProfileData } from './pages/private/My-profile';
import ConversationsList, {
  loadConversations,
} from './pages/private/Conversations-list';
import Conversation, { loadMessages } from './pages/private/Conversation';

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
          <Route
            path="/dashboard/project/:slug"
            loader={loadProjectDetails}
            element={<ProjectDetails />}
          />
          <Route
            path="/dashboard/user/:slug"
            loader={loadUserDetails}
            element={<UserDetails />}
          />
          <Route
            path="/dashboard/my-projects"
            element={<MyProjects />}
            loader={loadPersonalProjects}
          />
          <Route
            path="/dashboard/my-profile"
            element={<MyProfile />}
            loader={loadProfileData}
          />
          <Route
            path="/dashboard/conversation"
            element={<ConversationsList />}
            loader={loadConversations}
          />
          <Route
            path="/dashboard/conversation/:id"
            element={<Conversation />}
            loader={loadMessages}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

root.render(<RouterProvider router={router} />);
