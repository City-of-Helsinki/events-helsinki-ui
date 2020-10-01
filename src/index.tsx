import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';

import BrowserApp from './domain/app/App';

if (process.env.REACT_APP_SENTRY_ENVIRONMENT) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
  });
}

ReactDOM.hydrate(<BrowserApp />, document.getElementById('root'));
