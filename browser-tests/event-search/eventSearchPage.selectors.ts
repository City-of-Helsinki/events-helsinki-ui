/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { screen, within } from '@testing-library/testcafe';

import { getEventFields } from '../../src/domain/event/EventUtils';
import { KeywordOption } from '../../src/domain/event/types';
import getDateRangeStr from '../../src/util/getDateRangeStr';
import {
  EventFieldsFragment,
  Neighborhood,
  PlaceFieldsFragment,
} from '../utils/generated/graphql';
export const selectors = {
  neighbourhoodFilter: screen.findByLabelText('Etsi alue'),
  neighbourhoodCheckbox: (n: Neighborhood) =>
    screen.findByRole('checkbox', { name: n.name.fi }),
  placeFilter: screen.findByLabelText('Etsi tapahtumapaikka'),
  placeSearchInput: screen.findByLabelText('Kirjoita hakusana'),
  placeCheckbox: (place: PlaceFieldsFragment) =>
    screen.findByRole('checkbox', { name: place.name.fi }),
  searchInput: screen.findByPlaceholderText(
    'Kirjoita hakusana, esim. rock tai jooga'
  ),
  eventNotFoundText: screen.findByText(
    'Voi vitsi, valitsemillasi hakuehdoilla ei löytynyt yhtään hakutulosta'
  ),
  forEventCard: (event: EventFieldsFragment) => {
    const withinEventCard = () => within(screen.getByTestId(event.id));

    const {
      startTime,
      endTime,
      locationName,
      streetAddress,
      addressLocality,
    } = getEventFields(event, 'fi');
    return {
      eventTitleLink: () =>
        withinEventCard().getByRole('link', {
          name: new RegExp(event.name.fi, 'g'),
        }),
      keywordLink: (keyword: KeywordOption) =>
        withinEventCard().getByRole('button', { name: keyword.name }),
      dateRangeText: () =>
        withinEventCard().getByText(
          getDateRangeStr({
            start: startTime,
            end: endTime,
            locale: 'fi',
            includeTime: true,
            timeAbbreviation: 'klo',
          })
        ),
      addressText: () =>
        withinEventCard().getByText(
          `${locationName}, ${streetAddress}, ${addressLocality}`
        ),
    };
  },
};
