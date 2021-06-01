import '../../common/translation/i18n/init.client';
import '../../globals';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/client';
// import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import React from 'react';
import { useSSR } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import apolloClient from './apollo/apolloClient';
import App from './App';

const instance = createInstance({
  disabled: process.env.REACT_APP_MATOMO_ENABLED !== 'true',
  urlBase: process.env.REACT_APP_MATOMO_URL_BASE as string,
  siteId: Number(process.env.REACT_APP_MATOMO_SITE_ID),
});

const BrowserApp: React.FC = () => {
  useSSR(window.initialI18nStore, window.initialLanguage);

  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        {/* <ApolloHooksProvider client={apolloClient}> */}
        <MatomoProvider value={instance}>
          <App />
        </MatomoProvider>
        {/* </ApolloHooksProvider> */}
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default BrowserApp;
