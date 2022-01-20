import { advanceTo } from 'jest-date-mock';
import React from 'react';

import { KeywordListDocument } from '../../../../generated/graphql';
import { fakeKeywords } from '../../../../test/mockDataUtils';
import {
  act,
  actWait,
  configure,
  render,
  screen,
  userEvent,
} from '../../../../test/testUtils';
import LandingPageSearch from '../LandingPageSearch';

configure({ defaultHidden: true });

const searchValue = 'jaz';
const keywords = fakeKeywords(2, [
  { name: { fi: 'Jazz' } },
  { name: { fi: 'musiikkiklubit' } },
]);
const keywordsResponse = { data: { keywordList: keywords } };

const mocks = [
  {
    request: {
      query: KeywordListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 5,
        text: searchValue,
      },
    },
    result: keywordsResponse,
  },
];

test('should route to event search page after clicking submit button', async () => {
  const { history } = render(<LandingPageSearch />, { mocks });

  userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe(``);
});

test('should route to event search page with correct search query after clicking submit button', async () => {
  const { history } = render(<LandingPageSearch />, { mocks });

  const searchInput = screen.getByRole('textbox', { name: /mitä etsit\?/i });
  userEvent.type(searchInput, searchValue);

  // Check that auto-suggest menu is open
  expect(screen.getByText(/hakuehdotuksia/i)).toBeInTheDocument();

  act(() => userEvent.click(screen.getByRole('button', { name: /hae/i })));
  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe(`?text=${searchValue}`);
});

test('should route to event search page after clicking autosuggest menu item', async () => {
  const { history } = render(<LandingPageSearch />, { mocks });

  const searchInput = screen.getByRole('textbox', { name: /mitä etsit\?/i });
  userEvent.type(searchInput, searchValue);

  const option = await screen.findByRole('option', { name: /musiikkiklubit/i });
  act(() => userEvent.click(option));
  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe(`?text=musiikkiklubit`);
});

test('should route to event search page after clicking category', async () => {
  const { history } = render(<LandingPageSearch />, { mocks });

  userEvent.click(screen.getByText(/kulttuuri ja taide/i));

  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe('?categories=culture');
});

test('should route to event search page after selecting today date type and pressing submit button', async () => {
  const { history } = render(<LandingPageSearch />, { mocks });

  userEvent.click(screen.getByRole('button', { name: /valitse ajankohta/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /tänään/i }));

  act(() => userEvent.click(screen.getByRole('button', { name: /hae/i })));
  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe('?dateTypes=today');
});

test('should route to event search page after selecting start date and pressing submit button', async () => {
  advanceTo('2020-10-04');
  const { history } = render(<LandingPageSearch />, { mocks });

  userEvent.click(screen.getByRole('button', { name: /valitse ajankohta/i }));
  userEvent.click(
    // The reason to use getAllByRole is that there is also mobile date selector with same text,
    // which is hidden using css
    screen.getAllByRole('button', { name: /valitse päivät/i })[0]
  );
  userEvent.click(
    screen.getAllByRole('button', { name: /valitse päivämäärä/i })[0]
  );
  userEvent.click(
    screen.getByRole('button', {
      name: /lokakuu 6/i,
    })
  );
  // need to wait one useEffect cycle for date go take effect
  await actWait();

  act(() => userEvent.click(screen.getByRole('button', { name: /hae/i })));
  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe('?start=2020-10-06');
});
