import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";

import { SUPPORT_LANGUAGES } from "../../constants";
import CollectionPageContainer from "../collection/CollectionPageContainer";
import CollectionListPage from "../collectionList/CollectionListPage";
import EventPageContainer from "../event/EventPageContainer";
import EventSearchPageContainer from "../eventSearch/EventSearchPageContainer";
import LandingPage from "../landingPage/LandingPage";
import LandingPagePreview from "../landingPage/LandingPagePreview";
import NotFound from "../notFound/NotFound";

const App: FunctionComponent<
  RouteComponentProps<{
    locale: SUPPORT_LANGUAGES;
  }>
> = ({
  match: {
    params: { locale }
  }
}) => {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);

  return (
    <Switch>
      <Redirect exact path={`/${locale}/`} to={`/${locale}/home`} />
      <Route exact path={`/${locale}/home`} component={LandingPage} />
      <Route
        exact
        path={`/${locale}/home/:id`}
        component={LandingPagePreview}
      />
      <Route
        exact
        path={`/${locale}/collections`}
        component={CollectionListPage}
      />
      <Route
        exact
        path={`/${locale}/collection/:id`}
        component={CollectionPageContainer}
      />
      <Route
        exact
        path={`/${locale}/events`}
        component={EventSearchPageContainer}
      />
      <Route
        exact
        path={`/${locale}/event/:id`}
        component={EventPageContainer}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default App;
