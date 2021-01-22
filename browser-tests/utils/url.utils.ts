/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TestController, { ClientFunction } from 'testcafe';

import { getErrorMessage } from './error.util';
import {
  BannerPageFieldsFragment,
  CollectionFieldsFragment,
  EventFieldsFragment,
} from './generated/graphql';
import { getEnvUrl } from './settings';

const getPathname = ClientFunction(() => document.location.pathname);
const getUrl = ClientFunction(() => document.location.href);
const getPageTitle = ClientFunction(() => document.title);

export const getUrlUtils = (t: TestController) => {
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
      t.ctx.url = url;
      await t.navigateTo(url);
    },
  };
  const expectations = {
    async urlChangedToLandingPage() {
      await t.expect(getPathname()).eql(`/fi/home`);
    },
    async urlChangedToEventPage(event: EventFieldsFragment) {
      t.ctx.expectedEvent = event;
      await t
        .expect(getPathname())
        .eql(`/fi/event/${event.id}`, await getErrorMessage(t))
        .expect(getPageTitle())
        .eql(event.name.fi, await getErrorMessage(t));
    },
    async urlChangedToEventSearchPage() {
      await t
        .expect(getPathname())
        .eql(`/fi/events`)
        .expect(getPageTitle())
        .eql('Tapahtumat');
    },
    async urlChangedToRecommendationsPage() {
      await t
        .expect(getPathname())
        .eql(`/fi/collections`)
        .expect(getPageTitle())
        .eql('Tapahtumat');
    },
    async urlChangedToBannerPage(banner: BannerPageFieldsFragment) {
      t.ctx.banner = banner;
      await t
        .expect(getUrl())
        .eql(`${banner.buttonUrl.fi}`, await getErrorMessage(t));
    },
    async urlChangedToCollectionPage(collection: CollectionFieldsFragment) {
      t.ctx.collection = collection;
      await t
        .expect(getPathname())
        .eql(`/fi/collection/${collection.slug}`, await getErrorMessage(t))
        .expect(getPageTitle())
        .eql(collection.title.fi, await getErrorMessage(t));
    },
  };
  return {
    actions,
    expectations,
  };
};
