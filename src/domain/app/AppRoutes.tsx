import React from "react";
import { useTranslation } from "react-i18next";
import { Redirect, Route, Switch } from "react-router";

import { getCurrentLanguage } from "../../common/translation/TranslationUtils";
import { SUPPORT_LANGUAGES } from "../../constants";
import App from "./App";

const localeParam = `:locale(${SUPPORT_LANGUAGES.EN}|${SUPPORT_LANGUAGES.FI}|${SUPPORT_LANGUAGES.SV})`;

const AppRoutes = () => {
  const { i18n } = useTranslation();
  const currentLanguage = getCurrentLanguage(i18n);

  return (
    <Switch>
      <Redirect exact path="/" to={`/${currentLanguage}/home`} />
      <Route path={`/${localeParam}/*`} component={App} />
      <Route
        render={props => (
          <Redirect to={`/${currentLanguage}${props.location.pathname}`} />
        )}
      />
    </Switch>
  );
};

export default AppRoutes;
