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
  const banner = async (
    banner: BannerPageFieldsFragment,
    type: 'top' | 'bottom'
  ) => {
    const withinBanner = () => {
      t.ctx.withinTestId = `${type}-banner`;
      return within(screen.getByTestId(`${type}-banner`));
    };
    const selectors = {
      banner() {
        t.ctx.expectedBannerType = type;
        t.ctx.expectedBanner = {
          title: banner.title.fi,
          description: banner.description.fi,
        };
        return screen.findByTestId(`${type}-banner`);
      },
      title() {
        t.ctx.findByRole = [
          'heading',
          { name: regExpEscaped(banner.title.fi) },
        ];
        return withinBanner().findByRole.apply(null, t.ctx.findByRole);
      },
      buttonLink() {
        t.ctx.findByRole = [
          'button',
          { name: regExpEscaped(banner.buttonText.fi) },
        ];
        return withinBanner().findByRole.apply(null, t.ctx.findByRole);
      },
      descriptionText() {
        t.ctx.findByText = regExpEscaped(banner.description.fi);
        return withinBanner().findByText(t.ctx.findByText);
      },
    };
    const bannerTitleIsVisible = async () => {
      await t.expect(selectors.title().exists).ok(await getErrorMessage(t));
    };
    const bannerButtonIsVisible = async () => {
      await t
        .expect(selectors.buttonLink().exists)
        .ok(await getErrorMessage(t));
    };
    const bannerDescriptionIsVisible = async () => {
      await t
        .expect(selectors.descriptionText().exists)
        .ok(await getErrorMessage(t));
    };
    const expectations = {
      async isBannerPresent() {
        await t.expect(selectors.banner().exists).ok(await getErrorMessage(t));
      },
      async bannerDataIsPresent() {
        await bannerTitleIsVisible();
        await bannerButtonIsVisible();
        await bannerDescriptionIsVisible();
      },
    };
    const actions = {
      async clickButtonLink() {
        await t.click(selectors.buttonLink());
      },
    };
    await expectations.isBannerPresent();
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

  const collectionCard = async (collection: CollectionFieldsFragment) => {
    const withinCollectionCard = () => {
      t.ctx.withinTestId = collection.id;
      return within(screen.getByTestId(t.ctx.withinTestId));
    };
    const selectors = {
      collectionCard() {
        return screen.findByTestId(collection.id);
      },
      collectionTitle() {
        t.ctx.findByLabelText = regExpEscaped(collection.title.fi);
        return withinCollectionCard().findByLabelText(t.ctx.findByLabelText);
      },
    };
    const expectations = {
      async collectionCardIsPresent() {
        await t
          .expect(selectors.collectionCard().exists)
          .ok(await getErrorMessage(t));
      },
      async collectionTitleIsPresent() {
        await t
          .expect(selectors.collectionTitle().exists)
          .ok(await getErrorMessage(t));
      },
    };
    const actions = {
      async clickCollectionLink() {
        await t.click(selectors.collectionTitle());
      },
    };
    await expectations.collectionCardIsPresent();
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
