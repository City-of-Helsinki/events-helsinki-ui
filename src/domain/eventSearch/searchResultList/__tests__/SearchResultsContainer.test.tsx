/* eslint-disable jest/no-conditional-expect */
import React from 'react';

import { setFeatureFlags } from '../../../../test/feature-flags/featureFlags.test.utils';
import { render, screen } from '../../../../test/testUtils';
import { EventType } from '../../../event/types';
import SearchResultsContainer from '../SearchResultsContainer';

beforeEach(() => {
  setFeatureFlags({ EVENTS_HELSINKI_2: true });
});

it.each<[number, EventType, string]>([
  [0, 'event', 'Valitsemillasi hakuehdoilla ei löytynyt yhtään tapahtumaa'],
  [1, 'event', 'Hakuehdoillasi löytyi vain vähän tapahtumia.'],
  [4, 'event', 'Hakuehdoillasi löytyi vain vähän tapahtumia.'],
  [0, 'course', 'Valitsemillasi hakuehdoilla ei löytynyt yhtään harrastusta'],
  [1, 'course', 'Valitsemillasi hakuehdoilla löytyi vain vähän hakutuloksia.'],
  [4, 'course', 'Valitsemillasi hakuehdoilla löytyi vain vähän hakutuloksia.'],
])(
  'should return the proper results info text if %i %s results are found',
  (eventsCount, eventType, infoText) => {
    render(
      <SearchResultsContainer
        eventList={<div />}
        eventsCount={eventsCount}
        eventType={eventType}
        loading={false}
      />
    );
    expect(screen.getByText(`${eventsCount} hakutulosta`)).toBeInTheDocument();

    expect(screen.getByText(infoText)).toBeInTheDocument();

    if (eventType === 'course') {
      expect(
        screen.queryByRole('button', { name: 'Siirry hakemaan tapahtumia' })
      ).toBeInTheDocument();
    } else {
      expect(
        screen.queryByRole('button', { name: 'Siirry hakemaan harrastuksia' })
      ).toBeInTheDocument();
    }
  }
);

it('should not return any results info if more than 5 or more results are found', async () => {
  render(
    <SearchResultsContainer
      eventList={<div />}
      eventsCount={5}
      eventType="event"
      loading={false}
    />
  );

  expect(screen.getByText('5 hakutulosta')).toBeInTheDocument();

  ['Siirry hakemaan harrastuksia', 'Siirry hakemaan tapahtumia'].forEach(
    (actionButtonText) => {
      expect(
        screen.queryByRole('button', { name: actionButtonText })
      ).not.toBeInTheDocument();
    }
  );
});
