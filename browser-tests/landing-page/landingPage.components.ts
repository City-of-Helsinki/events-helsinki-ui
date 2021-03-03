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
  setDataToPrintOnFailure,
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
    setDataToPrintOnFailure(t, 'expectedBannerType', type);
    setDataToPrintOnFailure(t, 'expectedBanner', {
      title: banner.title.fi,
      description: banner.description.fi,
    });
    await t
      .expect(screen.findByTestId(`${type}-banner`).exists)
      .ok(await getErrorMessage(t));

    const withinBanner = () => within(screen.getByTestId(`${type}-banner`));

    const selectors = {
      title() {
        const findByRole = [
          'heading',
          { name: regExpEscaped(banner.title.fi) },
        ];
        setDataToPrintOnFailure(t, 'findByRole', findByRole);
        return withinBanner().findByRole.apply(null, findByRole);
      },
      buttonLink() {
        const findByRole = [
          'button',
          { name: regExpEscaped(banner.buttonText.fi) },
        ];
        setDataToPrintOnFailure(t, 'findByRole', findByRole);
        return withinBanner().findByRole.apply(null, findByRole);
      },
      descriptionText() {
        const findByText = regExpEscaped(banner.description.fi);
        setDataToPrintOnFailure(t, 'findByText', findByText);
        return withinBanner().findByText(findByText);
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
        const text = regExpEscaped(collection.title.fi);
        setDataToPrintOnFailure(t, 'findByLabelText', text);
        return withinCollectionCard().findByLabelText(text);
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
