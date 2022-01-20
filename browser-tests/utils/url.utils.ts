/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TestController, { ClientFunction } from 'testcafe';

import { getCommonComponents } from '../common.components';
import {
  BannerPageFieldsFragment,
  CollectionFieldsFragment,
  EventFieldsFragment,
} from './generated/graphql';
import { getEnvUrl } from './settings';
import { getErrorMessage, setDataToPrintOnFailure } from './testcafe.utils';

const getPathname = ClientFunction(() => document.location.pathname);
const getUrl = ClientFunction(() => document.location.href);
const getPageTitle = ClientFunction(() => document.title);

export const getUrlUtils = (t: TestController) => {
  const pageIsLoaded = async () => {
    await getCommonComponents(t).loadingSpinner().expectations.isNotPresent();
  };

  const actions = {
    async navigateToLandingPage() {
      await t.navigateTo(getEnvUrl(`/fi/home`));
    },
    async navigateToLandingPreviewPage(pageId) {
      await t.navigateTo(getEnvUrl(`/fi/home/${pageId}`));
    },
    async navigateToSearchUrl(searchString: string) {
      const url = getEnvUrl(
        `/fi/events?text=${encodeURIComponent(searchString)}`
      );
      setDataToPrintOnFailure(t, 'url', url);
      await t.navigateTo(url);
    },
  };
  const expectations = {
    async urlChangedToLandingPage() {
      await t.expect(getPathname()).eql(`/fi/home`, await getErrorMessage(t));
    },
    async urlChangedToEventPage(event: EventFieldsFragment) {
      setDataToPrintOnFailure(t, 'expectedEvent', event);
      await t
        .expect(getPathname())
        .eql(`/fi/events/${event.id}`, await getErrorMessage(t));
      await pageIsLoaded();
      await t
        .expect(getPageTitle())
        .eql(event.name.fi, await getErrorMessage(t));
    },
    async urlChangedToEventSearchPage() {
      await t.expect(getPathname()).eql(`/fi/events`, await getErrorMessage(t));

      await pageIsLoaded();
      await t
        .expect(getPageTitle())
        .contains('Tapahtumat', await getErrorMessage(t));
    },
    async urlChangedToRecommendationsPage() {
      await t
        .expect(getPathname())
        .eql(`/fi/collections`, await getErrorMessage(t));
      await pageIsLoaded();
      await t
        .expect(getPageTitle())
        .contains('Tapahtumat', await getErrorMessage(t));
    },
    async urlChangedToBannerPage(banner: BannerPageFieldsFragment) {
      setDataToPrintOnFailure(t, 'banner', banner);
      await pageIsLoaded();
      await t
        .expect(getUrl())
        .eql(`${banner.buttonUrl.fi}`, await getErrorMessage(t));
    },
    async urlChangedToCollectionPage(collection: CollectionFieldsFragment) {
      setDataToPrintOnFailure(t, 'collection', collection);
      await pageIsLoaded();
      await t
        .expect(getPathname())
        .eql(
          `/fi/collection/${encodeURIComponent(collection.slug)}`,
          await getErrorMessage(t)
        )
        .expect(getPageTitle())
        .eql(collection.title.fi, await getErrorMessage(t));
    },
  };
  return {
    actions,
    expectations,
  };
};
