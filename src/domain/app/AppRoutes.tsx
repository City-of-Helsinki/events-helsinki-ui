import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch } from 'react-router';

import { MobileMenuProvider } from '../../common/components/mobileMenu/MobileMenu';
import { ResetFocus } from '../../common/route/RouteUtils';
import { getCurrentLanguage } from '../../common/translation/TranslationUtils';
import { SUPPORT_LANGUAGES } from '../../constants';
import PageLayout from '../app/layout/PageLayout';
import App from './App';

const localeParam = `:locale(${SUPPORT_LANGUAGES.EN}|${SUPPORT_LANGUAGES.FI}|${SUPPORT_LANGUAGES.SV})`;

const AppRoutes = () => {
  const { i18n } = useTranslation();
  const currentLanguage = getCurrentLanguage(i18n);

  return (
    <MobileMenuProvider>
      <ResetFocus />
      <PageLayout>
        <Switch>
          <Redirect
            exact
            path={`/${localeParam}`}
            to={`/${localeParam}/home`}
          />
          <Route path={`/${localeParam}/*`} component={App} />
          <Route
            render={props => (
              <Redirect to={`/${currentLanguage}${props.location.pathname}`} />
            )}
          />
        </Switch>
      </PageLayout>
    </MobileMenuProvider>
  );
};

export default AppRoutes;
