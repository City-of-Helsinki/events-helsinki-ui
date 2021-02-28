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
} from '../../../../generated/graphql';
import { fakeCollection, fakeEvents } from '../../../../util/mockDataUtils';
import { render, screen, userEvent, waitFor } from '../../../../util/testUtils';
import CuratedEventList, { PAGE_SIZE } from '../CuratedEventList';

const eventIds = ['1', '2', '3', '4', '5'];
const curatedEvents = eventIds.map(
  (id) => `http://localhost:3000/fi/event/${id}`
);
const eventNames = eventIds.map((id) => `Event ${id}`);

const collection = fakeCollection({
  curatedEvents,
}) as CollectionFieldsFragment;

const getMocks = (events: EventFieldsFragment[], ids = eventIds) => [
  {
    request: {
      query: EventsByIdsDocument,
      variables: {
        ids,
        include: ['location'],
      },
    },
    result: { data: { eventsByIds: events } },
  },
];

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

  const mocks = chunkedEvents.map((eventList) => {
    return getMocks(
      eventList.data as EventFieldsFragment[],
      eventList.data.map((event) => event.id)
    )[0];
  });

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

afterAll(() => {
  clear();
});

test('should show all events', async () => {
  const events = fakeEvents(
    eventNames.length,
    eventNames.map((event, index) => ({
      id: eventIds[index],
      name: { fi: event },
    }))
  );
  const eventsData = events.data as EventFieldsFragment[];
  const mocks = getMocks(eventsData);

  render(<CuratedEventList collection={collection} />, {
    mocks,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  eventNames.forEach((eventName) => {
    expect(screen.getByText(eventName)).toBeInTheDocument();
  });
});

test('should show expired events', async () => {
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
  const mocks = getMocks(eventsData);

  render(<CuratedEventList collection={collection} />, {
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

test.only('event list pagination works', async () => {
  advanceTo('2020-10-05');
  const eventsCount = 35;
  const { collection, mocks, eventNames } = getMocksForPagination(eventsCount);
  render(<CuratedEventList collection={collection} />, {
    mocks,
  });
  await waitForRequestToComplete();

  const clickShowMoreEventsButton = (name: RegExp) => {
    userEvent.click(screen.getByRole('button', { name, hidden: true }));
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
});
