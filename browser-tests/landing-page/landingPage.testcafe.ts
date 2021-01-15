import { screen } from '@testing-library/testcafe';

import { landingPageDataSource } from '../datasources/landingPageDataSource';
import { header } from '../selectors/header';
import { getPageTitle, getPathname } from '../utils/browserUtils';
import { getEnvUrl } from '../utils/settings';
import {
  expectBannerDataIsPresent,
  expectCollectionDataIsPresent,
  navigateToBannerUrl,
  navigateToCollectionPageAndBack,
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

test('Event search page is navigable from landing page header', async (t) => {
  await t
    .click(screen.findAllByRole('link', { name: 'Etsi tekemistä' }))
    .expect(getPathname())
    .eql(`/fi/events`)
    .expect(getPageTitle())
    .eql('Tapahtumat');
});

test('Recommended page is navigable from landing page header', async (t) => {
  await t
    .click(screen.findAllByRole('link', { name: 'Suosittelemme' }))
    .expect(getPathname())
    .eql(`/fi/collections`)
    .expect(getPageTitle())
    .eql('Tapahtumat');
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

test('top banner url work', async (t) => {
  const { topBanner } = await landingPageDataSource.getLandingPageCmsData();
  await navigateToBannerUrl(t, topBanner);
});

test('bottom banner url work', async (t) => {
  const { bottomBanner } = await landingPageDataSource.getLandingPageCmsData();
  await navigateToBannerUrl(t, bottomBanner);
});
