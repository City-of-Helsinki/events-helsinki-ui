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
  LinkedEventsSource,
} from '../../../../generated/graphql';
import { fakeCollection, fakeEvents } from '../../../../test/mockDataUtils';
import {
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../../test/testUtils';
import CuratedEvents, {
  coursesListTestId,
  eventsListTestId,
} from '../CuratedEvents';
import { PAGE_SIZE } from '../utils';

const eventIds = ['1', '2', '3', '4', '5'];
const courseIds = ['6', '7', '8', '9', '10'];
const curatedEvents = eventIds.map(
  (id) => `http://localhost:3000/fi/event/${id}`
);
const curatedCourses = courseIds.map(
  (id) => `http://localhost:3000/fi/courses/${id}`
);
const eventNames = eventIds.map((id) => `Event ${id}`);
const courseNames = courseIds.map((id) => `Course ${id}`);

const collection = fakeCollection({
  curatedEvents: [...curatedEvents, ...curatedCourses],
}) as CollectionFieldsFragment;

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
  const courses = fakeEvents(
    courseNames.length,
    courseNames.map((event, index) => ({
      id: courseIds[index],
      name: { fi: event },
    }))
  );
  const eventsData = events.data as EventFieldsFragment[];
  const coursesData = courses.data as EventFieldsFragment[];
  const eventMocks = getMocks(eventsData, eventIds, 'event');
  const courseMocks = getMocks(coursesData, courseIds, 'course');

  render(<CuratedEvents collection={collection} />, {
    mocks: [...eventMocks, ...courseMocks],
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  // Test that both lists are

  const eventsList = within(screen.getByTestId(eventsListTestId));
  eventNames.forEach((eventName) => {
    expect(eventsList.getByText(eventName)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  const courseList = within(screen.getByTestId(coursesListTestId));
  courseNames.forEach((courseName) => {
    expect(courseList.getByText(courseName)).toBeInTheDocument();
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

test('course list pagination works', async () => {
  await paginationTest({ eventType: 'course' });
});

const paginationTest = async ({
  eventType,
}: {
  eventType: 'event' | 'course';
}) => {
  advanceTo('2020-10-05');
  const eventsCount = 35;
  const { collection, mocks, eventNames } = getMocksForPagination(
    eventsCount,
    eventType
  );
  render(<CuratedEvents collection={collection} />, {
    mocks,
  });
  await waitForRequestToComplete();

  const testIds: Record<typeof eventType, string> = {
    course: coursesListTestId,
    event: eventsListTestId,
  };

  const curatedEventsList = within(screen.getByTestId(testIds[eventType]));

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
  type: 'event' | 'course' = 'event'
) => [
  {
    request: {
      query: EventsByIdsDocument,
      variables: {
        ids,
        include: ['location'],
        source:
          type === 'event'
            ? LinkedEventsSource.Linkedevents
            : LinkedEventsSource.Linkedcourses,
      },
    },
    result: { data: { eventsByIds: events } },
  },
];

// Creates array of mocks to match pagination queries
const getMocksForPagination = (
  eventsCount = 35,
  type: 'event' | 'course' = 'event'
) => {
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
          curatedEvents.push(`http://localhost:3000/fi/${type}/${eventId}`);
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
      eventList.data.map((event) => event.id),
      type
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
