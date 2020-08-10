import '../../common/translation/i18n/init.client';
import '../../globals';

import React, { FunctionComponent } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { useSSR } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from '../../common/route/RouteUtils';
import apolloClient from './apollo/apolloClient';
import AppRoutes from './AppRoutes';

const BrowserApp: FunctionComponent = () => {
  useSSR(window.initialI18nStore, window.initialLanguage);

  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <ApolloHooksProvider client={apolloClient}>
          <ScrollToTop />
          <AppRoutes />
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default BrowserApp;
