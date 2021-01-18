import { SUPPORT_LANGUAGES } from '../../src/constants';
import { getHeaderActions } from '../header/header.actions';
import { getHeaderExpectations } from '../header/header.expectations';
import { getEnvUrl } from '../utils/settings';

let actions: ReturnType<typeof getHeaderActions>;
let expectations: ReturnType<typeof getHeaderExpectations>;

fixture('Landing page header')
  .page(getEnvUrl('/fi/home'))
  .beforeEach(async (t) => {
    actions = getHeaderActions(t);
    expectations = getHeaderExpectations(t);
  });

test('Changing language on landing page', async () => {
  await expectations.eventSearchPageTabIsVisible(SUPPORT_LANGUAGES.FI);
  await expectations.recommendationsPageTabIsVisible(SUPPORT_LANGUAGES.FI);
  await actions.changeLanguage(SUPPORT_LANGUAGES.FI, SUPPORT_LANGUAGES.SV);

  await expectations.eventSearchPageTabIsVisible(SUPPORT_LANGUAGES.SV);
  await expectations.recommendationsPageTabIsVisible(SUPPORT_LANGUAGES.SV);
});

test('Event search page is navigable from landing page header', async () => {
  await actions.clickEventSearchPageTab();
  await expectations.urlChangedToEventSearchPage();
});

test('Recommended page is navigable from landing page header', async () => {
  await actions.clickRecommendationsPageTab();
  await expectations.urlChangedToRecommendationsPage();
});
