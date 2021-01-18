/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TestController from 'testcafe';

import { getEventFields } from '../../src/domain/event/EventUtils';
import { getPageTitle, getPathname } from '../utils/browserUtils';
import { errorMessageForEvent } from '../utils/event.utils';
import { EventFieldsFragment, Neighborhood } from '../utils/generated/graphql';
import { eventSearchPageSelectors } from './eventSearchPage.selectors';

export const getEventSearchPageExpectations = (t: TestController) => ({
  async neighborhoodOptionIsVisible(neighborhood: Neighborhood) {
    await t
      .expect(
        eventSearchPageSelectors.neighborhoodCheckbox(neighborhood).exists
      )
      .ok(`${neighborhood.name.fi} is not found from dropdown`);
  },
  async eventCardIsVisible(event: EventFieldsFragment) {
    const errMessage = errorMessageForEvent(event);
    await t
      .expect(eventSearchPageSelectors.eventNotFoundText.exists)
      .notOk(`Could not find event. ${errMessage}`)
      .expect(
        eventSearchPageSelectors.forEventCard(event).eventTitleLink().exists
      )
      .ok(errMessage, { timeout: 90000 });
  },
  async allEventCardsAreVisible(events: EventFieldsFragment[]) {
    for (const event of events) {
      await this.eventCardIsVisible(event);
    }
  },
  async urlChangedToEventPage(event: EventFieldsFragment) {
    const errMessage = errorMessageForEvent(event);
    await t
      .expect(getPathname())
      .eql(`/fi/event/${event.id}`, errMessage)
      .expect(getPageTitle())
      .eql(event.name.fi, errMessage);
  },
  async eventCardDateIsPresent(event: EventFieldsFragment) {
    const errMessage = errorMessageForEvent(event);
    await t
      .expect(
        eventSearchPageSelectors.forEventCard(event).dateRangeText().exists
      )
      .ok(errMessage);
  },
  async eventCardAddressIsPresent(event: EventFieldsFragment) {
    const errMessage = errorMessageForEvent(event);
    await t
      .expect(eventSearchPageSelectors.forEventCard(event).addressText().exists)
      .ok(errMessage);
  },
  async eventCardKeywordButtonsArePresent(event: EventFieldsFragment) {
    const errMessage = errorMessageForEvent(event);
    const { keywords } = getEventFields(event, 'fi');
    await t.expect(keywords.length).gt(0, errMessage);
    for (const keyword of keywords) {
      await t
        .expect(
          eventSearchPageSelectors.forEventCard(event).keywordLink(keyword)
            .exists
        )
        .ok(`${keyword.name} not found. ${errMessage}`);
    }
  },
});
