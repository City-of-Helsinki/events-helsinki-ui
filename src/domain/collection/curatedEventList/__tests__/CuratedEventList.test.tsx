import { advanceTo, clear } from 'jest-date-mock';
import chunk from 'lodash/chunk';
import range from 'lodash/range';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  CollectionFieldsFragment,
  EventFieldsFragment,
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

const getMocksForPagination = (eventsCount = 35) => {
  const eventIds = range(eventsCount).map((i) => (i + 1).toString());
  const eventNames = eventIds.map((id) => `Event ${id}`);
  const curatedEvents = eventIds.map(
    (id) => `http://localhost:3000/fi/event/${id}`
  );

  const chunkedEventIds = chunk(eventIds, PAGE_SIZE);
  const chunkedEvents = chunk(eventNames, PAGE_SIZE).map(
    (splittedEventNames, chunkIndex) => {
      return fakeEvents(
        splittedEventNames.length,
        splittedEventNames.map((event, index) => ({
          endTime: '2020-12-12',
          startTime: '2020-12-12',
          id: chunkedEventIds[chunkIndex][index],
          name: { fi: event },
        }))
      );
    }
  );

  const mocks = chunkedEventIds.map((eventIds, index) => {
    return getMocks(
      chunkedEvents[index].data as EventFieldsFragment[],
      eventIds
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

test('event list pagination works', async () => {
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
  }

  expect(
    screen.queryByRole('button', { name: /näytä lisää tapahtumia/ })
  ).not.toBeInTheDocument();

  for (const eventName of eventNames) {
    expect(screen.queryByText(eventName)).toBeInTheDocument();
  }
});
