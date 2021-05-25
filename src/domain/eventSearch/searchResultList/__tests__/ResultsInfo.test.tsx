import * as React from 'react';

import { render, screen, userEvent, waitFor } from '../../../../test/testUtils';
import { ROUTES } from '../../../app/routes/constants';
import ResultsInfo from '../ResultsInfo';

test('events with 0 results matches snapshot for no results', () => {
  const { container } = render(
    <ResultsInfo resultsCount={0} eventType="event" />
  );

  expect(container).toMatchSnapshot();
});

test('events with 1 results matches snapshot of few results', () => {
  const { container } = render(
    <ResultsInfo resultsCount={1} eventType="event" />
  );

  expect(container).toMatchSnapshot();
});

test('events with 5 results matches snapshot of normal results', () => {
  const { container } = render(
    <ResultsInfo resultsCount={5} eventType="event" />
  );

  expect(container).toMatchSnapshot();
});

test('renders no events found text and hobby search button', async () => {
  const { history } = render(
    <ResultsInfo resultsCount={0} eventType="event" />
  );
  const historyPush = jest.spyOn(history, 'push');

  const texts = [
    'Valitsemillasi hakuehdoilla ei löytynyt yhtään tapahtumaa',
    'Valitsemillasi hakuehdoilla ei löytynyt tapahtumia. Kokeile muuttaa hakuehtoja tai siirry harrastusten hakuun.',
  ];

  texts.forEach((text) => {
    expect(screen.queryByText(text)).toBeInTheDocument();
  });

  userEvent.click(
    screen.queryByRole('button', { name: 'Siirry hakemaan harrastuksia' })
  );

  await waitFor(() => {
    expect(historyPush).toHaveBeenCalledWith(`/fi${ROUTES.COURSES}`);
  });
});

test('renders no courses found text and event search button', async () => {
  const { history } = render(
    <ResultsInfo resultsCount={0} eventType="course" />
  );
  const historyPush = jest.spyOn(history, 'push');

  const texts = [
    'Valitsemillasi hakuehdoilla ei löytynyt yhtään harrastusta',
    'Valitsemillasi hakuehdoilla ei löytynyt harrastuksia. Kokeile muuttaa hakuehtoja tai siirry tapahtumien hakuun.',
  ];

  texts.forEach((text) => {
    expect(screen.queryByText(text)).toBeInTheDocument();
  });

  userEvent.click(
    screen.queryByRole('button', { name: 'Siirry hakemaan tapahtumia' })
  );

  await waitFor(() => {
    expect(historyPush).toHaveBeenCalledWith(`/fi${ROUTES.EVENTS}`);
  });
});

test.each([1, 4])(
  'renders few events found text and hobby search button when event count is %i',
  async (resultsCount) => {
    const { history } = render(
      <ResultsInfo resultsCount={resultsCount} eventType="event" />
    );
    const historyPush = jest.spyOn(history, 'push');

    const texts = [
      'Hakuehdoillasi löytyi vain vähän tapahtumia.',
      'Valitsemillasi hakuehdoilla löytyi vain vähän tapahtumia. ' +
        'Kokeile muuttaa hakuehtoja tai siirry harrastusten hakuun.',
    ];

    texts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    userEvent.click(
      screen.queryByRole('button', { name: 'Siirry hakemaan harrastuksia' })
    );

    await waitFor(() => {
      expect(historyPush).toHaveBeenCalledWith(`/fi${ROUTES.COURSES}`);
    });
  }
);

test.each([1, 4])(
  'renders few courses found text and event search button when course count is %i',
  async (resultsCount) => {
    const { history } = render(
      <ResultsInfo resultsCount={resultsCount} eventType="course" />
    );
    const historyPush = jest.spyOn(history, 'push');

    const texts = [
      'Valitsemillasi hakuehdoilla löytyi vain vähän hakutuloksia.',
      'Valitsemillasi hakuehdoilla löytyi vain vähän harrastuksia. ' +
        'Kokeile muuttaa hakuehtoja tai siirry tapahtumien hakuun.',
    ];

    texts.forEach((text) => {
      expect(screen.queryByText(text)).toBeInTheDocument();
    });

    userEvent.click(
      screen.queryByRole('button', { name: 'Siirry hakemaan tapahtumia' })
    );

    await waitFor(() => {
      expect(historyPush).toHaveBeenCalledWith(`/fi${ROUTES.EVENTS}`);
    });
  }
);
