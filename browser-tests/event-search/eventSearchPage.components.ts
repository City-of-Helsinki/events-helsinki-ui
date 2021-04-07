/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TestController from 'testcafe';

import translations from '../../src/common/translation/i18n/fi.json';
import { getEventFields } from '../../src/domain/event/EventUtils';
import { KeywordOption } from '../../src/domain/event/types';
import { formatDate } from '../../src/util/dateUtils';
import getDateRangeStr from '../../src/util/getDateRangeStr';
import toPascalCase from '../../src/util/toPascalCase';
import { getCommonComponents } from '../common.components';
import { getExpectedEventContext } from '../utils/event.utils';
import {
  EventFieldsFragment,
  Neighborhood,
  PlaceFieldsFragment,
} from '../utils/generated/graphql';
import {
  getErrorMessage,
  screenContext,
  setDataToPrintOnFailure,
  withinContext,
} from '../utils/testcafe.utils';

export const getEventSearchPage = (t: TestController) => {
  const within = withinContext(t);
  const screen = screenContext(t);
  const pageIsLoaded = async () =>
    await getCommonComponents(t)
      .loadingSpinner()
      .expectations.isNotPresent({ timeout: 20000 });
  const findSearchBanner = async () => {
    await t
      .expect(screen.findByTestId('searchContainer').exists)
      .ok(await getErrorMessage(t));

    const withinSearchBanner = () =>
      within(screen.getByTestId('searchContainer'));
    const selectors = {
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
        setDataToPrintOnFailure(t, 'typeText', place.name.fi);
        await t
          .click(selectors.placeSearchInput())
          .pressKey('ctrl+a delete') // clears previous input
          .typeText(selectors.placeSearchInput(), place.name.fi)
          .click(selectors.placeCheckbox(place));
      },
      async inputSearchTextAndPressEnter(searchString: string) {
        setDataToPrintOnFailure(t, 'typeText', searchString);
        await t
          .typeText(selectors.searchInput(), searchString)
          .pressKey('enter');
      },
      async clickClearFiltersButton() {
        await t.click(selectors.clearFiltersButton());
      },
    };
    return {
      expectations,
      actions,
    };
  };
  const findSearchResultList = async () => {
    await t
      .expect(screen.findByTestId('resultList').exists)
      .ok(await getErrorMessage(t));

    const withinSearchResultList = () =>
      within(screen.getByTestId('resultList'));
    const selectors = {
      clickMoreButton() {
        return withinSearchResultList().findByRole('button', {
          name: /Näytä lisää tapahtumia/g,
        });
      },
    };
    const expectations = {
      async allEventCardsAreVisible(events: EventFieldsFragment[]) {
        for (const e of events) {
          await eventCard(e);
        }
      },
    };
    const actions = {
      async clickShowMoreEventsButton() {
        await t.click(selectors.clickMoreButton());
        await pageIsLoaded();
      },
    };
    const eventCard = async (
      event: EventFieldsFragment,
      searchedField?: keyof EventFieldsFragment
    ) => {
      setDataToPrintOnFailure(
        t,
        'expectedEvent',
        getExpectedEventContext(event)
      );
      const {
        startTime,
        endTime,
        locationName,
        streetAddress,
        addressLocality,
        keywords,
      } = getEventFields(event, 'fi');
      const eventCard = () => {
        return withinSearchResultList().getAllByTestId(event.id).nth(0);
      };
      const withinEventCard = () => within(eventCard());

      if (searchedField) {
        setDataToPrintOnFailure(
          t,
          'expectedEvent',
          getExpectedEventContext(event, searchedField)
        );
      }
      await pageIsLoaded();
      await t.expect(eventCard().exists).ok(await getErrorMessage(t));

      const selectors = {
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
          await t.click(eventCard());
        },
      };
      return {
        expectations,
        actions,
      };
    };
    return {
      expectations,
      actions,
      eventCard,
    };
  };

  return {
    findSearchBanner,
    findSearchResultList,
  };
};
