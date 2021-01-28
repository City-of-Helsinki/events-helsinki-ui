import TestController from 'testcafe';

import {
  DATE_TYPES,
  DEFAULT_LANGUAGE,
  SUPPORT_LANGUAGES,
} from '../../src/constants';
import { PAGE_SIZE } from '../../src/domain/eventSearch/constants';
import { getEvents, getHelsinkiEvents } from '../datasources/eventDataSource';
import { searchFilterDataSource } from '../datasources/searchFilterDataSource';
import { getEventDate } from '../utils/event.utils';
import { EventFieldsFragment } from '../utils/generated/graphql';
import {
  selectRandomValueFromArray,
  selectRandomValuesFromArray,
} from '../utils/random.utils';
import { splitBySentences } from '../utils/regexp.util';
import { getEnvUrl } from '../utils/settings';
import { clearContext } from '../utils/testcafe.utils';
import { getUrlUtils } from '../utils/url.utils';
import { getEventSearchPage } from './eventSearchPage.components';

let eventSearchPage: ReturnType<typeof getEventSearchPage>;
let urlUtils: ReturnType<typeof getUrlUtils>;
fixture('Event search page')
  .page(getEnvUrl('/fi/events'))
  .beforeEach(async (t) => {
    clearContext(t);
    eventSearchPage = getEventSearchPage(t);
    urlUtils = getUrlUtils(t);
  });

test('shows neighborhoods in filter options', async (t) => {
  const neighborhoodOptions = await searchFilterDataSource.getNeighborhoodOptions();
  await t.expect(neighborhoodOptions.length).gt(0);
  const searchBanner = await eventSearchPage.findSearchBanner();
  await searchBanner.actions.openNeighborhoodFilters();
  for (const neighborhood of neighborhoodOptions) {
    await searchBanner.expectations.neighborhoodOptionIsPresent(neighborhood);
  }
});

test('shows Helsinki places in filter options', async (t) => {
  const placeOptions = await searchFilterDataSource.getHelsinkiPlaceOptions();
  await t.expect(placeOptions.length).gt(0);
  const searchBanner = await eventSearchPage.findSearchBanner();
  await searchBanner.actions.openPlaceFilters();
  for (const place of selectRandomValuesFromArray(placeOptions, 3)) {
    await searchBanner.actions.selectPlaceFilter(place);
  }
});

test('"click more events" -button works', async (t) => {
  const events = await getEvents(2 * PAGE_SIZE);
  // some events may have been filtered if they are not in finnish
  // we need to find more events than one PAGE_SIZE in order to try clickMoreEventsButton
  await t.expect(events.length).gt(PAGE_SIZE);
  const searchResults = await eventSearchPage.findSearchResultList();
  await searchResults.actions.clickShowMoreEventsButton();
  await searchResults.expectations.allEventCardsAreVisible(events);
});

test('Search url by event name shows event card data for helsinki event', async () => {
  const [event] = await getHelsinkiEvents();
  await urlUtils.actions.navigateToSearchUrl(event.name.fi);
  const searchResults = await eventSearchPage.findSearchResultList();
  const eventCard = await searchResults.eventCard(event);
  await eventCard.expectations.eventTimeIsPresent();
  await eventCard.expectations.addressIsPresent();
  await eventCard.expectations.keywordButtonsArePresent();
  await eventCard.actions.clickEventLink();
  await urlUtils.expectations.urlChangedToEventPage(event);
});

test('Free text search finds event by free text search', async (t) => {
  const [event] = await getHelsinkiEvents();
  for (const locale of Object.values(SUPPORT_LANGUAGES)) {
    await testSearchEventByText(t, event, event.name[locale], 'name');
    const randomShortDescriptionSentence =
      event.shortDescription[locale] &&
      selectRandomValueFromArray(
        splitBySentences(event.shortDescription[locale])
      );
    await testSearchEventByText(
      t,
      event,
      randomShortDescriptionSentence,
      'shortDescription'
    );
    const randomDescriptionSentence =
      event.description[locale] &&
      selectRandomValueFromArray(splitBySentences(event.description[locale]));
    await testSearchEventByText(
      t,
      event,
      randomDescriptionSentence,
      'description'
    );
    await testSearchEventByText(
      t,
      event,
      event.location.name[locale],
      'location'
    );
    await testSearchEventByText(
      t,
      event,
      event.location.streetAddress[locale],
      'location'
    );
    const randomKeyword = selectRandomValueFromArray(event.keywords);
    await testSearchEventByText(
      t,
      event,
      randomKeyword.name[locale],
      'keywords'
    );
  }
});

const testSearchEventByText = async (
  t: TestController,
  event: EventFieldsFragment,
  freeText: string,
  expectedField?: keyof EventFieldsFragment
) => {
  if (!freeText) {
    return;
  }
  const searchBanner = await eventSearchPage.findSearchBanner();
  await searchBanner.actions.inputSearchTextAndPressEnter(freeText);
  const searchResults = await eventSearchPage.findSearchResultList();
  await searchResults.eventCard(event, expectedField);
  await searchBanner.actions.clickClearFiltersButton();
  clearContext(t);
};

test('Future events can be searched', async () => {
  const searchBanner = await eventSearchPage.findSearchBanner();
  await searchBanner.actions.openDateFilters();
  for (const dateRange of [DATE_TYPES.TOMORROW, DATE_TYPES.WEEKEND]) {
    const [event] = await getHelsinkiEvents(
      PAGE_SIZE,
      DEFAULT_LANGUAGE,
      `dateTypes=${dateRange}`
    );

    await searchBanner.actions.selectDateRange(dateRange);
    await searchBanner.actions.clickSearchButton();
    const searchResults = await eventSearchPage.findSearchResultList();
    const eventCard = await searchResults.eventCard(event);
    await eventCard.expectations.containsDate(getEventDate(dateRange));
    await searchBanner.actions.openDateFilters();
    await searchBanner.actions.selectDateRange(dateRange); // unselect previous choice
  }
});
