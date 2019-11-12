import React, { FunctionComponent } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";

import { SUPPORT_LANGUAGES } from "../../common/translation/constants";
import { changeLanguage } from "../../common/translation/TranslationUtils";
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
