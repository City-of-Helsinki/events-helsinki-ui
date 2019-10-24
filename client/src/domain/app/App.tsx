import { Route, Switch, RouteComponentProps, Redirect } from "react-router";
import React, { FunctionComponent } from "react";

import { SUPPORT_LANGUAGES } from "../../common/translation/constants";
import { changeLanguage } from "../../common/translation/utils";
import Home from "../home/Home";

const App: FunctionComponent<
  RouteComponentProps<{ locale: SUPPORT_LANGUAGES }>
> = ({
  match: {
    params: { locale }
  }
}) => {
  changeLanguage(locale);

  return (
    <Switch>
      <Redirect exact path={`/${locale}/`} to={`/${locale}/home`} />
      <Route exact path={`/${locale}/home`} component={Home} />
    </Switch>
  );
};

export default App;
