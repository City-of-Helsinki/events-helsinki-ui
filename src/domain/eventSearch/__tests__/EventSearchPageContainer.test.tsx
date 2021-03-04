/* eslint-disable no-console */
import { MockedResponse } from '@apollo/react-testing';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';
import routeData from 'react-router';
import { scroller } from 'react-scroll';
import { toast } from 'react-toastify';

import translations from '../../../common/translation/i18n/fi.json';
import {
  Meta,
  NeighborhoodListDocument,
  PlaceListDocument,
} from '../../../generated/graphql';
import {
  createEventListRequestAndResultMocks,
  createEventListRequestThrowsErrorMocks,
} from '../../../test/apollo-mocks/eventListMocks';
import {
  fakeEvents,
  fakeNeighborhoods,
  fakePlaces,
} from '../../../test/mockDataUtils';
import { render } from '../../../test/testUtils';
import EventSearchPageContainer from '../EventSearchPageContainer';

const meta: Meta = {
  count: 20,
  next:
    // eslint-disable-next-line max-len
    'https://api.hel.fi/linkedevents/v1/event/?division=kunta%3Ahelsinki&include=keywords%2Clocation&language=fi&page=2&page_size=10&sort=end_time&start=2020-08-12T17&super_event_type=umbrella%2Cnone&text=jazz',
  previous: null,
  __typename: 'Meta',
};
const eventsResponse = { ...fakeEvents(10), meta };

const eventsLoadMoreResponse = {
  ...fakeEvents(10),
  meta: { ...meta, next: null },
};

const neighborhoodsResponse = {
  data: {
    neighborhoodList: fakeNeighborhoods(10),
  },
};

const placesResponse = {
  data: {
    placeList: fakePlaces(10),
  },
};

const searchJazzMocks = [
  createEventListRequestAndResultMocks(
    { allOngoingAnd: ['jazz'] },
    eventsResponse
  ),
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

const searchJazzThenClickLoadMoreMocks = [
  ...searchJazzMocks,
  createEventListRequestAndResultMocks(
    { allOngoingAnd: ['jazz'], page: 2 },
    eventsLoadMoreResponse
  ),
];
const searchJazzThenClickLoadMoreThrowsErrorMock = createEventListRequestThrowsErrorMocks();

afterAll(() => {
  clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

const pathname = '/fi/events';
const search = '?text=jazz';
const testRoute = `${pathname}${search}`;
const routes = [testRoute];

const renderComponent = (
  mocks: MockedResponse[] = searchJazzThenClickLoadMoreMocks
) =>
  render(<EventSearchPageContainer />, {
    mocks,
    routes,
  });

it('all the event cards should be visible and load more button should load more events', async () => {
  advanceTo(new Date(2020, 7, 12));
  renderComponent();

  await waitFor(() => {
    expect(
      screen.getByText(eventsResponse.data[0].name.fi)
    ).toBeInTheDocument();
  });

  eventsResponse.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.buttonLoadMore.replace(
        '{{count}}',
        (eventsResponse.meta.count - eventsResponse.data.length).toString()
      ),
    })
  );

  await waitFor(() => {
    expect(
      screen.getByText(eventsLoadMoreResponse.data[0].name.fi)
    ).toBeInTheDocument();
  });

  eventsLoadMoreResponse.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });
});

it('should show toastr message when loading next event page fails', async () => {
  toast.error = jest.fn();
  const mocks = [
    ...searchJazzMocks,
    searchJazzThenClickLoadMoreThrowsErrorMock,
  ];

  renderComponent(mocks);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.buttonLoadMore.replace(
        '{{count}}',
        (eventsResponse.meta.count - eventsResponse.data.length).toString()
      ),
    })
  );

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(toast.error).toBeCalledWith(translations.eventSearch.errorLoadMode);
});

it('should scroll to event defined in react-router location state', async () => {
  scroller.scrollTo = jest.fn();
  const mockLocation = {
    pathname,
    hash: '',
    search,
    state: { eventId: eventsResponse.data[0].id },
  };
  jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

  renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(scroller.scrollTo).toBeCalled();
});

it('should not scroll to result list on large screen', async () => {
  scroller.scrollTo = jest.fn();
  const mockLocation = {
    pathname,
    hash: '',
    search,
    state: { scrollToResults: true },
  };
  jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

  renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(scroller.scrollTo).not.toBeCalled();
});

it('should scroll to result list on mobile screen', async () => {
  global.innerWidth = 500;
  scroller.scrollTo = jest.fn();

  const mockLocation = {
    pathname,
    hash: '',
    search,
    state: { scrollToResults: true },
  };
  jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

  renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(scroller.scrollTo).toBeCalled();
});

it('scrolls to eventcard and calls history.replace correctly (deletes eventId from state)', async () => {
  const history = createMemoryHistory();
  const historyObject = {
    search: '?dateTypes=tomorrow,this_week',
    state: { eventId: '123' },
    pathname: '/fi/events',
  };
  history.push(historyObject);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
  const replaceSpy = jest.spyOn(history, 'replace');

  render(<EventSearchPageContainer />, {
    mocks: searchJazzMocks,
    routes,
    history,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(replaceSpy).toHaveBeenCalledWith(
    expect.objectContaining({
      search: historyObject.search,
      pathname: historyObject.pathname,
    })
  );
});

//it('searches events correctly with event place in path, e.g. /fi/annantalo', () => {});
