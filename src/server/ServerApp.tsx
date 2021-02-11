import { ApolloClient } from 'apollo-client';
import { i18n as i18nType } from 'i18next';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { I18nextProvider } from 'react-i18next';
import { StaticRouter } from 'react-router-dom';

import App from '../domain/app/App';

export interface StaticContext {
  url?: string;
}

export type ReqContextType = {
  host: string;
  url: string;
};

interface Props {
  client: ApolloClient<Record<string, unknown>>;
  staticContext: StaticContext;
  reqContext: ReqContextType;
  i18n: i18nType;
}

export const ReqContext = React.createContext<ReqContextType>({
  host: '',
  url: '',
});

const ServerApp: React.FC<Props> = ({
  client,
  staticContext,
  reqContext,
  i18n,
}) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={client}>
        <StaticRouter location={reqContext.url} context={staticContext}>
          <ReqContext.Provider value={reqContext}>
            <App />
          </ReqContext.Provider>
        </StaticRouter>
      </ApolloProvider>
    </I18nextProvider>
  );
};

export default ServerApp;
