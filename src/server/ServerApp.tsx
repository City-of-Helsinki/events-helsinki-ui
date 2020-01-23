import { ApolloClient } from "apollo-client";
import { i18n as i18nType } from "i18next";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { I18nextProvider } from "react-i18next";
import { StaticRouter } from "react-router-dom";

import AppRoutes from "../domain/app/AppRoutes";

interface Props {
  client: ApolloClient<object>;
  context: object;
  url: string;
  i18n: i18nType;
}

const ServerApp: React.FC<Props> = ({ client, context, url, i18n }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={client}>
        <StaticRouter location={url} context={context}>
          <AppRoutes />
        </StaticRouter>
      </ApolloProvider>
    </I18nextProvider>
  );
};

export default ServerApp;
