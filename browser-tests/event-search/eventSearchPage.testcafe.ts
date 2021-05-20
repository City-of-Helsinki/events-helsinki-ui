import TestController from 'testcafe';

import {
  DATE_TYPES,
  DEFAULT_LANGUAGE,
  supportedLanguages,
} from '../../src/constants';
import { isLocalized } from '../../src/domain/event/EventUtils';
import { PAGE_SIZE } from '../../src/domain/eventSearch/constants';
import { getEvents } from '../datasources/eventDataSource';
import { searchFilterDataSource } from '../datasources/searchFilterDataSource';
import {
  getEventDate,
  getExpectedEventContext,
  isInternetEvent,
} from '../utils/event.utils';
import { EventFieldsFragment } from '../utils/generated/graphql';
import {
  selectRandomValueFromArray,
  selectRandomValuesFromArray,
} from '../utils/random.utils';
import { getRandomSentence } from '../utils/regexp.util';
import { requestLogger } from '../utils/requestLogger';
import { getEnvUrl } from '../utils/settings';
import {
  clearDataToPrintOnFailure,
  setDataToPrintOnFailure,
} from '../utils/testcafe.utils';
import { getUrlUtils } from '../utils/url.utils';
import { getEventSearchPage } from './eventSearchPage.components';

let eventSearchPage: ReturnType<typeof getEventSearchPage>;
let urlUtils: ReturnType<typeof getUrlUtils>;
fixture('Event search page')
  .page(getEnvUrl('/fi/events'))
  .beforeEach(async (t) => {
    clearDataToPrintOnFailure(t);
    eventSearchPage = getEventSearchPage(t);
    urlUtils = getUrlUtils(t);
  })
  .afterEach(async () => {
    requestLogger.clear();
  })
  .requestHooks(requestLogger);

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
  setDataToPrintOnFailure(
    t,
    'expectedEvents',
    events.map((event) => getExpectedEventContext(event))
  );
  const searchResults = await eventSearchPage.findSearchResultList();
  await searchResults.actions.clickShowMoreEventsButton();
  await searchResults.expectations.allEventCardsAreVisible(events);
});

test('Search url by event name shows event card data for helsinki event', async (t) => {
  const [event] = await getEvents();
  setDataToPrintOnFailure(
    t,
    'expectedEvent',
    getExpectedEventContext(event, 'startTime', 'endTime')
  );
  await urlUtils.actions.navigateToSearchUrl(getRandomSentence(event.name.fi));
  const searchResults = await eventSearchPage.findSearchResultList();
  const eventCard = await searchResults.eventCard(event);
  await eventCard.expectations.eventTimeIsPresent();
  if (!isInternetEvent(event)) {
    await eventCard.expectations.addressIsPresent();
  }
  await eventCard.expectations.keywordButtonsArePresent();
  await eventCard.actions.clickEventLink();
  await urlUtils.expectations.urlChangedToEventPage(event);
});

test('Free text search finds event by free text search', async (t) => {
  const [event] = await getEvents();
  setDataToPrintOnFailure(t, 'expectedEvent', getExpectedEventContext(event));
  const eventLanguages = supportedLanguages.filter((locale) =>
    isLocalized(event, locale)
  );

  for (const locale of eventLanguages) {
    await testSearchEventByText(t, event, event.name[locale], 'name');
    await testSearchEventByText(
      t,
      event,
      event.shortDescription[locale],
      'shortDescription'
    );
    await testSearchEventByText(
      t,
      event,
      event.description[locale],
      'description'
    );
    await testSearchEventByText(
      t,
      event,
      event.location.name[locale],
      'location'
    );
    if (!isInternetEvent(event)) {
      await testSearchEventByText(
        t,
        event,
        event.location.streetAddress[locale],
        'location'
      );
    }
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
  const randomSentenceFromText = getRandomSentence(freeText);
  const searchBanner = await eventSearchPage.findSearchBanner();
  await searchBanner.actions.inputSearchTextAndPressEnter(
    randomSentenceFromText
  );
  const searchResults = await eventSearchPage.findSearchResultList();
  await searchResults.eventCard(event, expectedField);
  await searchBanner.actions.clickClearFiltersButton();
  clearDataToPrintOnFailure(t);
};

test('Future events can be searched', async () => {
  const searchBanner = await eventSearchPage.findSearchBanner();
  await searchBanner.actions.openDateFilters();
  for (const dateRange of [DATE_TYPES.TOMORROW, DATE_TYPES.WEEKEND]) {
    const [event] = await getEvents(
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
