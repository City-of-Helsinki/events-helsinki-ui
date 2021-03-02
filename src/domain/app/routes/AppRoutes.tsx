import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch } from 'react-router';

import { getCurrentLanguage } from '../../../common/translation/TranslationUtils';
import { SUPPORT_LANGUAGES } from '../../../constants';
import { ROUTES } from './constants';
import App from './LocaleRoutes';

const localeParam = `:locale(${SUPPORT_LANGUAGES.EN}|${SUPPORT_LANGUAGES.FI}|${SUPPORT_LANGUAGES.SV})`;

const AppRoutes: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = getCurrentLanguage(i18n);

  return (
    <Switch>
      {/* Redirect '/' straight to '/:locale/home' to avoid multiple redirections */}
      <Redirect exact path="/" to={`/${locale}${ROUTES.HOME}`} />
      <Redirect exact path={`/${locale}`} to={`/${locale}${ROUTES.HOME}`} />
      <Route path={`/${localeParam}`} component={App} />
      <Route
        render={(props) => (
          // Add locale to path if is is missing
          <Redirect to={`/${locale}${props.location.pathname}`} />
        )}
      />
    </Switch>
  );
};

export default AppRoutes;
