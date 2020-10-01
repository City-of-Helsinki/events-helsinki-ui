import '../../common/translation/i18n/init.client';
import '../../globals';

import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import React, { FunctionComponent } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { useSSR } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from '../../common/route/RouteUtils';
import apolloClient from './apollo/apolloClient';
import AppRoutes from './routes/AppRoutes';

const instance = createInstance({
  disabled: process.env.REACT_APP_MATOMO_ENABLED !== 'true',
  urlBase: process.env.REACT_APP_MATOMO_URL_BASE as string,
  siteId: Number(process.env.REACT_APP_MATOMO_SITE_ID),
});

const BrowserApp: FunctionComponent = () => {
  useSSR(window.initialI18nStore, window.initialLanguage);

  return (
    <BrowserRouter>
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

export default BrowserApp;
