/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { screen, within } from '@testing-library/testcafe';
import TestController from 'testcafe';

import translations from '../../src/common/translation/i18n/fi.json';
import { getEventFields } from '../../src/domain/event/EventUtils';
import { KeywordOption } from '../../src/domain/event/types';
import { formatDate } from '../../src/util/dateUtils';
import getDateRangeStr from '../../src/util/getDateRangeStr';
import toPascalCase from '../../src/util/toPascalCase';
import { withinContext } from '../utils/context.util';
import { getErrorMessage } from '../utils/error.util';
import { getExpectedEventContext } from '../utils/event.utils';
import {
  EventFieldsFragment,
  Neighborhood,
  PlaceFieldsFragment,
} from '../utils/generated/graphql';

export const getEventSearchPage = (t: TestController) => {
  const searchBanner = async () => {
    const withinSearchBanner = () => {
      t.ctx.withinTestId = 'searchContainer';
      return withinContext(t, within(screen.getByTestId(t.ctx.withinTestId)));
    };
    const selectors = {
      searchBanner() {
        return screen.findByTestId('searchContainer');
      },
      searchButton() {
        return withinSearchBanner().findByRole('button', { name: 'Hae' });
      },
      dateRangeFilter() {
        return withinSearchBanner().findByLabelText('Valitse ajankohta');
      },
      dateRangeCheckbox(range: string) {
        return withinSearchBanner().findByRole('checkbox', { name: range });
      },
      neighborhoodFilter() {
        return withinSearchBanner().findByLabelText('Etsi alue');
      },
      neighborhoodCheckbox(n: Neighborhood) {
        return withinSearchBanner().findByRole('checkbox', { name: n.name.fi });
      },
      placeFilter() {
        return withinSearchBanner().findByLabelText('Etsi tapahtumapaikka');
      },
      placeSearchInput() {
        return withinSearchBanner().findByLabelText('Kirjoita hakusana');
      },
      placeCheckbox(place: PlaceFieldsFragment) {
        return withinSearchBanner().findByRole('checkbox', {
          name: place.name.fi,
        });
      },
      searchInput() {
        return withinSearchBanner().findByPlaceholderText(
          'Kirjoita hakusana, esim. rock tai jooga'
        );
      },
      clearFiltersButton() {
        return withinSearchBanner().findByRole('button', {
          name: 'Tyhjennä hakuehdot',
        });
      },
    };
    const expectations = {
      async searchBannerIsPresent() {
        await t
          .expect(selectors.searchBanner().exists)
          .ok(await getErrorMessage(t));
      },
      async neighborhoodOptionIsPresent(neighborhood: Neighborhood) {
        await t
          .expect(selectors.neighborhoodCheckbox(neighborhood).exists)
          .ok(await getErrorMessage(t));
      },
    };
    const actions = {
      async clickSearchButton() {
        await t.click(selectors.searchButton());
      },
      async openDateFilters() {
        await t.click(selectors.dateRangeFilter());
      },
      async selectDateRange(dateRange: string) {
        const dateRangeValue =
          translations.commons.dateSelector[
            `dateType${toPascalCase(dateRange)}`
          ];
        await t.click(selectors.dateRangeCheckbox(dateRangeValue));
      },
      async openNeighborhoodFilters() {
        await t.click(selectors.neighborhoodFilter());
      },
      async selectNeighborhoodFilter(neighborhood: Neighborhood) {
        await t.click(selectors.neighborhoodCheckbox(neighborhood));
      },
      async openPlaceFilters() {
        await t.click(selectors.placeFilter());
      },
      async selectPlaceFilter(place: PlaceFieldsFragment) {
        t.ctx.typeText = place.name.fi;
        await t
          .click(selectors.placeSearchInput())
          .pressKey('ctrl+a delete') // clears previous input
          .typeText(selectors.placeSearchInput(), t.ctx.typeText)
          .click(selectors.placeCheckbox(place));
      },
      async inputSearchTextAndPressEnter(searchString: string) {
        t.ctx.typeText = searchString;
        await t
          .typeText(selectors.searchInput(), t.ctx.typeText)
          .pressKey('enter');
      },
      async clickClearFiltersButton() {
        await t.click(selectors.clearFiltersButton());
      },
    };
    await expectations.searchBannerIsPresent();
    return {
      selectors,
      expectations,
      actions,
    };
  };
  const searchResults = async () => {
    const withinSearchResultList = () => {
      t.ctx.withinTestId = 'resultList';
      return withinContext(t, within(screen.getByTestId(t.ctx.withinTestId)));
    };
    const selectors = {
      searchResultList() {
        return screen.findByTestId('resultList');
      },
      clickMoreButton() {
        return withinSearchResultList().findByRole('button', {
          name: /Näytä lisää tapahtumia/g,
        });
      },
    };
    const expectations = {
      async searchResultListIsPresent() {
        await t
          .expect(selectors.searchResultList().exists)
          .ok(await getErrorMessage(t));
      },
      async allEventCardsAreVisible(events: EventFieldsFragment[]) {
        for (const e of events) {
          const event = await eventCard(e);
          await event.expectations.evenrCardIsPresent();
        }
      },
    };
    const actions = {
      async clickShowMoreEventsButton() {
        await t.click(selectors.clickMoreButton());
      },
    };
    await expectations.searchResultListIsPresent();
    return {
      selectors,
      expectations,
      actions,
    };
  };
  const eventCard = async (event: EventFieldsFragment) => {
    t.ctx.expectedEvent = getExpectedEventContext(event);
    const {
      startTime,
      endTime,
      locationName,
      streetAddress,
      addressLocality,
      keywords,
    } = getEventFields(event, 'fi');

    const withinEventCard = () => {
      t.ctx.withinTestId = event.id;
      return withinContext(t, within(screen.getByTestId(t.ctx.withinTestId)));
    };
    const selectors = {
      eventCard() {
        return screen.findByTestId(event.id);
      },
      keywordLink(keyword: KeywordOption) {
        return withinEventCard().findByRole('button', { name: keyword.name });
      },
      containsText(text: string) {
        return withinEventCard().findByText(RegExp(text, 'gi'));
      },
      dateRangeText() {
        return withinEventCard().findByText(
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
        return withinEventCard().findByText(
          `${locationName}, ${streetAddress}, ${addressLocality}`
        );
      },
    };
    const expectations = {
      async evenrCardIsPresent(expectedField?: keyof EventFieldsFragment) {
        const results = await searchResults();
        await results.expectations.searchResultListIsPresent();
        t.ctx.withinTestId = 'resultList';
        if (expectedField) {
          t.ctx.expectedEvent = getExpectedEventContext(event, expectedField);
        }
        await t
          .expect(selectors.eventCard().exists)
          .ok(await getErrorMessage(t), { timeout: 15000 });
      },
      async eventTimeIsPresent() {
        await t
          .expect(selectors.dateRangeText().exists)
          .ok(await getErrorMessage(t));
      },
      async containsDate(date: Date) {
        const formattedDate = formatDate(date, 'd.M.yyyy');
        await t
          .expect(selectors.containsText(formattedDate).exists)
          .ok(await getErrorMessage(t));
      },
      async addressIsPresent() {
        await t
          .expect(selectors.addressText().exists)
          .ok(await getErrorMessage(t));
      },
      async keywordButtonsArePresent() {
        await t.expect(keywords.length).gt(0, await getErrorMessage(t));
        for (const keyword of keywords) {
          await t
            .expect(selectors.keywordLink(keyword).exists)
            .ok(await getErrorMessage(t));
        }
      },
    };
    const actions = {
      async clickEventLink() {
        await t.click(selectors.eventCard());
      },
    };
    await expectations.evenrCardIsPresent();
    return {
      selectors,
      expectations,
      actions,
    };
  };
  return {
    searchBanner,
    searchResults,
    eventCard,
  };
};
