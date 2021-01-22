import addDays from 'date-fns/addDays';
import endOfWeek from 'date-fns/endOfWeek';
import subDays from 'date-fns/subDays';
import TestController from 'testcafe';

import {
  DATE_TYPES,
  DEFAULT_LANGUAGE,
  SUPPORT_LANGUAGES,
} from '../../src/constants';
import { PAGE_SIZE } from '../../src/domain/eventSearch/constants';
import { getEvents, getHelsinkiEvents } from '../datasources/eventDataSource';
import { searchFilterDataSource } from '../datasources/searchFilterDataSource';
import { EventFieldsFragment } from '../utils/generated/graphql';
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
    await searchContainer.expectations.neighborhoodOptionIsPresent(
      neighborhood
    );
  }
});

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

test.only('Free text search shows event card data for helsinki event', async () => {
  const [event] = await getHelsinkiEvents();
  await components
    .searchContainer()
    .actions.inputSearchTextAndPressEnter(event.name.fi);
  const eventCard = components.eventCard(event);
  await eventCard.expectations.eventTimeIsPresent();
  await eventCard.expectations.addressIsPresent();
  await eventCard.expectations.keywordButtonsArePresent();
  await eventCard.actions.clickEventLink();
  await urlUtils.expectations.urlChangedToEventPage(event);
});

test('search url finds event by free text search', async (t) => {
  const [event] = await getHelsinkiEvents();
  for (const locale of Object.values(SUPPORT_LANGUAGES)) {
    const randomDescriptionSentence =
      event.description[locale] &&
      selectRandomValueFromArray(splitBySentences(event.description[locale]));
    const randomKeyword = selectRandomValueFromArray(event.keywords);
    await testSearchEventByText(t, event, event.name[locale]);
    await testSearchEventByText(t, event, event.shortDescription[locale]);
    await testSearchEventByText(t, event, randomDescriptionSentence);
    await testSearchEventByText(t, event, event.location.name[locale]);
    await testSearchEventByText(t, event, event.location.streetAddress[locale]);
    await testSearchEventByText(t, event, randomKeyword.name[locale]);
  }
});

const testSearchEventByText = async (
  t: TestController,
  event: EventFieldsFragment,
  freeText: string
) => {
  if (!freeText) {
    return;
  }
  await urlUtils.actions.navigateToSearchUrl(freeText);
  await components.eventCard(event).expectations.isPresent();
};

test('Future events can be searched', async () => {
  const searchContainer = components.searchContainer();
  await searchContainer.actions.openDateFilters();
  for (const dateRange of [DATE_TYPES.TOMORROW, DATE_TYPES.WEEKEND]) {
    const [event] = await getHelsinkiEvents(
      PAGE_SIZE,
      DEFAULT_LANGUAGE,
      `dateTypes=${dateRange}`
    );

    await searchContainer.actions.selectDateRange(dateRange);
    await searchContainer.actions.clickSearchButton();
    await components.eventCard(event).expectations.isPresent();
    await components
      .eventCard(event)
      .expectations.containsDate(getDate(dateRange));
    await searchContainer.actions.openDateFilters();
    await searchContainer.actions.selectDateRange(dateRange); // unselect previous choice
  }
});

const getDate = (dateRange: string) => {
  const today = new Date();
  const sunday = endOfWeek(today, { weekStartsOn: 1 });
  const saturday = subDays(sunday, 1);
  switch (dateRange) {
    case DATE_TYPES.TODAY:
    case DATE_TYPES.THIS_WEEK:
      return today;
    case DATE_TYPES.TOMORROW:
      return addDays(today, 1);
    case DATE_TYPES.WEEKEND:
      return today && today > saturday ? today : saturday;
  }
};
