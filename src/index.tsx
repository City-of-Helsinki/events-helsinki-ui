import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleTagManager from 'react-gtm-module';

import BrowserApp from './domain/app/BrowserApp';

if (process.env.REACT_APP_GTM_ID) {
  const tagManagerOptions = {
    gtmId: process.env.REACT_APP_GTM_ID,
  };

  GoogleTagManager.initialize(tagManagerOptions);
}

if (process.env.REACT_APP_SENTRY_ENVIRONMENT) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
  });
}

ReactDOM.hydrate(<BrowserApp />, document.getElementById('root'));
