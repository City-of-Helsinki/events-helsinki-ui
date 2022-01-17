import * as React from 'react';

import * as useLocale from '../../../../hooks/useLocale';
import { render, screen, userEvent, waitFor } from '../../../../test/testUtils';
import { Language } from '../../../../types';
import { ROUTES } from '../../../app/routes/constants';
import { EventType } from '../../../event/types';
import ResultsInfo from '../ResultsInfo';

test('events with 0 results matches snapshot for no results', () => {
  const { container } = render(<ResultsInfo resultsCount={0} />);

  expect(container).toMatchSnapshot();
});

test('renders no events found text', async () => {
  render(<ResultsInfo resultsCount={0} />);

  expect(
    screen.queryByText(
      'Valitsemillasi hakuehdoilla ei löytynyt yhtään tapahtumaa'
    )
  ).toBeInTheDocument();
});

test.each([1, 4])(
  'renders few events found text and hobby search button when event count is %i',
  async (resultsCount) => {
    render(<ResultsInfo resultsCount={resultsCount} />);

    const texts = [
      'Hakuehdoillasi löytyi vain vähän tapahtumia.',
      // 'Valitsemillasi hakuehdoilla löytyi vain vähän tapahtumia.',
    ];

    texts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  }
);

it.each<[Language, number, EventType, string]>([
  ['en', 4, 'event', `/fi${ROUTES.EVENTS}`],
  ['en', 0, 'event', `/fi${ROUTES.EVENTS}`],
  ['sv', 0, 'event', `/fi${ROUTES.EVENTS}`],
])(
  'renders language change button under search results when current language is %s and there are %i %s search items',
  async (language, resultsCount, eventType, finalRoute) => {
    jest.spyOn(useLocale, 'default').mockReturnValue(language);

    const { history } = render(<ResultsInfo resultsCount={resultsCount} />);
    const historyPush = jest.spyOn(history, 'push');

    userEvent.click(
      screen.queryByRole('button', { name: 'Näytä hakutulokset suomeksi' })
    );

    await waitFor(() => {
      expect(historyPush).toHaveBeenCalledWith(finalRoute);
    });
  }
);

it.each<EventType>(['event'])(
  'renders does not render language change button under %s search results when current language is Finnish',
  (eventType) => {
    jest.spyOn(useLocale, 'default').mockReturnValue('fi');

    render(<ResultsInfo resultsCount={0} />);

    expect(
      screen.queryByRole('button', { name: 'Näytä hakutulokset suomeksi' })
    ).not.toBeInTheDocument();
  }
);
