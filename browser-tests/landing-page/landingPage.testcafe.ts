import { screen } from '@testing-library/testcafe';

import { SUPPORT_LANGUAGES } from '../../src/constants';
import { landingPageDataSource } from '../datasources/landingPageDataSource';
import { header } from '../selectors/header';
import { getPageTitle, getPathname, navigateBack } from '../utils/browserUtils';
import { CollectionFieldsFragment } from '../utils/generated/graphql';
import { getEnvUrl } from '../utils/settings';
import {
  expectBannerDataIsPresent,
  expectCollectionDataIsPresent,
} from './landingPage.utils';

fixture('Landing page').page(getEnvUrl('/fi/home'));

test('Changing language on landing page', async (t) => {
  await t
    .expect(screen.getAllByRole('link', { name: /etsi tekemistä/i }).count)
    .eql(2)
    .expect(screen.getAllByRole('link', { name: /suosittelemme/i }).count)
    .eql(2);

  await t
    .click(header.languageSelector)
    .click(header.languageSelectorItemSv)
    .expect(getPathname())
    .eql('/sv/home');

  await t
    .expect(screen.getAllByRole('link', { name: /sök saker att göra/i }).count)
    .eql(2)
    .expect(screen.getAllByRole('link', { name: /vi rekommenderar/i }).count)
    .eql(2);
});

test('topBanner, collections and bottomBanner data are present', async (t) => {
  const {
    topBanner,
    bottomBanner,
  } = await landingPageDataSource.getLandingPageCmsData();
  const collectionList = await landingPageDataSource.getCollectionList();
  await expectBannerDataIsPresent(t, topBanner);
  await expectCollectionDataIsPresent(t, collectionList);
  await expectBannerDataIsPresent(t, bottomBanner);
});

test('collection urls work', async (t) => {
  const collectionList = await landingPageDataSource.getCollectionList();
  await t.expect(collectionList.length).gt(0);
  for (const collection of collectionList) {
    await navigateToCollectionPageAndBack(t, collection);
  }
});

const navigateToCollectionPageAndBack = async (
  t,
  collection: CollectionFieldsFragment,
  locale = SUPPORT_LANGUAGES.FI
) => {
  const {
    title: { [locale]: collectionTitle },
    slug,
  } = collection;
  await t
    .click(screen.getAllByLabelText(new RegExp(collectionTitle)))
    .expect(getPathname())
    .eql(`/${locale}/collection/${slug}`)
    .expect(getPageTitle())
    .eql(collectionTitle);
  await navigateBack();
  await t.expect(getPathname()).eql(`/${locale}/home`);
};
