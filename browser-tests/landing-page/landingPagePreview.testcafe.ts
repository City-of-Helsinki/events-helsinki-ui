import { landingPageDataSource } from '../datasources/landingPageDataSource';
import { getEnvUrl } from '../utils/settings';
import { getUrlUtils } from '../utils/url.utils';
import { getLandingPageComponents } from './landingPage.components';

let components: ReturnType<typeof getLandingPageComponents>;
let urlUtils: ReturnType<typeof getUrlUtils>;

fixture('Landing page preview')
  .page(getEnvUrl('/fi/home'))
  .beforeEach(async (t) => {
    components = getLandingPageComponents(t);
    urlUtils = getUrlUtils(t);
    t.ctx = {};
  });

test('banner data is present and links work', async () => {
  const {
    bottomBanner,
    topBanner,
    id: pageId,
  } = await landingPageDataSource.getLandingPageCmsData();
  await urlUtils.actions.navigateToLandingPreviewPage(pageId);
  const topBannerComponent = components.topBanner(topBanner);
  await topBannerComponent.expectations.bannerDataIsVisible();
  await topBannerComponent.actions.clickButtonLink();
  await urlUtils.expectations.urlChangedToBannerPage(topBanner);
  await urlUtils.actions.navigateToLandingPreviewPage(pageId);
  const bottomBannerComponent = components.bottomBanner(bottomBanner);
  await bottomBannerComponent.expectations.bannerDataIsVisible();
  await bottomBannerComponent.actions.clickButtonLink();
  await urlUtils.expectations.urlChangedToBannerPage(bottomBanner);
});
