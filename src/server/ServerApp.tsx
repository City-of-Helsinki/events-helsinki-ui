import { ApolloClient, ApolloProvider } from '@apollo/client';
import { i18n as i18nType } from 'i18next';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { StaticRouter } from 'react-router-dom';

import {
  ServerRequestContext,
  ServerRequestContextType,
} from '../contexts/ServerRequestContext';
import App from '../domain/app/App';

export interface StaticContext {
  url?: string;
}

export interface ServerAppProps {
  client: ApolloClient<Record<string, unknown>>;
  staticContext: StaticContext;
  serverRequestContext: ServerRequestContextType;
  i18n: i18nType;
}

const ServerApp: React.FC<ServerAppProps> = ({
  client,
  staticContext,
  serverRequestContext,
  i18n,
}) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={client}>
        <StaticRouter
          location={serverRequestContext.url}
          context={staticContext}
        >
          <ServerRequestContext.Provider value={serverRequestContext}>
            <App />
          </ServerRequestContext.Provider>
        </StaticRouter>
      </ApolloProvider>
    </I18nextProvider>
  );
};

export default ServerApp;
