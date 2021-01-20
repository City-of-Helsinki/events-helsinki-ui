/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { screen, within } from '@testing-library/testcafe';
import TestController from 'testcafe';

import translations from '../../src/common/translation/i18n/fi.json';
import { getEventFields } from '../../src/domain/event/EventUtils';
import { KeywordOption } from '../../src/domain/event/types';
import { formatDate } from '../../src/util/dateUtils';
import getDateRangeStr from '../../src/util/getDateRangeStr';
import toPascalCase from '../../src/util/toPascalCase';
import { getErrorMessage } from '../utils/error.util';
import { getExpectedEventContext } from '../utils/event.utils';
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
        return screen.findByTestId('searchContainer');
      },
      withinComponent() {
        return within(screen.getByTestId('searchContainer'));
      },
      searchButton() {
        return this.withinComponent().findByRole('button', { name: 'Hae' });
      },
      dateRangeFilter() {
        return this.withinComponent().findByLabelText('Valitse ajankohta');
      },
      dateRangeCheckbox(range: string) {
        return this.withinComponent().findByRole('checkbox', {
          name: range,
        });
      },
      neighborhoodFilter() {
        return this.withinComponent().findByLabelText('Etsi alue');
      },
      neighborhoodCheckbox(n: Neighborhood) {
        return this.withinComponent().findByRole('checkbox', {
          name: n.name.fi,
        });
      },
      placeFilter() {
        return this.withinComponent().findByLabelText('Etsi tapahtumapaikka');
      },
      placeSearchInput() {
        return this.withinComponent().findByLabelText('Kirjoita hakusana');
      },
      placeCheckbox(place: PlaceFieldsFragment) {
        return this.withinComponent().findByRole('checkbox', {
          name: place.name.fi,
        });
      },
      searchInput() {
        return this.withinComponent().findByPlaceholderText(
          'Kirjoita hakusana, esim. rock tai jooga'
        );
      },
    };
    const expectations = {
      async isPresent() {
        await t.expect(selectors.component().exists).ok(getErrorMessage(t));
      },
      async neighborhoodOptionIsPresent(neighborhood: Neighborhood) {
        await this.isPresent();
        t.ctx.neighborhood = neighborhood;
        await t
          .expect(selectors.neighborhoodCheckbox(neighborhood).exists)
          .ok(getErrorMessage(t));
      },
    };
    const actions = {
      async clickSearchButton() {
        await expectations.isPresent();
        await t.click(selectors.searchButton());
      },
      async openDateFilters() {
        await expectations.isPresent();
        await t.click(selectors.dateRangeFilter());
      },
      async selectDateRange(dateRange: string) {
        await expectations.isPresent();
        const dateRangeValue =
          translations.commons.dateSelector[
            `dateType${toPascalCase(dateRange)}`
          ];
        t.ctx.dateRange = dateRangeValue;
        await t.click(selectors.dateRangeCheckbox(dateRangeValue));
      },
      async openNeighborhoodFilters() {
        await expectations.isPresent();
        await t.click(selectors.neighborhoodFilter());
      },
      async selectNeighborhoodFilter(neighborhood: Neighborhood) {
        await expectations.isPresent();
        t.ctx.neighborhood = neighborhood;
        await t.click(selectors.neighborhoodCheckbox(neighborhood));
      },
      async openPlaceFilters() {
        await expectations.isPresent();
        await t.click(selectors.placeFilter());
      },
      async selectPlaceFilter(place: PlaceFieldsFragment) {
        await expectations.isPresent();
        t.ctx.place = place;
        await t
          .click(selectors.placeSearchInput())
          .pressKey('ctrl+a delete') // clears previous input
          .typeText(selectors.placeSearchInput(), place.name.fi)
          .click(selectors.placeCheckbox(place));
      },
      async inputSearchTextAndPressEnter(searchString: string) {
        await expectations.isPresent();
        t.ctx.searchString = searchString;
        await t
          .typeText(selectors.searchInput(), searchString)
          .pressKey('enter');
      },
    };

    return {
      selectors,
      expectations,
      actions,
    };
  };
  const resultList = () => {
    const selectors = {
      component() {
        return screen.findByTestId('resultList');
      },
      withinComponent() {
        return within(screen.getByTestId('resultList'));
      },
      clickMoreButton() {
        return this.withinComponent().findByRole('button', {
          name: /Näytä lisää tapahtumia/g,
        });
      },
    };
    const expectations = {
      async isPresent() {
        await t.expect(selectors.component().exists).ok(getErrorMessage(t));
      },
      async allEventCardsAreVisible(events: EventFieldsFragment[]) {
        await this.isPresent();
        for (const event of events) {
          await eventCard(event).expectations.titleLinkIsPresent();
        }
      },
    };
    const actions = {
      async clickShowMoreEventsButton() {
        await expectations.isPresent();
        await t.click(selectors.clickMoreButton());
      },
    };

    return {
      selectors,
      expectations,
      actions,
    };
  };
  const eventCard = (event: EventFieldsFragment) => {
    t.ctx.expectedEvent = getExpectedEventContext(event);
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
        return screen.findByTestId(event.id);
      },
      withinComponent() {
        return within(screen.getByTestId(event.id));
      },
      eventTitleLink() {
        return this.withinComponent().findByRole('link', {
          name: regExpEscaped(event.name.fi, 'g'),
        });
      },
      keywordLink(keyword: KeywordOption) {
        return this.withinComponent().findByRole('button', {
          name: keyword.name,
        });
      },
      containsText(text: string) {
        return this.withinComponent().findByText(RegExp(text, 'gi'));
      },
      dateRangeText() {
        return this.withinComponent().findByText(
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
        return this.withinComponent().findByText(
          `${locationName}, ${streetAddress}, ${addressLocality}`
        );
      },
    };
    const expectations = {
      async isPresent() {
        await t
          .expect(selectors.component().exists)
          .ok(getErrorMessage(t), { timeout: 30000 });
      },
      async titleLinkIsPresent() {
        await this.isPresent();
        await t
          .expect(selectors.eventTitleLink().exists)
          .ok(getErrorMessage(t));
      },
      async eventTimeIsPresent() {
        await this.isPresent();
        t.ctx.expectedEvent = getExpectedEventContext(
          event,
          'startTime',
          'endTime'
        );
        await t.expect(selectors.dateRangeText().exists).ok(getErrorMessage(t));
      },
      async containsDate(date: Date) {
        await this.isPresent();
        const formattedDate = formatDate(date, 'd.M.yyyy');
        t.ctx.expectedDate = formattedDate;
        await t
          .expect(selectors.containsText(formattedDate).exists)
          .ok(getErrorMessage(t));
      },
      async addressIsPresent() {
        await this.isPresent();
        t.ctx.expectedEvent = getExpectedEventContext(event, 'location');
        await t.expect(selectors.addressText().exists).ok(getErrorMessage(t));
      },
      async keywordButtonsArePresent() {
        await t.expect(keywords.length).gt(0, getErrorMessage(t));
        await this.isPresent();
        for (const keyword of keywords) {
          t.ctx.keyword = keyword;
          await t
            .expect(selectors.keywordLink(keyword).exists)
            .ok(getErrorMessage(t));
        }
      },
    };
    const actions = {
      async clickEventLink() {
        await expectations.isPresent();
        await t.click(selectors.eventTitleLink());
      },
    };
    return {
      selectors,
      expectations,
      actions,
    };
  };
  return {
    searchContainer,
    resultList,
    eventCard,
  };
};
