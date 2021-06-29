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
  waitFor,
} from '../../../test/testUtils';
import { MAX_AGE, MIN_AGE } from '../../eventSearch/utils';
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

  act(() => userEvent.click(screen.getByRole('button', { name: /hae/i })));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?categories=movie_and_media&text=jazz');
});

test('should change search query after clicking hobby type menu item', async () => {
  const { history } = renderComponent();

  const chooseHobbyTypeButton = await screen.findByRole('button', {
    name: /harrastusmuoto/i,
  });

  userEvent.click(chooseHobbyTypeButton);
  userEvent.click(screen.getByRole('checkbox', { name: /kerhot/i }));

  act(() => userEvent.click(screen.getByRole('button', { name: /hae/i })));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe('?hobbyTypes=clubs&text=jazz');

  //multiple selection
  userEvent.click(chooseHobbyTypeButton);
  userEvent.click(screen.getByRole('checkbox', { name: /leirit/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /retket/i }));
  act(() => userEvent.click(screen.getByRole('button', { name: /hae/i })));
  expect(history.location.pathname).toBe(pathname);
  expect(history.location.search).toBe(
    '?hobbyTypes=clubs,camps,trips&text=jazz'
  );
});

test('beta notification is rendered when beta button is clicked', async () => {
  renderComponent();

  expectNotificationToNotBeRendered();
  clickBetaButton();
  expectBetanotificationToBeRendered();
  closeNotification();
  await expectNotificationToDisappear();

  /************************************/
  /* ONLY helper functions below this */
  /************************************/

  function clickBetaButton() {
    userEvent.click(
      screen.getByRole('button', {
        name: /Haluatko antaa meille palautetta harrastusten hakusivun kehitysversiosta/,
      })
    );
  }

  function expectNotificationToNotBeRendered() {
    const betaNotification = screen.queryByRole('region', {
      name: /notification/i,
    });
    expect(betaNotification).not.toBeInTheDocument();
  }

  function closeNotification() {
    const closeButton = screen.getByRole('button', {
      name: /sulje ilmoitus/i,
    });
    userEvent.click(closeButton);
  }

  function expectBetanotificationToBeRendered() {
    const betaNotification = screen.queryByRole('region', {
      name: /notification/i,
    });
    expect(betaNotification).toHaveTextContent(
      /Haluatko antaa meille palautetta harrastusten hakusivun kehitysversiosta\? Tästä pääset palautelomakkeeseen\./i
    );
  }

  async function expectNotificationToDisappear() {
    const betaNotification = screen.queryByRole('region', {
      name: /notification/i,
    });
    await waitFor(() => {
      expect(betaNotification).not.toBeInTheDocument();
    });
  }
});

describe('ageFilter', () => {
  const openAndSelectAgeFilterInputs = async () => {
    const chooseAgeLimitButton = await screen.findByRole('button', {
      name: 'Ikä',
    });
    userEvent.click(chooseAgeLimitButton);
    const begin = screen.getByRole('spinbutton', {
      name: /alkaen/i,
    });
    const end = screen.getByRole('spinbutton', {
      name: /päättyen/i,
    });
    return [begin, end];
  };

  const search = () => {
    act(() => userEvent.click(screen.getByRole('button', { name: /hae/i })));
  };

  const testBeginBadgeToBeInTheDocument = (age: string | number) => {
    expect(
      screen.getByText(new RegExp(`alkaen ${age} v`, 'i'))
    ).toBeInTheDocument();
  };

  const testEndBadgeToBeInTheDocument = (age: string | number) => {
    expect(
      screen.getByText(new RegExp(`päättyen ${age} v`, 'i'))
    ).toBeInTheDocument();
  };

  test('should change search query after clicking age limit menu item', async () => {
    const minAge = 10;
    const maxAge = 20;
    const { history } = renderComponent();
    const testLocation = (from: string | number, to: string | number) => {
      expect(history.location.pathname).toBe(pathname);
      expect(history.location.search).toBe(
        `?text=jazz&suitableFor=${from},${to}`
      );
    };

    /* Test with min input only */
    let [begin, end] = await openAndSelectAgeFilterInputs();
    expect(begin).toHaveValue(null);
    userEvent.type(begin, minAge.toString());
    search();
    testLocation(minAge, MAX_AGE);
    testBeginBadgeToBeInTheDocument(minAge);
    // don't show the bax value badge
    expect(screen.queryByText(/päättyen/i)).not.toBeInTheDocument();

    /* Add the max input */
    [begin, end] = await openAndSelectAgeFilterInputs();
    userEvent.clear(end);
    userEvent.type(end, maxAge.toString());
    search();
    testLocation(minAge, maxAge);
    testBeginBadgeToBeInTheDocument(minAge);
    testEndBadgeToBeInTheDocument(maxAge);

    /* Remove the min input and test with max input only */
    [begin] = await openAndSelectAgeFilterInputs();
    userEvent.clear(begin);
    search();
    testLocation(MIN_AGE, maxAge);
    // Don't show the min value badge
    expect(screen.queryByText(/alkaen/i)).not.toBeInTheDocument();
    testEndBadgeToBeInTheDocument(maxAge);

    /* Clear age inputs */
    [begin, end] = await openAndSelectAgeFilterInputs();
    userEvent.clear(begin);
    userEvent.clear(end);
    search();
    expect(history.location.pathname).toBe(pathname);
    expect(history.location.search).toBe('?text=jazz');
    expect(screen.queryByText(/alkaen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/päättyen/i)).not.toBeInTheDocument();

    /* Same value in both age inputs */
    [begin, end] = await openAndSelectAgeFilterInputs();
    userEvent.type(begin, minAge.toString());
    userEvent.type(end, minAge.toString());
    search();
    testLocation(minAge, minAge);
    expect(
      screen.getByText(new RegExp(`${minAge}-vuotiaalle`, 'i'))
    ).toBeInTheDocument();

    /* Show the age filter badges when age filter is active 
    and both the ends are at the limit */
    [begin, end] = await openAndSelectAgeFilterInputs();
    userEvent.clear(begin);
    userEvent.clear(end);
    userEvent.type(begin, MIN_AGE.toString());
    userEvent.type(end, MAX_AGE.toString());
    search();
    testLocation(MIN_AGE, MAX_AGE);
    testBeginBadgeToBeInTheDocument(MIN_AGE);
    testEndBadgeToBeInTheDocument(MAX_AGE);
  });
});
