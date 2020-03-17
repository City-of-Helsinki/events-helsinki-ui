import "../../common/translation/i18n/init.client";
import "../../globals";

import React, { FunctionComponent } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { useSSR } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

import createGraphqlClient from "../../util/createGraphqlClient";
import AppRoutes from "./AppRoutes";

const BrowserApp: FunctionComponent = () => {
  useSSR(window.initialI18nStore, window.initialLanguage);

  const uri = process.env.REACT_APP_GRAPHQL_BASE_URL || "";
  const client = createGraphqlClient(uri);

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <AppRoutes />
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default BrowserApp;
