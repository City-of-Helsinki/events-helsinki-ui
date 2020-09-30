import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import {
  EventListDocument,
  NeighborhoodListDocument,
  PlaceListDocument,
} from '../../../generated/graphql';
import {
  fakeEvents,
  fakeNeighborhoods,
  fakePlaces,
} from '../../../util/mockDataUtils';
import { render } from '../../../util/testUtils';
import EventSearchPageContainer from '../EventSearchPageContainer';

const meta = {
  count: 20,
  next:
    'https://api.hel.fi/linkedevents/v1/event/?division=kunta%3Ahelsinki&include=keywords%2Clocation&language=fi&page=2&page_size=10&sort=end_time&start=2020-08-12T17&super_event_type=umbrella%2Cnone&text=jazz',
  previous: null,
  __typename: 'Meta',
};
const mockEventsResponse = { ...fakeEvents(10), meta };
const mockEventsLoadMoreResponse = {
  ...fakeEvents(10),
  meta: { ...meta, next: null },
};
const eventListVariables = {
  combinedText: ['jazz'],
  division: ['kunta:helsinki'],
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keyword: [],
  keywordAnd: [],
  keywordNot: [],
  language: 'fi',
  location: [],
  pageSize: 10,
  publisher: null,
  sort: 'end_time',
  start: '2020-08-12T00',
  startsAfter: undefined,
  superEventType: ['umbrella', 'none'],
};

const neighborhoodsResponse = fakeNeighborhoods(10);

const placesResponse = fakePlaces(10);

const mocks = [
  {
    request: {
      query: EventListDocument,
      variables: {
        ...eventListVariables,
      },
    },
    result: { data: { eventList: mockEventsResponse } },
  },
  {
    request: {
      query: EventListDocument,
      variables: {
        ...eventListVariables,
        page: 2,
      },
    },
    result: { data: { eventList: mockEventsLoadMoreResponse } },
  },

  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: {
      data: {
        neighborhoodList: neighborhoodsResponse,
      },
    },
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
    result: {
      data: {
        placeList: placesResponse,
      },
    },
  },
];

afterAll(() => {
  clear();
});

it('all the event cards should be visible and load more button should load more events', async () => {
  advanceTo(new Date(2020, 7, 12));
  render(<EventSearchPageContainer />, {
    mocks,
    routes: ['/fi/events?text=jazz'],
  });

  await waitFor(() => {
    expect(
      screen.getByText(mockEventsResponse.data[0].name.fi)
    ).toBeInTheDocument();
  });

  mockEventsResponse.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.buttonLoadMore.replace(
        '{{count}}',
        (
          mockEventsResponse.meta.count - mockEventsResponse.data.length
        ).toString()
      ),
    })
  );

  await waitFor(() => {
    expect(
      screen.getByText(mockEventsLoadMoreResponse.data[0].name.fi)
    ).toBeInTheDocument();
  });

  mockEventsLoadMoreResponse.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });
});
