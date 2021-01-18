import { landingPageDataSource } from '../datasources/landingPageDataSource';
import { getEnvUrl } from '../utils/settings';
import { getLandingPageActions } from './landingPage.actions';
import { getLandingPageExpectations } from './landingPage.expectations';

let actions: ReturnType<typeof getLandingPageActions>;
let expectations: ReturnType<typeof getLandingPageExpectations>;

fixture('Landing Page Preview')
  .page(getEnvUrl('/fi/home'))
  .beforeEach(async (t) => {
    actions = getLandingPageActions(t);
    expectations = getLandingPageExpectations(t);
  });

test('topBanner and bottomBanner data are present', async (t) => {
  const {
    id,
    topBanner,
    bottomBanner,
  } = await landingPageDataSource.getLandingPageCmsData();
  await t.navigateTo(getEnvUrl(`fi/home/${id}`));
  await expectations.withinBanner(topBanner, 'top').bannerDataIsVisible();
  await expectations.withinBanner(bottomBanner, 'bottom').bannerDataIsVisible();
});

test('top banner url work', async () => {
  const { topBanner } = await landingPageDataSource.getLandingPageCmsData();
  await actions.navigateToBannerUrl(topBanner, 'top');
});

test('bottom banner url work', async () => {
  const { bottomBanner } = await landingPageDataSource.getLandingPageCmsData();
  await actions.navigateToBannerUrl(bottomBanner, 'bottom');
});
