import { SUPPORT_LANGUAGES } from '../../src/constants';
import { isFeatureEnabled } from '../../src/util/featureFlags';
import { requestLogger } from '../utils/requestLogger';
import { getEnvUrl } from '../utils/settings';
import { clearDataToPrintOnFailure } from '../utils/testcafe.utils';
import { getUrlUtils } from '../utils/url.utils';
import { findHeader } from './header.components';

let urlUtils: ReturnType<typeof getUrlUtils>;

fixture('Landing page header')
  .page(getEnvUrl('/fi/home'))
  .beforeEach(async (t) => {
    clearDataToPrintOnFailure(t);
    urlUtils = getUrlUtils(t);
  })
  .requestHooks(requestLogger)
  .afterEach(async () => {
    requestLogger.clear();
  });

test('Changing language on landing page', async (t) => {
  const header = await findHeader(t);
  const headerTabs = header.headerTabs();
  const languageSelector = header.languageSelector();
  await headerTabs.expectations.eventSearchPageTabIsVisible();
  if (isFeatureEnabled('EVENTS_HELSINKI_2')) {
    await headerTabs.expectations.courseSearchPageTabIsVisible();
  }
  await headerTabs.expectations.recommendationsPageTabIsVisible();

  await languageSelector.actions.changeLanguage(SUPPORT_LANGUAGES.SV);

  await headerTabs.expectations.eventSearchPageTabIsVisible();
  if (isFeatureEnabled('EVENTS_HELSINKI_2')) {
    await headerTabs.expectations.courseSearchPageTabIsVisible();
  }
  await headerTabs.expectations.recommendationsPageTabIsVisible();
});

test('Event search page is navigable from landing page header', async (t) => {
  const header = await findHeader(t);
  const headerTabs = header.headerTabs();
  await headerTabs.actions.clickEventSearchPageTab();
  await urlUtils.expectations.urlChangedToEventSearchPage();
});
if (isFeatureEnabled('EVENTS_HELSINKI_2')) {
  test('Course search page is navigable from landing page header', async (t) => {
    const header = await findHeader(t);
    const headerTabs = header.headerTabs();
    await headerTabs.actions.clickCourseSearchPageTab();
    await urlUtils.expectations.urlChangedToCourseSearchPage();
  });
}
test('Recommended page is navigable from landing page header', async (t) => {
  const header = await findHeader(t);
  const headerTabs = header.headerTabs();
  await headerTabs.actions.clickRecommendationsPageTab();
  await urlUtils.expectations.urlChangedToRecommendationsPage();
});
