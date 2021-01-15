import { getEventFields } from '../../src/domain/event/EventUtils';
import { getHelsinkiEvents } from '../datasources/eventDataSource';
import { searchFilterDataSource } from '../datasources/searchFilterDataSource';
import { getPageTitle, getPathname } from '../utils/browserUtils';
import { getEnvUrl } from '../utils/settings';
import { errorMessageForEvent } from './eventPage.utils';
import { selectors } from './eventSearchPage.selectors';

fixture('Event search page').page(getEnvUrl('/fi/events'));

test('shows neighbourhoods in filter options', async (t) => {
  await t.click(selectors.neighbourhoodFilter);
  const neighbourhoodOptions = await searchFilterDataSource.getNeighborhoodOptions();
  await t.expect(neighbourhoodOptions.length).gt(0);
  for (const neighbourhood of neighbourhoodOptions) {
    await t
      .expect(selectors.neighbourhoodCheckbox(neighbourhood).exists)
      .ok(`${neighbourhood.name.fi} is not found from dropdown`);
  }
});
/**
 * Note: This is kinda slow test.
 * Perhaps we could check just some of the places instead of all of them
 */
test('shows Helsinki places in filter options', async (t) => {
  await t.click(selectors.placeFilter);
  const placeOptions = await searchFilterDataSource.getHelsinkiPlaceOptions();
  await t.expect(placeOptions.length).gt(0);
  for (const place of placeOptions) {
    await t
      .pressKey('ctrl+a delete') // clears previous input
      .typeText(selectors.placeSearchInput, place.name.fi)
      .expect(selectors.placeCheckbox(place).exists)
      .ok(`${place.name.fi} is not found from dropdown`);
  }
});

test("Free text search finds event by events's name and clicking event url works", async (t) => {
  const events = await getHelsinkiEvents(1);
  await t.expect(events.length).gt(0);
  const event = events[0];
  const eventCard = selectors.forEventCard(event);
  const errMessage = errorMessageForEvent(event);
  await t
    .typeText(selectors.searchInput, event.name.fi)
    .pressKey('enter')
    .click(eventCard.eventTitleLink())
    .expect(getPathname())
    .eql(`/fi/event/${event.id}`, errMessage)
    .expect(getPageTitle())
    .eql(event.name.fi, errMessage);
});

test('search url shows event card data', async (t) => {
  const events = await getHelsinkiEvents(1);
  await t.expect(events.length).gt(0);
  const event = events[0];
  const errMessage = errorMessageForEvent(event);
  const { keywords } = getEventFields(event, 'fi');
  const eventCardSelectors = selectors.forEventCard(event);
  await t
    .expect(keywords.length)
    .gt(0)
    .navigateTo(
      getEnvUrl(`/fi/events?text=${decodeURIComponent(event.name.fi)}`)
    )
    .expect(selectors.eventNotFoundText.exists)
    .notOk(`Could not find event. ${errMessage}`)
    .expect(eventCardSelectors.eventTitleLink().exists)
    .ok(errMessage)
    .expect(eventCardSelectors.dateRangeText().exists)
    .ok(errMessage)
    .expect(eventCardSelectors.addressText().exists)
    .ok(errMessage);

  for (const keyword of keywords) {
    await t
      .expect(eventCardSelectors.keywordLink(keyword).exists)
      .ok(`${keyword.name} not found. ${errMessage}`);
  }
  await t;
});
