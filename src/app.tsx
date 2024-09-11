import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import Cookies from 'universal-cookie';
import DefaultLayout from './components/layouts/DefaultLayout';
import LoginLayout from './components/layouts/LoginLayout';
import LoaderComponent from './components/other/LoaderComponent';
import Profile from './modules/users/pages/Profile';
import CreatePassword from './pages/CreatePassword';
import ForgotPassword from './pages/ForgotPassword';
import { Login } from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { actions } from './state/Module/reducer';
import { GlobalStyle } from './styles';
import api from './utils/api';
import { handleErrorToastFromServer } from './utils/functions';
import { useGetCurrentPathModule, useUserInfoMutation } from './utils/hooks';
import { handleUpdateTokens } from './utils/loginFunctions';
import { filteredRoutes, themes } from './utils/router';
import { slugs } from './utils/routes';
import { pageTitles } from './utils/texts';
const cookies = new Cookies();

function App() {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const user = useAppSelector((state) => state.user.userData);
  const routes = filteredRoutes({ user });
  const location = useLocation();
  const module = useAppSelector((state) => state.module);
  const currentModule = useGetCurrentPathModule();
  const redirect = cookies.get('redirectPathname');
  const navigate = useNavigate();
  const token = cookies.get('token');
  const refreshToken = cookies.get('refreshToken');

  const handleSetTitle = () => {
    document.title = pageTitles[currentModule] || 'Turizmas';
  };

  const handleSetModule = () => {
    if (currentModule !== 'profilis') {
      dispatch(actions.setModule(currentModule || 'vidinis'));
    }
  };

  const { isLoading: updateTokensLoading } = useQuery(
    [token, 'refreshToken'],
    () => api.refreshToken(),
    {
      onError: ({ response }: any) => {
        handleErrorToastFromServer(response);
      },
      onSuccess: (data) => {
        handleUpdateTokens(data);
      },
      retry: false,
      enabled: !token && !!refreshToken,
    },
  );

  const { isLoading: userInfoLoading } = useUserInfoMutation();

  useEffect(() => {
    handleSetTitle();
    handleSetModule();
  }, [location.pathname]);

  useEffect(() => {
    if (!loggedIn && !userInfoLoading) {
      if (!Object.values(slugs).includes(location.pathname)) {
        cookies.set('redirectPathname', location.pathname, { path: '/' });
      }

      return;
    }

    if (loggedIn && cookies.get('redirectPathname') && !isLoading) {
      navigate(cookies.get('redirectPathname'));
      cookies.remove('redirectPathname', { path: '/' });
    }
  }, [module, loggedIn, redirect]);

  const resolveTheme = () => {
    const path = module || location.pathname.split('/')[1];

    return themes[path] || themes.vidinis;
  };

  const isLoading = [updateTokensLoading, userInfoLoading].some((loading) => loading);

  return (
    <ThemeProvider theme={resolveTheme()}>
      <GlobalStyle />
      {!isLoading ? (
        <Routes>
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            {routes.map((route) => {
              const defaultRoute = route?.routes?.filter((route) => route.sideBar)[0].slug || '';

              return (
                <Route key={route.slug}>
                  {!route.routes ? (
                    <Route key={route.slug} path={route.slug} />
                  ) : (
                    <Route path={route.slug}>
                      <Route index element={<Navigate to={defaultRoute} />} />
                      {route.routes.map((innerRouter: any) => {
                        return (
                          <Route
                            key={`${route.slug}-${innerRouter.slug}`}
                            path={innerRouter.slug}
                            element={innerRouter.component}
                          />
                        );
                      })}
                    </Route>
                  )}
                </Route>
              );
            })}
            <Route path={slugs.profile} element={<Profile />} />
          </Route>
          <Route element={<PublicRoute loggedIn={loggedIn} />} key="root">
            <Route path={slugs.login} element={<Login />} />
            <Route path={slugs.forgotPassword} element={<ForgotPassword />} />
            <Route path={slugs.resetPassword} element={<ResetPassword />} />
            <Route path={slugs.invite} element={<CreatePassword />} />
          </Route>

          <Route
            path="*"
            element={<Navigate to={loggedIn ? routes[0]?.slug : '/login'} replace />}
          />
        </Routes>
      ) : (
        <LoaderComponent />
      )}
    </ThemeProvider>
  );
}

interface ProtectedRouteProps {
  loggedIn: boolean;
}

const PublicRoute = ({ loggedIn }: ProtectedRouteProps) => {
  if (loggedIn) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <LoginLayout>
      <Outlet />
    </LoginLayout>
  );
};

const ProtectedRoute = ({ loggedIn }: ProtectedRouteProps) => {
  if (!loggedIn) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

export default Sentry.withProfiler(App);
