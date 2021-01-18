/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TestController from 'testcafe';

import {
  getPageTitle,
  getPathname,
  getUrl,
  navigateBack,
} from '../utils/browserUtils';
import {
  BannerPageFieldsFragment,
  CollectionFieldsFragment,
} from '../utils/generated/graphql';
import { landingPageSelectors } from './landingPage.selectors';
export const getLandingPageActions = (t: TestController) => {
  return {
    async navigateToCollectionAndBack(collection: CollectionFieldsFragment) {
      await t
        .click(landingPageSelectors.collectionTitle(collection))
        .expect(getPathname())
        .eql(`/fi/collection/${collection.slug}`)
        .expect(getPageTitle())
        .eql(collection.title.fi);
      await navigateBack();
      await t.expect(getPathname()).eql(`/fi/home`);
    },
    async navigateToBannerUrl(
      banner: BannerPageFieldsFragment,
      location: 'top' | 'bottom'
    ) {
      await t
        .click(landingPageSelectors.withinBanner(banner, location).buttonLink())
        .expect(getUrl())
        .eql(`${banner.buttonUrl.fi}`);
    },
  };
};
