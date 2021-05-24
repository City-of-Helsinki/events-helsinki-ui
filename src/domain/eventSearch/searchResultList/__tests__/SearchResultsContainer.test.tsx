import React from 'react';

import { render, screen } from '../../../../test/testUtils';
import SearchResultsContainer from '../SearchResultsContainer';

it('should return no results text if no events is found', async () => {
  render(
    <SearchResultsContainer
      eventList={<div />}
      eventsCount={0}
      eventType="event"
      loading={false}
    />
  );

  expect(
    screen.getByText(
      'Valitsemillasi hakuehdoilla ei löytynyt yhtään tapahtumaa'
    )
  ).toBeInTheDocument();
});

// TODO: Maybe add interation test for ResultsInfo here or event better in EventSearchPageContainer :D
