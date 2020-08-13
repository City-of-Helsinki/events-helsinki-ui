import { MockedProvider } from '@apollo/react-testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';
import { MemoryRouter } from 'react-router';

import mockEventSearchLoadMoreResponse from '../__mocks__/eventSearchLoadMoreResponse';
import mockEventSearchResponse from '../__mocks__/eventSearchResponse';
import translations from '../../../common/translation/i18n/fi.json';
import {
  EventListDocument,
  NeighborhoodListDocument,
  PlaceListDocument,
} from '../../../generated/graphql';
import neighborhoodListResponse from '../../neighborhood/__mocks__/neighborhoodListResponse';
import placeListResponse from '../../place/__mocks__/placeListResponse';
import EventSearchPageContainer from '../EventSearchPageContainer';

const mocks = [
  {
    request: {
      query: EventListDocument,
      variables: {
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
        superEventType: ['umbrella', 'none'],
        text: 'jazz',
      },
    },
    result: mockEventSearchResponse,
  },
  {
    request: {
      query: EventListDocument,
      variables: {
        division: ['kunta:helsinki'],
        end: '',
        include: ['keywords', 'location'],
        isFree: undefined,
        keyword: [],
        keywordAnd: [],
        keywordNot: [],
        language: 'fi',
        location: [],
        page: 2,
        pageSize: 10,
        publisher: null,
        sort: 'end_time',
        start: '2020-08-12T00',
        superEventType: ['umbrella', 'none'],
        text: 'jazz',
      },
    },
    result: mockEventSearchLoadMoreResponse,
  },

  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: neighborhoodListResponse,
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
    result: placeListResponse,
  },
];

afterAll(() => {
  clear();
});

it('all the event cards should be visible and load more button should load more events', async () => {
  advanceTo(new Date(2020, 7, 12));
  render(
    <MockedProvider mocks={mocks}>
      <MemoryRouter initialEntries={['/fi/events?text=jazz']}>
        <EventSearchPageContainer />
      </MemoryRouter>
    </MockedProvider>
  );

  await waitFor(() => {
    expect(
      screen.getAllByText(
        mockEventSearchResponse.data.eventList.data[0].name.fi
      ).length
    ).toBeGreaterThan(1);
  });

  mockEventSearchResponse.data.eventList.data.forEach(event => {
    expect(screen.getAllByText(event.name.fi).length).toBeGreaterThan(1);
  });

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.buttonLoadMore,
    })
  );

  await waitFor(() => {
    expect(
      screen.getAllByText(
        mockEventSearchLoadMoreResponse.data.eventList.data[0].name.fi
      ).length
    ).toBeGreaterThan(1);
  });

  mockEventSearchLoadMoreResponse.data.eventList.data.forEach(event => {
    expect(screen.getAllByText(event.name.fi).length).toBeGreaterThan(1);
  });
});
