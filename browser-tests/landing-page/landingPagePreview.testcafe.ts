import { landingPageDataSource } from '../datasources/landingPageDataSource';
import { requestLogger } from '../utils/requestLogger';
import { getEnvUrl } from '../utils/settings';
import { clearDataToPrintOnFailure } from '../utils/testcafe.utils';
import { getUrlUtils } from '../utils/url.utils';
import { getLandingPageComponents } from './landingPage.components';

let components: ReturnType<typeof getLandingPageComponents>;
let urlUtils: ReturnType<typeof getUrlUtils>;

fixture('Landing page preview')
  .page(getEnvUrl('/fi/home'))
  .beforeEach(async (t) => {
    clearDataToPrintOnFailure(t);
    components = getLandingPageComponents(t);
    urlUtils = getUrlUtils(t);
  })
  .afterEach(async () => {
    requestLogger.clear();
  })
  .requestHooks(requestLogger);

test('banner data is present and links work', async () => {
  const {
    bottomBanner,
    topBanner,
    id: pageId,
  } = await landingPageDataSource.getLandingPageCmsData();
  await urlUtils.actions.navigateToLandingPreviewPage(pageId);
  const topBannerComponent = await components.topBanner(topBanner);
  await topBannerComponent.expectations.bannerDataIsPresent();
  await topBannerComponent.actions.clickButtonLink();
  await urlUtils.expectations.urlChangedToBannerPage(topBanner);
  await urlUtils.actions.navigateToLandingPreviewPage(pageId);
  // bottom banner is not mandatory, not in use in production for example. Test it only if data exists
  if (bottomBanner) {
    const bottomBannerComponent = await components.bottomBanner(bottomBanner);
    await bottomBannerComponent.expectations.bannerDataIsPresent();
    await bottomBannerComponent.actions.clickButtonLink();
    await urlUtils.expectations.urlChangedToBannerPage(bottomBanner);
  }
});
