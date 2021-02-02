import { landingPageDataSource } from '../datasources/landingPageDataSource';
import { getEnvUrl } from '../utils/settings';
import { clearContext } from '../utils/testcafe.utils';
import { getUrlUtils } from '../utils/url.utils';
import { getLandingPageComponents } from './landingPage.components';

let components: ReturnType<typeof getLandingPageComponents>;
let urlUtils: ReturnType<typeof getUrlUtils>;

fixture('Landing page preview')
  .page(getEnvUrl('/fi/home'))
  .beforeEach(async (t) => {
    clearContext(t);
    components = getLandingPageComponents(t);
    urlUtils = getUrlUtils(t);
  });

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
  const bottomBannerComponent = await components.bottomBanner(bottomBanner);
  await bottomBannerComponent.expectations.bannerDataIsPresent();
  await bottomBannerComponent.actions.clickButtonLink();
  await urlUtils.expectations.urlChangedToBannerPage(bottomBanner);
});
