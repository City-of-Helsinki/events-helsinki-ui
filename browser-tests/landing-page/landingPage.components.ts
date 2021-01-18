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
    t.ctx.banner = banner;
    t.ctx.bannerType = type;
    const component = () => within(screen.getByTestId(`${type}-banner`));
    const selectors = {
      title() {
        return component().getByRole('heading', {
          name: regExpEscaped(banner.title.fi),
        });
      },
      buttonLink() {
        return component().getByRole('button', {
          name: regExpEscaped(banner.buttonText.fi),
        });
      },
      descriptionText() {
        return component().getByText(regExpEscaped(banner.description.fi));
      },
    };
    const actions = {
      async clickButtonLink() {
        return await t.click(selectors.buttonLink());
      },
    };
    const expectations = {
      async bannerTitleIsVisible() {
        await t.expect(selectors.title().exists).ok(getErrorMessage(t));
      },
      async bannerButtonIsVisible() {
        await t.expect(selectors.buttonLink().exists).ok(getErrorMessage(t));
      },
      async bannerDescriptionIsVisible() {
        await t
          .expect(selectors.descriptionText().exists)
          .ok(getErrorMessage(t));
      },
      async bannerDataIsVisible() {
        await this.bannerTitleIsVisible();
        await this.bannerButtonIsVisible();
        await this.bannerDescriptionIsVisible();
      },
    };
    return {
      selectors,
      actions,
      expectations,
    };
  };
  const topBanner = (bannerData: BannerPageFieldsFragment) =>
    banner(bannerData, 'top');
  const bottomBanner = (bannerData: BannerPageFieldsFragment) =>
    banner(bannerData, 'bottom');

  const collectionCard = (collection: CollectionFieldsFragment) => {
    const component = () => within(screen.getByTestId(collection.id));
    const selectors = {
      collectionTitle() {
        return component().getByLabelText(regExpEscaped(collection.title.fi));
      },
    };
    const actions = {
      async clickCollectionLink() {
        await t.click(selectors.collectionTitle());
      },
    };
    const expectations = {
      async collectionTitleIsVisible() {
        await t
          .expect(selectors.collectionTitle().exists)
          .ok(getErrorMessage(t));
      },
    };
    return {
      selectors,
      actions,
      expectations,
    };
  };
  return {
    topBanner,
    bottomBanner,
    collectionCard,
  };
};
