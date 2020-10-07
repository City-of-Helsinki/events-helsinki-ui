import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  CollectionFieldsFragment,
  EventListDocument,
} from '../../../../generated/graphql';
import { fakeCollection, fakeEvents } from '../../../../util/mockDataUtils';
import { render, screen, userEvent, waitFor } from '../../../../util/testUtils';
import EventList from '../EventList';

const eventListTitle = 'Event list title';

const meta = {
  count: 20,
  next:
    'https://api.hel.fi/linkedevents/v1/event/?page=2&sort=start_time&start=2020-10-05T03',
  previous: null,
  __typename: 'Meta',
};

const events = fakeEvents(10);

const eventsResponse = {
  data: {
    eventList: {
      ...events,
      meta,
    },
  },
};

const loadMoreEvents = fakeEvents(10);

const loadMoreEventsResponse = {
  data: {
    eventList: {
      ...loadMoreEvents,
      meta: { ...meta, next: null },
    },
  },
};

const variables = {
  combinedText: ['jooga'],
  division: ['kunta:helsinki'],
  end: '',
  include: ['keywords', 'location'],
  isFree: true,
  keyword: [],
  keywordAnd: [],
  keywordNot: [],
  language: 'fi',
  location: [],
  pageSize: 10,
  publisher: null,
  sort: 'end_time',
  start: 'now',
  startsAfter: undefined,
  superEventType: ['umbrella', 'none'],
};

const mocks = [
  {
    request: {
      query: EventListDocument,
      variables,
    },
    result: eventsResponse,
  },
  {
    request: {
      query: EventListDocument,
      variables: { ...variables, page: 2 },
    },
    result: loadMoreEventsResponse,
  },
];

afterAll(() => {
  clear();
});

test('should show event list correctly', async () => {
  advanceTo('2020-10-03');
  const collection = fakeCollection({
    eventListTitle: { fi: eventListTitle },
  }) as CollectionFieldsFragment;

  render(<EventList collection={collection} />, {
    mocks,
  });

  await waitFor(() => {
    expect(
      screen.queryByRole('heading', { name: eventListTitle })
    ).toBeInTheDocument();
  });

  events.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.buttonLoadMore.replace('{{count}}', '10'),
    })
  );

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  loadMoreEvents.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });
});

test('should not show event list when eventListQuery is empty string', async () => {
  advanceTo('2020-10-03');

  const collection = fakeCollection({
    eventListQuery: { fi: '' },
    eventListTitle: { fi: eventListTitle },
  }) as CollectionFieldsFragment;

  render(<EventList collection={collection} />, {
    mocks,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(
    screen.queryByRole('heading', { name: eventListTitle })
  ).not.toBeInTheDocument();
});
