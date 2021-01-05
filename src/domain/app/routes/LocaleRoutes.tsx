import '../../../assets/styles/main.scss';
import 'hds-core/lib/base.css';
import 'hds-core/lib/components/all.css';

import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';

import { SUPPORT_LANGUAGES } from '../../../constants';
import AboutPage from '../../about/AboutPage';
import AccessbilityPage from '../../accessibility/AccessbilityPage';
import CollectionPageContainer from '../../collection/CollectionPageContainer';
import CollectionListPage from '../../collectionList/CollectionListPage';
import CoursePageContainer from '../../course/CoursePageContainer';
import CourseSearchPageContainer from '../../courseSearch/CourseSearchPageContainer';
import EventPageContainer from '../../event/EventPageContainer';
import EventSearchPageContainer from '../../eventSearch/EventSearchPageContainer';
import LandingPage from '../../landingPage/FrontPage';
import LandingPagePreview from '../../landingPage/LandingPagePreview';
import NotFound from '../../notFound/NotFound';
import { ROUTES } from './constants';

const App: FunctionComponent<RouteComponentProps<{
  locale: SUPPORT_LANGUAGES;
}>> = ({
  match: {
    params: { locale },
  },
}) => {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);

  return (
    <Switch>
      <Redirect exact path={`/${locale}/`} to={`/${locale}${ROUTES.HOME}`} />
      <Route exact path={`/${locale}${ROUTES.HOME}`} component={LandingPage} />
      <Route
        exact
        path={`/${locale}${ROUTES.HOME_PREVIEW}`}
        component={LandingPagePreview}
      />
      <Route exact path={`/${locale}${ROUTES.ABOUT}`} component={AboutPage} />
      <Route
        exact
        path={`/${locale}${ROUTES.ACCESSIBILITY}`}
        component={AccessbilityPage}
      />
      <Route
        exact
        path={`/${locale}${ROUTES.COLLECTIONS}`}
        component={CollectionListPage}
      />
      <Route
        exact
        path={`/${locale}${ROUTES.COLLECTION}`}
        component={CollectionPageContainer}
      />
      <Route
        exact
        path={`/${locale}${ROUTES.EVENTS}`}
        component={EventSearchPageContainer}
      />
      <Route
        exact
        path={`/${locale}${ROUTES.EVENT}`}
        component={EventPageContainer}
      />
      <Route
        exact
        path={`/${locale}${ROUTES.EVENT_PLACE}`}
        component={EventSearchPageContainer}
      />
      <Route
        exact
        path={`/${locale}${ROUTES.COURSES}`}
        component={CourseSearchPageContainer}
      />
      <Route
        exact
        path={`/${locale}${ROUTES.COURSE}`}
        component={CoursePageContainer}
      />
      {/* Redirect to next single event page url */}
      <Redirect
        exact
        path={`/${locale}${ROUTES.EVENT_DEPRECATED}`}
        to={`/${locale}${ROUTES.EVENT}`}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default App;
