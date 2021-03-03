import { landingPageDataSource } from '../datasources/landingPageDataSource';
import { getEnvUrl } from '../utils/settings';
import { clearDataToPrintOnFailure } from '../utils/testcafe.utils';
import { getUrlUtils } from '../utils/url.utils';
import { getLandingPageComponents } from './landingPage.components';

let components: ReturnType<typeof getLandingPageComponents>;
let urlUtils: ReturnType<typeof getUrlUtils>;

fixture('Landing page')
  .page(getEnvUrl('/fi/home'))
  .beforeEach(async (t) => {
    clearDataToPrintOnFailure(t);
    components = getLandingPageComponents(t);
    urlUtils = getUrlUtils(t);
  });

test('banner data is present and links work', async () => {
  const {
    bottomBanner,
    topBanner,
  } = await landingPageDataSource.getLandingPageCmsData();
  const topBannerComponent = await components.topBanner(topBanner);
  await topBannerComponent.expectations.bannerDataIsPresent();
  await topBannerComponent.actions.clickButtonLink();
  await urlUtils.expectations.urlChangedToBannerPage(topBanner);
  await urlUtils.actions.navigateToLandingPage();
  const bottomBannerComponent = await components.bottomBanner(bottomBanner);
  await bottomBannerComponent.expectations.bannerDataIsPresent();
  await bottomBannerComponent.actions.clickButtonLink();
  await urlUtils.expectations.urlChangedToBannerPage(bottomBanner);
});

test('collection urls work', async (t) => {
  const collectionList = await landingPageDataSource.getCollectionList();
  await t.expect(collectionList.length).gt(0);
  for (const collection of collectionList) {
    const collectionCard = await components.collectionCard(collection);
    await collectionCard.expectations.collectionTitleIsPresent();
    await collectionCard.actions.clickCollectionLink();
    await urlUtils.expectations.urlChangedToCollectionPage(collection);
    await urlUtils.actions.navigateToLandingPage();
    await urlUtils.expectations.urlChangedToLandingPage();
  }
});
