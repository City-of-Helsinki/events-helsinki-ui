import { screen } from '@testing-library/testcafe';
import TestController from 'testcafe';

import { SUPPORT_LANGUAGES } from '../../src/constants';
import {
  BannerPageFieldsFragment,
  CollectionFieldsFragment,
} from '../utils/generated/graphql';

export const expectBannerDataIsPresent = async (
  t: TestController,
  banner: BannerPageFieldsFragment,
  locale = SUPPORT_LANGUAGES.FI
): Promise<void> => {
  await t
    .expect(
      screen.getAllByRole('heading', { name: banner.title[locale] }).exists
    )
    .ok()
    .expect(
      screen.getAllByRole('button', { name: banner.buttonText[locale] }).exists
    )
    .ok()
    .expect(screen.findByText(banner.description[locale]).exists)
    .ok();
};

export const expectCollectionDataIsPresent = async (
  t: TestController,
  collectionList: CollectionFieldsFragment[],
  locale = SUPPORT_LANGUAGES.FI
): Promise<void> => {
  await t.expect(collectionList.length).gt(0);
  for (const { title } of collectionList) {
    await t
      .expect(screen.getAllByLabelText(new RegExp(title[locale])).exists)
      .ok();
  }
};
