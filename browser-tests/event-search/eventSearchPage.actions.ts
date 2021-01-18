/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TestController from 'testcafe';

import {
  EventFieldsFragment,
  Neighborhood,
  PlaceFieldsFragment,
} from '../utils/generated/graphql';
import { getEnvUrl } from '../utils/settings';
import { eventSearchPageSelectors } from './eventSearchPage.selectors';

export const getEventSearchPageActions = (t: TestController) => ({
  selectNeighborhoodFilter: async (neighborhood: Neighborhood) => {
    await t.click(eventSearchPageSelectors.neighborhoodCheckbox(neighborhood));
  },
  selectPlaceFilter: async (place: PlaceFieldsFragment) => {
    await t
      .click(eventSearchPageSelectors.placeSearchInput)
      .pressKey('ctrl+a delete') // clears previous input
      .typeText(eventSearchPageSelectors.placeSearchInput, place.name.fi)
      .click(eventSearchPageSelectors.placeCheckbox(place));
  },
  inputSearchTextAndPressEnter: async (searchString: string) => {
    await t
      .typeText(eventSearchPageSelectors.searchInput, searchString)
      .pressKey('enter');
  },
  clickEventLink: async (event: EventFieldsFragment) => {
    await t.click(
      eventSearchPageSelectors.forEventCard(event).eventTitleLink()
    );
  },
  navigateToSearchUrl: async (searchString: string) => {
    await t.navigateTo(
      getEnvUrl(`/fi/events?text=${decodeURIComponent(searchString)}`)
    );
  },
  clickShowMoreEventsButton: async () => {
    await t.click(eventSearchPageSelectors.clickMoreButton);
  },
});
