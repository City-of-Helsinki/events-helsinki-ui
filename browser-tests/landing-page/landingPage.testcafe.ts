import { landingPageDataSource } from '../datasources/landingPageDataSource';
import { getEnvUrl } from '../utils/settings';
import { getLandingPageActions } from './landingPage.actions';
import { getLandingPageExpectations } from './landingPage.expectations';

let actions: ReturnType<typeof getLandingPageActions>;
let expectations: ReturnType<typeof getLandingPageExpectations>;

fixture('Landing page')
  .page(getEnvUrl('/fi/home'))
  .beforeEach(async (t) => {
    actions = getLandingPageActions(t);
    expectations = getLandingPageExpectations(t);
  });

test('topBanner, collections and bottomBanner data are present', async (t) => {
  const {
    topBanner,
    bottomBanner,
  } = await landingPageDataSource.getLandingPageCmsData();
  const collectionList = await landingPageDataSource.getCollectionList();
  await expectations.withinBanner(topBanner, 'top').bannerDataIsVisible();
  await expectations.collectionsAreVisible(collectionList);
  await expectations.withinBanner(bottomBanner, 'bottom').bannerDataIsVisible();
});

test('collection urls work', async (t) => {
  const collectionList = await landingPageDataSource.getCollectionList();
  await t.expect(collectionList.length).gt(0);
  for (const collection of collectionList) {
    await actions.navigateToCollectionAndBack(collection);
  }
});

test('top banner url work', async () => {
  const { topBanner } = await landingPageDataSource.getLandingPageCmsData();
  await actions.navigateToBannerUrl(topBanner, 'top');
});

test('bottom banner url work', async () => {
  const { bottomBanner } = await landingPageDataSource.getLandingPageCmsData();
  await actions.navigateToBannerUrl(bottomBanner, 'bottom');
});
