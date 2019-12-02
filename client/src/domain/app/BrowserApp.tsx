import React, { FunctionComponent } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { SUPPORT_LANGUAGES } from "../../constants";
import createClient from "../../util/createClient";
import App from "./App";

const localeParam = `:locale(${SUPPORT_LANGUAGES.EN}|${SUPPORT_LANGUAGES.FI}|${SUPPORT_LANGUAGES.SV})`;
// Export for testing purpose
export const appRoutes = (
  <Switch>
    <Redirect exact path="/" to="/fi/home" />
    <Route path={`/${localeParam}/*`} component={App} />
    <Route
      render={props => <Redirect to={`/fi${props.location.pathname}`} />}
    />
  </Switch>
);

const BrowserApp: FunctionComponent = () => {
  const uri = process.env.REACT_APP_GRAPHQL_BASE_URL || "";
  const client = createClient(uri);

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>{appRoutes}</ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default BrowserApp;
