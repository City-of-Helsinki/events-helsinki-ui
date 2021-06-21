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
} from '../../../test/mockDataUtils';
import {
  act,
  actWait,
  configure,
  render,
  screen,
  userEvent,
} from '../../../test/testUtils';
import { additionalDivisions } from '../../neighborhood/additionalDivisions';
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

const pathname = '/fi/events';
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

test('for accessibility violations', async () => {
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

  await screen.findByRole('option', { name: /musiikkiklubit/i });

  act(() =>
    userEvent.click(screen.getByRole('button', { name: /tyhjennä hakuehdot/i }))
  );

  expect(searchInput).toHaveValue('');
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('');
});

test('should change search query after clicking autosuggest menu item', async () => {
  const { history } = renderComponent();

  const searchInput = screen.getByRole('textbox', { name: /mitä etsit\?/i });
  userEvent.type(searchInput, searchValue);

  const option = await screen.findByRole('option', { name: /musiikkiklubit/i });
  act(() => userEvent.click(option));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe(`?text=jazz,musiikkiklubit`);

  //  Should add menu item only once
  userEvent.type(searchInput, searchValue);
  act(() =>
    userEvent.click(screen.getByRole('option', { name: /musiikkiklubit/i }))
  );

  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe(`?text=jazz,musiikkiklubit`);
});

test('should change search query after checking only children events checkbox', async () => {
  const { history } = renderComponent();

  const onlyChildrenEventsCheckbox = await screen.findByRole('checkbox', {
    name: /näytä vain lastentapahtumat/i,
  });

  userEvent.click(onlyChildrenEventsCheckbox);

  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?onlyChildrenEvents=true&text=jazz');
});

test('should change search query after checking only evening events checkbox', async () => {
  const { history } = renderComponent();

  const onlyEveningEventsCheckbox = await screen.findByRole('checkbox', {
    name: /näytä vain iltatapahtumat/i,
  });

  userEvent.click(onlyEveningEventsCheckbox);

  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?onlyEveningEvents=true&text=jazz');
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

test('should change search query after selecting today date type and pressing submit button', async () => {
  const { history } = renderComponent();

  const chooseDateButton = await screen.findByRole('button', {
    name: /valitse ajankohta/i,
  });

  userEvent.click(chooseDateButton);
  userEvent.click(screen.getByRole('checkbox', { name: /tänään/i }));

  act(() => userEvent.click(screen.getByRole('button', { name: /hae/i })));
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
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?start=2020-10-06&text=jazz');
});

test('should change search query after clicking category menu item', async () => {
  const { history } = renderComponent();

  const chooseCategoryButton = await screen.findByRole('button', {
    name: /valitse kategoria/i,
  });

  userEvent.click(chooseCategoryButton);
  userEvent.click(screen.getByRole('checkbox', { name: /elokuva/i }));

  act(() => userEvent.click(screen.getByRole('button', { name: /hae/i })));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?categories=movie&text=jazz');

  //multiple selection
  userEvent.click(chooseCategoryButton);
  userEvent.click(screen.getByRole('checkbox', { name: /musiikki/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /museot/i }));
  act(() => userEvent.click(screen.getByRole('button', { name: /hae/i })));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe(
    '?categories=movie,music,museum&text=jazz'
  );
});

test('should change search query with remote events checkbox', async () => {
  const { history } = renderComponent();

  const remoteEventsCheckbox = await screen.findByRole('checkbox', {
    name: /näytä vain etätapahtumat/i,
  });
  userEvent.click(remoteEventsCheckbox);

  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?onlyRemoteEvents=true&text=jazz');
});

test('disivions dropdown has additional divisions', async () => {
  renderComponent();

  const chooseCategoryButton = await screen.findByRole('button', {
    name: /etsi alue/i,
  });
  userEvent.click(chooseCategoryButton);

  additionalDivisions.forEach((divisionName) => {
    expect(
      screen.getByRole('checkbox', {
        name: divisionName.name.fi,
      })
    ).toBeInTheDocument();
  });
});
