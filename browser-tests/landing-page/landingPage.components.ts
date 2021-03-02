/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TestController from 'testcafe';

import {
  BannerPageFieldsFragment,
  CollectionFieldsFragment,
} from '../utils/generated/graphql';
import { regExpEscaped } from '../utils/regexp.util';
import {
  getErrorMessage,
  screenContext,
  withinContext,
} from '../utils/testcafe.utils';

export const getLandingPageComponents = (t: TestController) => {
  const within = withinContext(t);
  const screen = screenContext(t);
  const banner = async (
    banner: BannerPageFieldsFragment,
    type: 'top' | 'bottom'
  ) => {
    t.ctx.expectedBannerType = type;
    t.ctx.expectedBanner = {
      title: banner.title.fi,
      description: banner.description.fi,
    };
    await t
      .expect(screen.findByTestId(`${type}-banner`).exists)
      .ok(await getErrorMessage(t));

    const withinBanner = () => within(screen.getByTestId(`${type}-banner`));

    const selectors = {
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
      if (banner.description.fi?.length > 0) {
        await t
          .expect(selectors.descriptionText().exists)
          .ok(await getErrorMessage(t));
      }
    };
    const expectations = {
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
    return {
      expectations,
      actions,
    };
  };
  const topBanner = (bannerData: BannerPageFieldsFragment) =>
    banner(bannerData, 'top');
  const bottomBanner = (bannerData: BannerPageFieldsFragment) =>
    banner(bannerData, 'bottom');

  const collectionCard = async (collection: CollectionFieldsFragment) => {
    const withinCollectionCard = () =>
      within(screen.getByTestId(collection.id));

    await t
      .expect(screen.findByTestId(collection.id).exists)
      .ok(await getErrorMessage(t));

    const selectors = {
      collectionTitle() {
        t.ctx.findByLabelText = regExpEscaped(collection.title.fi);
        return withinCollectionCard().findByLabelText(t.ctx.findByLabelText);
      },
    };
    const expectations = {
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
    return {
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
