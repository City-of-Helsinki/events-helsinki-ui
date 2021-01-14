import { landingPageDataSource } from '../datasources/landingPageDataSource';
import { getEnvUrl } from '../utils/settings';
import { expectBannerDataIsPresent } from './landingPage.utils';

fixture('Landing Page Preview').page(getEnvUrl('/fi/home'));

test('topBanner and bottomBanner data are present', async (t) => {
  const {
    id,
    topBanner,
    bottomBanner,
  } = await landingPageDataSource.getLandingPageCmsData();
  await t.navigateTo(getEnvUrl(`fi/home/${id}`));
  await expectBannerDataIsPresent(t, topBanner);
  await expectBannerDataIsPresent(t, bottomBanner);
});
