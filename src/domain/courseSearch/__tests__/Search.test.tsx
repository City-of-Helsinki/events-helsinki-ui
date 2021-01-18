import { axe } from 'jest-axe';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import {
  KeywordListDocument,
  NeighborhoodListDocument,
  PlaceListDocument,
} from '../../../generated/graphql';
import {
  fakeKeywords,
  fakeNeighborhoods,
  fakePlaces,
} from '../../../util/mockDataUtils';
import {
  actWait,
  configure,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../util/testUtils';
import Search from '../Search';

configure({ defaultHidden: true });

const searchValue = 'jaz';
const keywords = fakeKeywords(2, [
  { name: { fi: 'Jazz' } },
  { name: { fi: 'musiikkiklubit' } },
]);
const keywordsResponse = { data: { keywordList: keywords } };

const neighborhoodsResponse = {
  data: { neighborhoodList: fakeNeighborhoods(10) },
};
const placesResponse = { data: { placeList: fakePlaces(10) } };

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
  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: neighborhoodsResponse,
  },
  {
    request: {
      query: PlaceListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 10,
        text: '',
      },
    },
    result: placesResponse,
  },
];

const pathname = '/fi/courses';
const search = '?text=jazz';
const testRoute = `${pathname}${search}`;
const routes = [testRoute];

const renderComponent = () =>
  render(<Search scrollToResultList={jest.fn()} />, {
    mocks,
    routes,
  });

afterAll(() => {
  clear();
});

test('test for accessibility violations', async () => {
  const { container } = renderComponent();

  await actWait();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('should clear all filters and search field', async () => {
  const { history } = renderComponent();

  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe(search);

  const searchInput = screen.getByRole('textbox', { name: /mitä etsit\?/i });
  userEvent.type(searchInput, searchValue);

  await waitFor(() => {
    screen.getByRole('option', { name: /musiikkiklubit/i });
  });

  userEvent.click(screen.getByRole('button', { name: /tyhjennä hakuehdot/i }));

  expect(searchInput).toHaveValue('');
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('');
});

test('should change search query after clicking autosuggest menu item', async () => {
  const { history } = renderComponent();

  const searchInput = screen.getByRole('textbox', { name: /mitä etsit\?/i });
  userEvent.type(searchInput, searchValue);

  await waitFor(() => {
    screen.getByRole('option', { name: /musiikkiklubit/i });
  });

  userEvent.click(screen.getByRole('option', { name: /musiikkiklubit/i }));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe(`?text=jazz,musiikkiklubit`);

  //  Should add menu item only once
  userEvent.type(searchInput, searchValue);
  userEvent.click(screen.getByRole('option', { name: /musiikkiklubit/i }));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe(`?text=jazz,musiikkiklubit`);
});

test('should change search query after selecting today date type and pressing submit button', async () => {
  const { history } = renderComponent();

  const chooseDateButton = await screen.findByRole('button', {
    name: /valitse ajankohta/i,
  });

  userEvent.click(chooseDateButton);
  userEvent.click(screen.getByRole('checkbox', { name: /tänään/i }));

  userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?dateTypes=today&text=jazz');
});

test('should change search query after selecting start date and pressing submit button', async () => {
  advanceTo('2020-10-04');
  const { history } = renderComponent();

  const chooseDateButton = await screen.findByRole('button', {
    name: /valitse ajankohta/i,
  });

  userEvent.click(chooseDateButton);
  userEvent.click(
    // The reason to use getAllByRole is that there is also mobile date selector with same text,
    // which is hidden using css
    screen.getAllByRole('button', { name: /valitse päivät/i })[0]
  );
  userEvent.click(screen.getByRole('option', { name: /day-6/i }));

  userEvent.click(screen.getByRole('button', { name: /hae/i }));

  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?text=jazz&start=2020-10-06');
});

test('should change search query after checking is free checkbox', async () => {
  const { history } = renderComponent();

  const isFreeCheckbox = await screen.findByRole('checkbox', {
    name: /näytä vain maksuttomat/i,
  });

  userEvent.click(isFreeCheckbox);

  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?isFree=true&text=jazz');
});

test('should change search query after clicking category menu item', async () => {
  const { history } = renderComponent();

  const chooseCategoryButton = await screen.findByRole('button', {
    name: /valitse kategoria/i,
  });

  userEvent.click(chooseCategoryButton);
  userEvent.click(screen.getByRole('checkbox', { name: /elokuva/i }));

  userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?categories=movie&text=jazz');
});

test('should change search query after clicking hobby type menu item', async () => {
  const { history } = renderComponent();

  const chooseHobbyTypeButton = await screen.findByRole('button', {
    name: /harrastusmuoto/i,
  });

  userEvent.click(chooseHobbyTypeButton);
  userEvent.click(screen.getByRole('checkbox', { name: /kerhot/i }));

  userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?hobbyTypes=clubs&text=jazz');

  //multiple selection
  userEvent.click(chooseHobbyTypeButton);
  userEvent.click(screen.getByRole('checkbox', { name: /leirit/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /retket/i }));
  userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe(
    '?hobbyTypes=clubs,camps,trips&text=jazz'
  );
});

test('should change search query after clicking age limit menu item', async () => {
  const { history } = renderComponent();

  const chooseAgeLimitButton = await screen.findByRole('button', {
    name: /kohderyhmä/i,
  });

  userEvent.click(chooseAgeLimitButton);
  const minAgeInput = screen.getByRole('spinbutton', {
    name: /ikä alkaen/i,
  });
  const minAge = '10';
  userEvent.type(minAgeInput, minAge);

  userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?text=jazz&audienceMinAgeGt=10');

  userEvent.click(chooseAgeLimitButton);
  const maxAgeInput = screen.getByRole('spinbutton', {
    name: /ikä päättyen/i,
  });

  const maxAge = '20';
  userEvent.type(maxAgeInput, maxAge);

  userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe(
    '?text=jazz&audienceMinAgeGt=10&audienceMaxAgeLt=20'
  );

  //for default age value (18+)
  userEvent.click(chooseAgeLimitButton);
  userEvent.click(
    screen.getByRole('checkbox', {
      name: /näytä vain aikuisten harrastukset/i,
    })
  );

  userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?text=jazz&audienceMinAgeGt=18');
});
