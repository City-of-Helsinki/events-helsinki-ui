import { SUPPORT_LANGUAGES } from '../../src/constants';
import { PAGE_SIZE } from '../../src/domain/eventSearch/constants';
import { getEvents, getHelsinkiEvents } from '../datasources/eventDataSource';
import { searchFilterDataSource } from '../datasources/searchFilterDataSource';
import {
  selectRandomValueFromArray,
  selectRandomValuesFromArray,
} from '../utils/random.utils';
import { splitBySentences } from '../utils/regexp.util';
import { getEnvUrl } from '../utils/settings';
import { getUrlUtils } from '../utils/url.utils';
import { getEventSearchPageComponents } from './eventSearchPage.components';

let components: ReturnType<typeof getEventSearchPageComponents>;
let urlUtils: ReturnType<typeof getUrlUtils>;
fixture('Event search page')
  .page(getEnvUrl('/fi/events'))
  .beforeEach(async (t) => {
    components = getEventSearchPageComponents(t);
    urlUtils = getUrlUtils(t);
    t.ctx = {};
  });

test('shows neighborhoods in filter options', async (t) => {
  const neighborhoodOptions = await searchFilterDataSource.getNeighborhoodOptions();
  await t.expect(neighborhoodOptions.length).gt(0);
  const searchContainer = components.searchContainer();
  await searchContainer.actions.openNeighborhoodFilters();
  for (const neighborhood of neighborhoodOptions) {
    await searchContainer.expectations.neighborhoodOptionIsVisible(
      neighborhood
    );
  }
});
/**
 * Note: This is kinda slow test.
 * Perhaps we could check just some of the places instead of all of them
 */
test('shows Helsinki places in filter options', async (t) => {
  const placeOptions = await searchFilterDataSource.getHelsinkiPlaceOptions();
  await t.expect(placeOptions.length).gt(0);
  const searchContainer = components.searchContainer();
  await searchContainer.actions.openPlaceFilters();
  for (const place of selectRandomValuesFromArray(placeOptions, 3)) {
    await searchContainer.actions.selectPlaceFilter(place);
  }
});

test('"click more events" -button works', async (t) => {
  const events = await getEvents(2 * PAGE_SIZE);
  // some events may have been filtered if they are not in finnish
  // we need to find more events than one PAGE_SIZE in order to try clickMoreEventsButton
  await t.expect(events.length).gt(PAGE_SIZE);
  const resultList = components.resultList();
  await resultList.actions.clickShowMoreEventsButton();
  await resultList.expectations.allEventCardsAreVisible(events);
});

test('Free text search shows event card data for helsinki event', async () => {
  const [event] = await getHelsinkiEvents();
  await components
    .searchContainer()
    .actions.inputSearchTextAndPressEnter(event.name.fi);
  const eventCard = components.eventCard(event);
  await eventCard.expectations.titleLinkIsPresent();
  await eventCard.expectations.eventTimeIsPresent();
  await eventCard.expectations.addressIsPresent();
  await eventCard.expectations.keywordButtonsArePresent();
  await eventCard.actions.clickEventLink();
  await urlUtils.expectations.urlChangedToEventPage(event);
});

test('search url finds event by name', async (t) => {
  const [event] = await getHelsinkiEvents();
  for (const locale of Object.values(SUPPORT_LANGUAGES)) {
    if (event.name[locale]) {
      t.ctx.locale = locale;
      await getUrlUtils(t).actions.navigateToSearchUrl(event.name[locale]);
      await components.eventCard(event).expectations.titleLinkIsPresent();
    }
  }
});

test('search url finds event by short description', async (t) => {
  const [event] = await getHelsinkiEvents();
  for (const locale of Object.values(SUPPORT_LANGUAGES)) {
    if (event.description[locale]) {
      t.ctx.locale = locale;
      await urlUtils.actions.navigateToSearchUrl(
        event.shortDescription[locale]
      );
      await components.eventCard(event).expectations.titleLinkIsPresent();
    }
  }
});

test('search url finds event by description', async (t) => {
  const [event] = await getHelsinkiEvents();
  for (const locale of Object.values(SUPPORT_LANGUAGES)) {
    if (event.description[locale]) {
      t.ctx.locale = locale;
      const randomSentenceFromDescription = selectRandomValueFromArray(
        splitBySentences(event.description[locale])
      );
      t.ctx.randomSentenceFromDescription = randomSentenceFromDescription;
      await urlUtils.actions.navigateToSearchUrl(randomSentenceFromDescription);
      await components.eventCard(event).expectations.titleLinkIsPresent();
    }
  }
});
