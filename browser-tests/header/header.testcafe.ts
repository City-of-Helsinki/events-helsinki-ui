import { SUPPORT_LANGUAGES } from '../../src/constants';
import { getEnvUrl } from '../utils/settings';
import { getUrlUtils } from '../utils/url.utils';
import { getHeaderComponents } from './header.components';

let components: ReturnType<typeof getHeaderComponents>;
let urlUtils: ReturnType<typeof getUrlUtils>;

fixture('Landing page header')
  .page(getEnvUrl('/fi/home'))
  .beforeEach(async (t) => {
    components = getHeaderComponents(t);
    urlUtils = getUrlUtils(t);
    t.ctx = {};
  });

test('Changing language on landing page', async () => {
  const headerTabs = await components.headerTabs();
  const languageSelector = await components.languageSelector();
  await headerTabs.expectations.eventSearchPageTabIsVisible();
  await headerTabs.expectations.recommendationsPageTabIsVisible();

  await languageSelector.actions.changeLanguage(SUPPORT_LANGUAGES.SV);

  await headerTabs.expectations.eventSearchPageTabIsVisible();
  await headerTabs.expectations.recommendationsPageTabIsVisible();
});

test('Event search page is navigable from landing page header', async () => {
  const headerTabs = await components.headerTabs();
  await headerTabs.actions.clickEventSearchPageTab();
  await urlUtils.expectations.urlChangedToEventSearchPage();
});

test('Recommended page is navigable from landing page header', async () => {
  const headerTabs = await components.headerTabs();
  await headerTabs.actions.clickRecommendationsPageTab();
  await urlUtils.expectations.urlChangedToRecommendationsPage();
});
