import * as React from 'react';

import * as useLocale from '../../../../hooks/useLocale';
import { render, screen, userEvent, waitFor } from '../../../../test/testUtils';
import { Language } from '../../../../types';
import { ROUTES } from '../../../app/routes/constants';
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
  'renders few events found text when event count is %i',
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

it.each<[Language, number]>([
  ['en', 4],
  ['en', 0],
  ['sv', 0],
])(
  'renders language change button under search results when current language is %s and there are %i %s search items',
  async (language, resultsCount) => {
    jest.spyOn(useLocale, 'default').mockReturnValue(language);

    const { history } = render(<ResultsInfo resultsCount={resultsCount} />);
    const historyPush = jest.spyOn(history, 'push');

    userEvent.click(
      screen.queryByRole('button', { name: 'Näytä hakutulokset suomeksi' })
    );

    await waitFor(() => {
      expect(historyPush).toHaveBeenCalledWith(`/fi${ROUTES.EVENTS}`);
    });
  }
);

it('renders does not render language change button under eventss search results when current language is Finnish', () => {
  jest.spyOn(useLocale, 'default').mockReturnValue('fi');

  render(<ResultsInfo resultsCount={0} />);

  expect(
    screen.queryByRole('button', { name: 'Näytä hakutulokset suomeksi' })
  ).not.toBeInTheDocument();
});
