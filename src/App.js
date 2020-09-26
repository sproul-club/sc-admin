import React from 'react';

import { useRoutes, useRedirect } from 'hookrouter';
import { ROUTE_MAP } from './routes';

import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import Header from './components/Header';

import ErrorPage from './pages/ErrorPage';


function App() {
  // useRedirect('/', '/login');

  const routeResult = useRoutes(ROUTE_MAP);
  const renderedPage = routeResult || <ErrorPage errorCode={404} />;

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Header />
      {renderedPage}
    </ThemeProvider>
  );
}

export default App;
