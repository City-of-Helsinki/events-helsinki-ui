import * as React from 'react';

import { render, screen } from '../../../../test/testUtils';
import ResultsInfo from '../ResultsInfo';

test('matches snapshot', () => {
  const { container } = render(
    <ResultsInfo resultsCount={0} eventType="event" />
  );

  expect(container).toMatchSnapshot();
});

test('renders no events found text and hobby search button', () => {
  render(<ResultsInfo resultsCount={0} eventType="event" />);

  const texts = [
    'Valitsemillasi hakuehdoilla ei löytynyt yhtään tapahtumaa',
    'Valitsemillasi hakuehdoilla ei löytynyt tapahtumia. Kokeile muuttaa hakuehtoja tai siirry harrastusten hakuun.',
  ];

  texts.forEach((text) => {
    expect(screen.queryByText(text)).toBeInTheDocument();
  });

  expect(
    screen.queryByRole('button', { name: 'Etsi hakutuloksia harrastuksista' })
  ).toBeInTheDocument();
});

test('renders no courses found text and event search button', () => {
  render(<ResultsInfo resultsCount={0} eventType="course" />);

  const texts = [
    'Valitsemillasi hakuehdoilla ei löytynyt yhtään harrastusta',
    'Valitsemillasi hakuehdoilla ei löytynyt harrastuksia. Kokeile muuttaa hakuehtoja tai siirry tapahtumien hakuun.',
  ];

  texts.forEach((text) => {
    expect(screen.queryByText(text)).toBeInTheDocument();
  });

  expect(
    screen.queryByRole('button', { name: 'Etsi hakutuloksia tapahtumista' })
  ).toBeInTheDocument();
});

// TODO: add more test for different cases (0 < resultsCount < 5) + that action buttons work correctly
