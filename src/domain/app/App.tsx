import '../../common/translation/i18n/init.client';
import '../../globals';
import 'react-toastify/dist/ReactToastify.css';

import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { useSSR } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import apolloClient from './apollo/apolloClient';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './scrollToTop/ScrollToTop';

const instance = createInstance({
  disabled: process.env.REACT_APP_MATOMO_ENABLED !== 'true',
  urlBase: process.env.REACT_APP_MATOMO_URL_BASE as string,
  siteId: Number(process.env.REACT_APP_MATOMO_SITE_ID),
});

const App: React.FC = () => {
  useSSR(window.initialI18nStore, window.initialLanguage);

  return (
    <BrowserRouter>
      <ToastContainer />
      <ApolloProvider client={apolloClient}>
        <ApolloHooksProvider client={apolloClient}>
          <ScrollToTop />
          <MatomoProvider value={instance}>
            <AppRoutes />
          </MatomoProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
