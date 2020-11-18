import 'react-app-polyfill/stable';

import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleTagManager, { TagManagerArgs } from 'react-gtm-module';

import BrowserApp from './domain/app/BrowserApp';

if (process.env.REACT_APP_GTM_ID) {
  const tagManagerOptions: TagManagerArgs = {
    auth: process.env.REACT_APP_GTM_AUTH,
    gtmId: process.env.REACT_APP_GTM_ID,
    preview: process.env.REACT_APP_GTM_PREVIEW,
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
