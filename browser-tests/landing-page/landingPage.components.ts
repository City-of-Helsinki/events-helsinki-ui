/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { screen, within } from '@testing-library/testcafe';
import TestController from 'testcafe';

import { getErrorMessage } from '../utils/error.util';
import {
  BannerPageFieldsFragment,
  CollectionFieldsFragment,
} from '../utils/generated/graphql';
import { regExpEscaped } from '../utils/regexp.util';

export const getLandingPageComponents = (t: TestController) => {
  const banner = (banner: BannerPageFieldsFragment, type: 'top' | 'bottom') => {
    t.ctx.expectedBannerType = type;
    t.ctx.expectedBanner = banner;
    const selectors = {
      component() {
        return screen.findByTestId(`${type}-banner`);
      },
      withinComponent() {
        return within(screen.getByTestId(`${type}-banner`));
      },
      title() {
        return this.withinComponent().findByRole('heading', {
          name: regExpEscaped(banner.title.fi),
        });
      },
      buttonLink() {
        return this.withinComponent().findByRole('button', {
          name: regExpEscaped(banner.buttonText.fi),
        });
      },
      descriptionText() {
        return this.withinComponent().findByText(
          regExpEscaped(banner.description.fi)
        );
      },
    };
    const expectations = {
      async isPresent() {
        await t
          .expect(selectors.component().exists)
          .ok(await getErrorMessage(t));
      },
      async bannerTitleIsVisible() {
        await this.isPresent();
        await t.expect(selectors.title().exists).ok(await getErrorMessage(t));
      },
      async bannerButtonIsVisible() {
        await this.isPresent();
        await t
          .expect(selectors.buttonLink().exists)
          .ok(await getErrorMessage(t));
      },
      async bannerDescriptionIsVisible() {
        await this.isPresent();
        await t
          .expect(selectors.descriptionText().exists)
          .ok(await getErrorMessage(t));
      },
      async bannerDataIsVisible() {
        await this.bannerTitleIsVisible();
        await this.bannerButtonIsVisible();
        await this.bannerDescriptionIsVisible();
      },
    };
    const actions = {
      async clickButtonLink() {
        await expectations.isPresent();
        await t.click(selectors.buttonLink());
      },
    };

    return {
      selectors,
      expectations,
      actions,
    };
  };
  const topBanner = (bannerData: BannerPageFieldsFragment) =>
    banner(bannerData, 'top');
  const bottomBanner = (bannerData: BannerPageFieldsFragment) =>
    banner(bannerData, 'bottom');

  const collectionCard = (collection: CollectionFieldsFragment) => {
    const selectors = {
      component() {
        return screen.findByTestId(collection.id);
      },
      withinComponent() {
        return within(screen.getByTestId(collection.id));
      },
      collectionTitle() {
        return this.withinComponent().findByLabelText(
          regExpEscaped(collection.title.fi)
        );
      },
    };
    const expectations = {
      async isPresent() {
        await t
          .expect(selectors.component().exists)
          .ok(await getErrorMessage(t));
      },
      async collectionTitleIsVisible() {
        await this.isPresent();
        await t
          .expect(selectors.collectionTitle().exists)
          .ok(await getErrorMessage(t));
      },
    };
    const actions = {
      async clickCollectionLink() {
        await expectations.isPresent();
        await t.click(selectors.collectionTitle());
      },
    };

    return {
      selectors,
      expectations,
      actions,
    };
  };
  return {
    topBanner,
    bottomBanner,
    collectionCard,
  };
};
