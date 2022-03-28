import '../../common/translation/i18n/init.client';
import '../../globals';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/client';
import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import React from 'react';
import { useSSR } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import apolloClient from './apollo/apolloClient';
import App from './App';

const matomoUrlBase = process.env.REACT_APP_MATOMO_URL_BASE as string;
const instance = createInstance({
  disabled: process.env.REACT_APP_MATOMO_ENABLED !== 'true',
  urlBase: matomoUrlBase,
  siteId: Number(process.env.REACT_APP_MATOMO_SITE_ID),
  trackerUrl: `${matomoUrlBase}tracker.php`,
  srcUrl: `${matomoUrlBase}piwik.min.js`,
});

const BrowserApp: React.FC = () => {
  useSSR(window.initialI18nStore, window.initialLanguage);

  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <MatomoProvider value={instance}>
          <App />
        </MatomoProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default BrowserApp;
