import React, { FunctionComponent } from "react";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { SUPPORT_LANGUAGES } from "../../common/translation/constants";

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
  return <BrowserRouter>{appRoutes}</BrowserRouter>;
};

export default BrowserApp;
