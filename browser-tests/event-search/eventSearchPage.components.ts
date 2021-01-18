/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { screen, within } from '@testing-library/testcafe';
import TestController from 'testcafe';

import { getEventFields } from '../../src/domain/event/EventUtils';
import { KeywordOption } from '../../src/domain/event/types';
import getDateRangeStr from '../../src/util/getDateRangeStr';
import { getErrorMessage } from '../utils/error.util';
import {
  EventFieldsFragment,
  Neighborhood,
  PlaceFieldsFragment,
} from '../utils/generated/graphql';
import { regExpEscaped } from '../utils/regexp.util';

export const getEventSearchPageComponents = (t: TestController) => {
  const searchContainer = () => {
    const selectors = {
      component() {
        return within(screen.getByTestId('searchContainer'));
      },
      neighborhoodFilter() {
        return this.component().getByLabelText('Etsi alue');
      },
      neighborhoodCheckbox(n: Neighborhood) {
        return this.component().getByRole('checkbox', { name: n.name.fi });
      },
      placeFilter() {
        return this.component().getByLabelText('Etsi tapahtumapaikka');
      },
      placeSearchInput() {
        return this.component().getByLabelText('Kirjoita hakusana');
      },
      placeCheckbox(place: PlaceFieldsFragment) {
        return this.component().getByRole('checkbox', {
          name: place.name.fi,
        });
      },
      searchInput() {
        return this.component().getByPlaceholderText(
          'Kirjoita hakusana, esim. rock tai jooga'
        );
      },
    };
    const actions = {
      async openNeighborhoodFilters() {
        await t.click(selectors.neighborhoodFilter());
      },
      async selectNeighborhoodFilter(neighborhood: Neighborhood) {
        t.ctx.neighborhood = neighborhood;
        await t.click(selectors.neighborhoodCheckbox(neighborhood));
      },
      async openPlaceFilters() {
        await t.click(selectors.placeFilter());
      },
      async selectPlaceFilter(place: PlaceFieldsFragment) {
        t.ctx.place = place;
        await t
          .click(selectors.placeSearchInput())
          .pressKey('ctrl+a delete') // clears previous input
          .typeText(selectors.placeSearchInput(), place.name.fi)
          .click(selectors.placeCheckbox(place));
      },
      async inputSearchTextAndPressEnter(searchString: string) {
        t.ctx.searchString = searchString;
        await t
          .typeText(selectors.searchInput(), searchString)
          .pressKey('enter');
      },
    };
    const expectations = {
      async neighborhoodOptionIsVisible(neighborhood: Neighborhood) {
        t.ctx.neighborhood = neighborhood;
        await t
          .expect(selectors.neighborhoodCheckbox(neighborhood).exists)
          .ok(getErrorMessage(t));
      },
    };
    return {
      selectors,
      actions,
      expectations,
    };
  };
  const resultList = () => {
    const selectors = {
      component() {
        return within(screen.getByTestId('resultList'));
      },
      clickMoreButton() {
        return this.component().getByRole('button', {
          name: /Näytä lisää tapahtumia/g,
        });
      },
    };
    const actions = {
      async clickShowMoreEventsButton() {
        await t.click(selectors.clickMoreButton());
      },
    };
    const expectations = {
      async allEventCardsAreVisible(events: EventFieldsFragment[]) {
        for (const event of events) {
          await eventCard(event).expectations.titleLinkIsPresent();
        }
      },
    };
    return {
      selectors,
      actions,
      expectations,
    };
  };
  const eventCard = (event: EventFieldsFragment) => {
    const {
      startTime,
      endTime,
      locationName,
      streetAddress,
      addressLocality,
      keywords,
    } = getEventFields(event, 'fi');
    const selectors = {
      component() {
        return within(screen.getByTestId(event.id));
      },
      eventTitleLink() {
        return this.component().getByRole('link', {
          name: regExpEscaped(event.name.fi, 'g'),
        });
      },
      keywordLink(keyword: KeywordOption) {
        return this.component().getByRole('button', { name: keyword.name });
      },
      dateRangeText() {
        return this.component().getByText(
          getDateRangeStr({
            start: startTime,
            end: endTime,
            locale: 'fi',
            includeTime: true,
            timeAbbreviation: 'klo',
          })
        );
      },
      addressText() {
        return this.component().getByText(
          `${locationName}, ${streetAddress}, ${addressLocality}`
        );
      },
    };
    const actions = {
      async clickEventLink() {
        await t.click(selectors.eventTitleLink());
      },
    };
    const expectations = {
      async titleLinkIsPresent() {
        await t
          .expect(selectors.eventTitleLink().exists)
          .ok(getErrorMessage(t), { timeout: 90000 });
      },
      async eventTimeIsPresent() {
        await t.expect(selectors.dateRangeText().exists).ok(getErrorMessage(t));
      },
      async addressIsPresent() {
        await t.expect(selectors.addressText().exists).ok(getErrorMessage(t));
      },
      async keywordButtonsArePresent() {
        await t.expect(keywords.length).gt(0, getErrorMessage(t));
        for (const keyword of keywords) {
          t.ctx.keyword = keyword;
          await t
            .expect(selectors.keywordLink(keyword).exists)
            .ok(getErrorMessage(t));
        }
      },
    };
    return {
      selectors,
      actions,
      expectations,
    };
  };
  return {
    searchContainer,
    resultList,
    eventCard,
  };
};
