import React from 'react';

import { setBasepath, useRoutes, useRedirect, navigate } from 'hookrouter';
import { ROUTE_MAP, ROUTE_CONFIG } from './routes';

import { theme, ChakraProvider } from '@chakra-ui/react';
import NavbarHeader from './components/NavbarHeader';

import ErrorPage from './pages/ErrorPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalAuthManager } from './utils/GlobalAuthManager';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
} else {
  // production code
  setBasepath('/sc-admin');
}

function App() {
  useRedirect('/', ROUTE_CONFIG.LOGIN.path);

  const routeResult = useRoutes(ROUTE_MAP);
  const renderedPage = routeResult || <ErrorPage errorCode={404} />;

  const isLoggedIn = GlobalAuthManager.isLoggedIn();
  if (!isLoggedIn)
    navigate('/login');

  return (
    <ChakraProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {isLoggedIn && <NavbarHeader />}
      {isLoggedIn ? renderedPage : ROUTE_CONFIG.LOGIN.widget()}
    </ChakraProvider>
  );
}

export default App;
