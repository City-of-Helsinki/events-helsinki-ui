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
    t.ctx.expectedBanner = {
      title: banner.title.fi,
      description: banner.description.fi,
    };
    const selectors = {
      component() {
        return screen.findByTestId(`${type}-banner`);
      },
      withinComponent() {
        t.ctx.withinTestId = `${type}-banner`;
        return within(screen.getByTestId(`${type}-banner`));
      },
      title() {
        t.ctx.findByRole = [
          'heading',
          { name: regExpEscaped(banner.title.fi) },
        ];
        return this.withinComponent().findByRole.apply(null, t.ctx.findByRole);
      },
      buttonLink() {
        t.ctx.findByRole = [
          'button',
          { name: regExpEscaped(banner.buttonText.fi) },
        ];
        return this.withinComponent().findByRole.apply(null, t.ctx.findByRole);
      },
      descriptionText() {
        t.ctx.findByText = regExpEscaped(banner.description.fi);
        return this.withinComponent().findByText(t.ctx.findByText);
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
        t.ctx.withinTestId = collection.id;
        return within(screen.getByTestId(t.ctx.withinTestId));
      },
      collectionTitle() {
        t.ctx.findByLabelText = regExpEscaped(collection.title.fi);
        return this.withinComponent().findByLabelText(t.ctx.findByLabelText);
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
