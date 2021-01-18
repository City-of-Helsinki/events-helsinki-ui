import { PAGE_SIZE } from '../../src/domain/eventSearch/constants';
import { getEvents, getHelsinkiEvents } from '../datasources/eventDataSource';
import { searchFilterDataSource } from '../datasources/searchFilterDataSource';
import {
  selectRandomValueFromArray,
  selectRandomValuesFromArray,
} from '../utils/random.utils';
import { splitBySentences } from '../utils/regexp.util';
import { getEnvUrl } from '../utils/settings';
import { getEventSearchPageActions } from './eventSearchPage.actions';
import { getEventSearchPageExpectations } from './eventSearchPage.expectations';
import { eventSearchPageSelectors } from './eventSearchPage.selectors';

let actions: ReturnType<typeof getEventSearchPageActions>;
let expectations: ReturnType<typeof getEventSearchPageExpectations>;

fixture('Event search page')
  .page(getEnvUrl('/fi/events'))
  .beforeEach(async (t) => {
    actions = getEventSearchPageActions(t);
    expectations = getEventSearchPageExpectations(t);
  });

test('shows neighborhoods in filter options', async (t) => {
  await t.click(eventSearchPageSelectors.neighborhoodFilter);
  const neighborhoodOptions = await searchFilterDataSource.getNeighborhoodOptions();
  await t.expect(neighborhoodOptions.length).gt(0);
  for (const neighborhood of neighborhoodOptions) {
    await expectations.neighborhoodOptionIsVisible(neighborhood);
  }
});
/**
 * Note: This is kinda slow test.
 * Perhaps we could check just some of the places instead of all of them
 */
test('shows Helsinki places in filter options', async (t) => {
  await t.click(eventSearchPageSelectors.placeFilter);
  const placeOptions = await searchFilterDataSource.getHelsinkiPlaceOptions();
  await t.expect(placeOptions.length).gt(0);
  for (const place of selectRandomValuesFromArray(placeOptions, 3)) {
    await actions.selectPlaceFilter(place);
  }
});

test('"click more events" -button works', async (t) => {
  const events = await getEvents(2 * PAGE_SIZE);
  // some events may have been filtered if they are not in finnish
  // we need to find more events than one PAGE_SIZE in order to try clickMoreEventsButton
  await t.expect(events.length).gt(PAGE_SIZE);
  await actions.clickShowMoreEventsButton();
  await expectations.allEventCardsAreVisible(events);
});

test('Free text search shows event card data for helsinki event', async () => {
  const [event] = await getHelsinkiEvents();
  await actions.inputSearchTextAndPressEnter(event.name.fi);
  await expectations.eventCardIsVisible(event);
  await expectations.eventCardDateIsPresent(event);
  await expectations.eventCardAddressIsPresent(event);
  await expectations.eventCardKeywordButtonsArePresent(event);
  await actions.clickEventLink(event);
  await expectations.urlChangedToEventPage(event);
});

test('search url finds event by name', async () => {
  const [event] = await getHelsinkiEvents();
  await actions.navigateToSearchUrl(event.name.fi);
  await expectations.eventCardIsVisible(event);
});

test('search url finds event by short description', async () => {
  const [event] = await getHelsinkiEvents();

  await actions.navigateToSearchUrl(event.shortDescription.fi);
  await expectations.eventCardIsVisible(event);
});

test('search url finds event by description', async () => {
  const [event] = await getHelsinkiEvents();
  const randomSentenceFromDescription = selectRandomValueFromArray(
    splitBySentences(event.description.fi)
  );
  await actions.navigateToSearchUrl(randomSentenceFromDescription);
  await expectations.eventCardIsVisible(event);
});
