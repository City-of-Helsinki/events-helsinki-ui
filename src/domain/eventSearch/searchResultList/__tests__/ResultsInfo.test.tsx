import * as React from 'react';

import * as useLocale from '../../../../hooks/useLocale';
import { render, screen, userEvent, waitFor } from '../../../../test/testUtils';
import { Language } from '../../../../types';
import { ROUTES } from '../../../app/routes/constants';
import { EventType } from '../../../event/types';
import ResultsInfo from '../ResultsInfo';

test('events with 0 results matches snapshot for no results', () => {
  const { container } = render(
    <ResultsInfo resultsCount={0} eventType="event" />
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

it.each<[Language, number, EventType, string]>([
  ['en', 4, 'event', `/fi${ROUTES.EVENTS}`],
  ['en', 0, 'event', `/fi${ROUTES.EVENTS}`],
  ['en', 4, 'course', `/fi${ROUTES.COURSES}`],
  ['en', 0, 'course', `/fi${ROUTES.COURSES}`],
  ['sv', 0, 'event', `/fi${ROUTES.EVENTS}`],
  ['sv', 0, 'course', `/fi${ROUTES.COURSES}`],
])(
  'renders language change button under search results when current language is %s and there are %i %s search items',
  async (language, resultsCount, eventType, finalRoute) => {
    jest.spyOn(useLocale, 'default').mockReturnValue(language);

    const { history } = render(
      <ResultsInfo resultsCount={resultsCount} eventType={eventType} />
    );
    const historyPush = jest.spyOn(history, 'push');

    userEvent.click(
      screen.queryByRole('button', { name: 'Näytä hakutulokset suomeksi' })
    );

    await waitFor(() => {
      expect(historyPush).toHaveBeenCalledWith(finalRoute);
    });
  }
);

it.each<EventType>(['event', 'course'])(
  'renders does not render language change button under %s search results when current language is Finnish',
  (eventType) => {
    jest.spyOn(useLocale, 'default').mockReturnValue('fi');

    render(<ResultsInfo resultsCount={0} eventType={eventType} />);

    expect(
      screen.queryByRole('button', { name: 'Näytä hakutulokset suomeksi' })
    ).not.toBeInTheDocument();
  }
);
