/* eslint-disable jest/no-conditional-expect */
import { advanceTo, clear } from 'jest-date-mock';
import flow from 'lodash/flow';
import chunk from 'lodash/fp/chunk';
import map from 'lodash/fp/map';
import range from 'lodash/range';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  CollectionFieldsFragment,
  EventFieldsFragment,
  EventListResponse,
  EventsByIdsDocument,
  EventTypeId,
} from '../../../../generated/graphql';
import { setFeatureFlags } from '../../../../test/feature-flags/featureFlags.test.utils';
import { fakeCollection, fakeEvents } from '../../../../test/mockDataUtils';
import {
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../../test/testUtils';
import CuratedEvents, { eventsListTestId } from '../CuratedEvents';
import { PAGE_SIZE } from '../usePaginatedEventsByIdsQuery';

const eventIds = ['1', '2', '3', '4', '5'];
const curatedEvents = eventIds.map(
  (id) => `http://localhost:3000/fi/event/${id}`
);
const eventNames = eventIds.map((id) => `Event ${id}`);

const collection = fakeCollection({
  curatedEvents,
}) as CollectionFieldsFragment;

afterAll(() => {
  clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

[true, false].forEach((EVENTS_HELSINKI_2) => {
  test(`should show all events (EVENT_HELSINKI_2 feature is ${
    EVENTS_HELSINKI_2 ? 'on' : 'off'
  })`, async () => {
    setFeatureFlags({ EVENTS_HELSINKI_2 });
    const events = fakeEvents(
      eventNames.length,
      eventNames.map((event, index) => ({
        id: eventIds[index],
        name: { fi: event },
      }))
    );
    const eventsData = events.data as EventFieldsFragment[];
    const eventMocks = getMocks(eventsData, eventIds);

    render(<CuratedEvents collection={collection} />, {
      mocks: eventMocks,
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Test that both lists are

    const eventsList = within(screen.getByTestId(eventsListTestId));
    eventNames.forEach((eventName) => {
      expect(eventsList.getByText(eventName)).toBeInTheDocument();
    });
  });
});

/* 
TODO: TH-1166
Expired events section was decided to be left hidden, 
because it was a hit for usability and there were some issues 
with the pagination.
*/
test.skip('should show expired events', async () => {
  advanceTo('2020-10-05');

  const events = fakeEvents(
    eventNames.length,
    eventNames.map((event, index) => ({
      endTime: '2010-12-12',
      startTime: '2010-12-12',
      id: eventIds[index],
      name: { fi: event },
    }))
  );
  const eventsData = events.data as EventFieldsFragment[];
  const mocks = getMocks(
    eventsData,
    eventsData.map((event) => event.id)
  );

  render(<CuratedEvents collection={collection} />, {
    mocks,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(
    screen.getByText(translations.collection.titlePastRecommendations)
  ).toBeInTheDocument();
  // Should show only first 4 expired events
  expect(screen.getByText(eventNames[0])).toBeInTheDocument();
  expect(screen.getByText(eventNames[1])).toBeInTheDocument();
  expect(screen.getByText(eventNames[2])).toBeInTheDocument();
  expect(screen.getByText(eventNames[3])).toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', {
      name: translations.collection.buttonShowAllPastEvents,
    })
  );

  // Should show all past events
  eventNames.forEach((eventName) => {
    expect(screen.getByText(eventName)).toBeInTheDocument();
  });
});

test('event list pagination works', async () => {
  await paginationTest({ eventType: 'event' });
});

describe('EVENTS_HELSINKI_2 Feature flag', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('course list pagination works', async () => {
    setFeatureFlags({ EVENTS_HELSINKI_2: true });
    await paginationTest({ eventType: 'course' });
  });
});

const paginationTest = async ({
  eventType,
}: {
  eventType: 'event' | 'course';
}) => {
  advanceTo('2020-10-05');
  const eventsCount = 35;
  const { collection, mocks, eventNames } = getMocksForPagination(eventsCount);
  render(<CuratedEvents collection={collection} />, {
    mocks,
  });
  await waitForRequestToComplete();

  const curatedEventsList = within(screen.getByTestId(eventsListTestId));

  const clickShowMoreEventsButton = (name: RegExp) => {
    userEvent.click(
      curatedEventsList.getByRole('button', { name, hidden: true })
    );
  };

  // use loop to fetch all the events by clicking show more button (pagination)
  for (
    let eventsFetchedCount = PAGE_SIZE;
    eventsFetchedCount < eventsCount;
    eventsFetchedCount += PAGE_SIZE
  ) {
    clickShowMoreEventsButton(
      new RegExp(
        `Näytä lisää tapahtumia \\(${eventsCount - eventsFetchedCount}\\)`,
        'i'
      )
    );
    await waitForRequestToComplete();

    // check that correct events were fetched and rendered
    for (const eventName of eventNames.slice(
      eventsFetchedCount,
      eventsFetchedCount + PAGE_SIZE
    )) {
      expect(screen.queryByText(eventName)).toBeInTheDocument();
    }
  }

  expect(
    screen.queryByRole('button', { name: /näytä lisää tapahtumia/ })
  ).not.toBeInTheDocument();

  for (const eventName of eventNames) {
    expect(screen.queryByText(eventName)).toBeInTheDocument();
  }
};

const getMocks = (
  events: EventFieldsFragment[],
  ids = eventIds,
  page?: number | undefined,
  maxPage: number = 1
) => {
  let variables = {
    ids,
    eventType: [EventTypeId.General],
    include: ['location'],
    pageSize: 10,
    sort: 'end_time',
    page: undefined,
    start: 'now',
  };

  let meta = {
    count: ids.length,
    previous: null,
    next: null,
    __typename: 'Meta',
  };

  if (page && page < maxPage) {
    meta.next = `https://api.hel.fi/linkedevents/v1/event/?ids=${ids.toString()}&page_size=10&page=${
      page + 1
    }&sort=end_time&include=location`;
  }
  if (page > 1) {
    variables.page = page;
    meta.previous = `https://api.hel.fi/linkedevents/v1/event/?ids=${ids.toString()}&page_size=10&page=${
      page - 1
    }&sort=end_time&include=location`;
  }
  return [
    {
      request: {
        query: EventsByIdsDocument,
        variables,
      },
      result: {
        data: {
          eventsByIds: {
            data: events,
            meta,
          },
        },
      },
    },
  ];
};

// Creates array of mocks to match pagination queries
const getMocksForPagination = (eventsCount = 35) => {
  // Populate these arrays when creating fakeEvents in chunks.
  const eventNames: string[] = [];
  const curatedEvents: string[] = [];

  const chunkedEvents: EventListResponse[] = flow([
    range,
    map((id: number) => (id + 1).toString()),
    chunk(PAGE_SIZE),
    map((eventIdChunk: string[]) =>
      fakeEvents(
        eventIdChunk.length,
        eventIdChunk.map((eventId) => {
          const eventName = `Event ${eventId}`;
          eventNames.push(eventName);
          curatedEvents.push(`http://localhost:3000/fi/event/${eventId}`);
          return {
            endTime: '2020-12-12',
            startTime: '2020-12-12',
            id: eventId,
            name: { fi: `Event ${eventId}` },
          };
        })
      )
    ),
  ])(eventsCount);

  const mocks = chunkedEvents
    .map((eventList, index) => {
      const ids = range(eventsCount).map((id: number) => (id + 1).toString());
      const page = index + 1;
      const maxPage = chunkedEvents.length;

      return getMocks(
        eventList.data as EventFieldsFragment[],
        ids,
        page,
        maxPage
      );
    })
    .flat();
  const collection = fakeCollection({
    curatedEvents,
  }) as CollectionFieldsFragment;

  return { mocks, collection, eventNames };
};

const waitForRequestToComplete = async () => {
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
};
