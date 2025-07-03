import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// maintenance routing
const LoginPage = Loadable(lazy(() => import('views/pages/authentication/Login')));
const RegisterPage = Loadable(lazy(() => import('views/pages/authentication/Register')));
const LogoutPage = Loadable(lazy(() => import('views/dashboard/Logout'))); 

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login',
      element: <LoginPage />
    },
    {
      path: 'dashboard/Logout',
      element: <LogoutPage />
    },    
    {
      path: '/pages/register',
      element: <RegisterPage />
    }
  ]
};

export default AuthenticationRoutes;
