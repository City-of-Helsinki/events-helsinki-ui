/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TestController from 'testcafe';

import {
  BannerPageFieldsFragment,
  CollectionFieldsFragment,
} from '../utils/generated/graphql';
import { landingPageSelectors } from './landingPage.selectors';

const bannerErrorMessage = (
  banner: BannerPageFieldsFragment,
  location: 'top' | 'bottom'
): string =>
  `Expectation failed for ${location}-banner:
   ${JSON.stringify(banner, null, '\t')}`;

const collectionErrorMessage = (collection: CollectionFieldsFragment): string =>
  `Expectation failed for Collection:
   ${JSON.stringify(collection, null, '\t')}`;

export const getLandingPageExpectations = (t: TestController) => ({
  withinBanner(banner: BannerPageFieldsFragment, location: 'top' | 'bottom') {
    const errorMessage = bannerErrorMessage(banner, location);
    const findBanner = () =>
      landingPageSelectors.withinBanner(banner, location);
    return {
      async bannerTitleIsVisible() {
        await t.expect(findBanner().title().exists).ok(errorMessage);
      },
      async bannerButtonIsVisible() {
        await t.expect(findBanner().buttonLink().exists).ok(errorMessage);
      },
      async bannerDescriptionIsVisible() {
        await t.expect(findBanner().descriptionText().exists).ok(errorMessage);
      },
      async bannerDataIsVisible() {
        await this.bannerTitleIsVisible();
        await this.bannerButtonIsVisible();
        await this.bannerDescriptionIsVisible();
      },
    };
  },
  async collectionTitleIsVisible(collection: CollectionFieldsFragment) {
    await t
      .expect(landingPageSelectors.collectionTitle(collection).exists)
      .ok(collectionErrorMessage(collection));
  },
  async collectionsAreVisible(collections: CollectionFieldsFragment[]) {
    for (const collection of collections) {
      await this.collectionTitleIsVisible(collection);
    }
  },
});
