import { screen } from '@testing-library/testcafe';
import TestController from 'testcafe';

import { SUPPORT_LANGUAGES } from '../../src/constants';
import {
  BannerPageFieldsFragment,
  CollectionFieldsFragment,
} from '../utils/generated/graphql';

export const expectBannerDataIsPresent = async (
  t: TestController,
  { title, buttonText, description }: BannerPageFieldsFragment,
  locale = SUPPORT_LANGUAGES.FI
): Promise<void> => {
  await t
    .expect(screen.findByRole('heading', { name: title[locale] }).exists)
    .ok()
    .expect(screen.findByRole('button', { name: buttonText[locale] }).exists)
    .ok()
    .expect(screen.findByText(description[locale]).exists)
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
