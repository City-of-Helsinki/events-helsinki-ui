/* eslint-disable jest/no-conditional-expect */
import React from 'react';

import { render, screen } from '../../../../test/testUtils';
import SearchResultsContainer from '../SearchResultsContainer';

it.each<[number, string]>([
  [0, 'Valitsemillasi hakuehdoilla ei löytynyt yhtään tapahtumaa'],
  [1, 'Hakuehdoillasi löytyi vain vähän tapahtumia.'],
  [4, 'Hakuehdoillasi löytyi vain vähän tapahtumia.'],
])(
  'should return the proper results info text if %i %s results are found',
  (eventsCount, infoText) => {
    render(
      <SearchResultsContainer
        eventList={<div />}
        eventsCount={eventsCount}
        loading={false}
      />
    );
    expect(screen.getByText(`${eventsCount} hakutulosta`)).toBeInTheDocument();
    expect(screen.getByText(infoText)).toBeInTheDocument();
  }
);

it('should not return any results info if more than 5 or more results are found', async () => {
  render(
    <SearchResultsContainer
      eventList={<div />}
      eventsCount={5}
      loading={false}
    />
  );

  expect(screen.getByText('5 hakutulosta')).toBeInTheDocument();

  ['Siirry hakemaan tapahtumia'].forEach((actionButtonText) => {
    expect(
      screen.queryByRole('button', { name: actionButtonText })
    ).not.toBeInTheDocument();
  });
});
