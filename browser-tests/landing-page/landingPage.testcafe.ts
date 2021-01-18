import { landingPageDataSource } from '../datasources/landingPageDataSource';
import { getEnvUrl } from '../utils/settings';
import { getUrlUtils } from '../utils/url.utils';
import { getLandingPageComponents } from './landingPage.components';

let components: ReturnType<typeof getLandingPageComponents>;
let urlUtils: ReturnType<typeof getUrlUtils>;

fixture('Landing page')
  .page(getEnvUrl('/fi/home'))
  .beforeEach(async (t) => {
    components = getLandingPageComponents(t);
    urlUtils = getUrlUtils(t);
  });

test('banner data is present and links work', async () => {
  const {
    bottomBanner,
    topBanner,
  } = await landingPageDataSource.getLandingPageCmsData();
  const topBannerComponent = components.topBanner(topBanner);
  await topBannerComponent.expectations.bannerDataIsVisible();
  await topBannerComponent.actions.clickButtonLink();
  await urlUtils.expectations.urlChangedToBannerPage(topBanner);
  await urlUtils.actions.navigateToLandingPage();
  const bottomBannerComponent = components.bottomBanner(bottomBanner);
  await bottomBannerComponent.expectations.bannerDataIsVisible();
  await bottomBannerComponent.actions.clickButtonLink();
  await urlUtils.expectations.urlChangedToBannerPage(bottomBanner);
});

test('collection urls work', async (t) => {
  const collectionList = await landingPageDataSource.getCollectionList();
  await t.expect(collectionList.length).gt(0);
  for (const collection of collectionList) {
    const collectionCard = components.collectionCard(collection);
    await collectionCard.expectations.collectionTitleIsVisible();
    await collectionCard.actions.clickCollectionLink();
    await urlUtils.expectations.urlChangedToCollectionPage(collection);
    await urlUtils.actions.navigateToLandingPage();
    await urlUtils.expectations.urlChangedToLandingPage();
  }
});
