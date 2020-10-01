import { addDays } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import range from 'lodash/range';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  EventFieldsFragment,
  EventListDocument,
} from '../../../../generated/graphql';
import getDateRangeStr from '../../../../util/getDateRangeStr';
import { fakeEvent, fakeEvents } from '../../../../util/mockDataUtils';
import { render, screen, userEvent, waitFor } from '../../../../util/testUtils';
import OtherEventTimesEvents from '../OtherEventTimes';

const startTime = '2020-10-01T16:00:00Z';
const endTime = '2020-10-01T18:00:00Z';

const superEventId = 'hel:123';
const superEventInternalId = `https://api.hel.fi/linkedevents/v1/event/${superEventId}`;

const mockEvent = fakeEvent({
  superEvent: { internalId: superEventInternalId },
}) as EventFieldsFragment;

const meta = {
  count: 20,
  next:
    'https://api.hel.fi/linkedevents/v1/event/?include=keyword,location&page=2&sort=start_time&start=2020-08-11T03&super_event=hel:123',
  previous: null,
  __typename: 'Meta',
};

const otherEventsResponse = {
  data: {
    eventList: {
      ...fakeEvents(
        10,
        range(1, 11).map((i) => ({
          endTime: addDays(new Date(endTime), i).toISOString(),
          startTime: addDays(new Date(startTime), i).toISOString(),
        }))
      ),
      meta,
    },
  },
};

const otherEventsLoadMoreResponse = {
  data: {
    eventList: {
      ...fakeEvents(
        10,
        range(11, 21).map((i) => ({
          endTime: addDays(new Date(endTime), i).toISOString(),
          startTime: addDays(new Date(startTime), i).toISOString(),
        }))
      ),
      meta: { ...meta, next: null },
    },
  },
};

const variables = {
  include: ['keywords', 'location'],
  sort: 'start_time',
  startDate: '2020-08-11T03',
  superEvent: superEventId,
};

const mocks = [
  {
    request: {
      query: EventListDocument,
      variables,
    },
    result: otherEventsResponse,
  },
  {
    request: {
      query: EventListDocument,
      variables: { ...variables, page: 2 },
    },
    result: otherEventsLoadMoreResponse,
  },
];

afterAll(() => {
  clear();
});

test('should render other event times', async () => {
  advanceTo(new Date('2020-08-11'));
  render(<OtherEventTimesEvents event={mockEvent} />, { mocks });

  const toggleButton = screen.getByRole('button', {
    name: translations.event.otherTimes.buttonShow,
  });

  userEvent.click(toggleButton);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  otherEventsResponse.data.eventList.data.forEach((event) => {
    const dateStr = getDateRangeStr({
      start: event.startTime,
      end: event.endTime,
      locale: 'fi',
      includeTime: true,
      timeAbbreviation: translations.commons.timeAbbreviation,
    });
    expect(screen.getByText(dateStr)).toBeInTheDocument();
  });

  await waitFor(() => {
    const event = otherEventsLoadMoreResponse.data.eventList.data[0];
    const dateStr = getDateRangeStr({
      start: event.startTime,
      end: event.endTime,
      locale: 'fi',
      includeTime: true,
      timeAbbreviation: translations.commons.timeAbbreviation,
    });
    expect(screen.getByText(dateStr)).toBeInTheDocument();
  });

  otherEventsLoadMoreResponse.data.eventList.data.forEach((event) => {
    const dateStr = getDateRangeStr({
      start: event.startTime,
      end: event.endTime,
      locale: 'fi',
      includeTime: true,
      timeAbbreviation: translations.commons.timeAbbreviation,
    });
    expect(screen.getByText(dateStr)).toBeInTheDocument();
  });
});

test('should go to event page of other event time', async () => {
  advanceTo(new Date('2020-08-11'));
  const { history } = render(<OtherEventTimesEvents event={mockEvent} />, {
    mocks,
  });

  const toggleButton = screen.getByRole('button', {
    name: translations.event.otherTimes.buttonShow,
  });

  userEvent.click(toggleButton);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  const event = otherEventsResponse.data.eventList.data[0];
  const dateStr = getDateRangeStr({
    start: event.startTime,
    end: event.endTime,
    locale: 'fi',
    includeTime: true,
    timeAbbreviation: translations.commons.timeAbbreviation,
  });
  expect(screen.getByText(dateStr)).toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', {
      name: translations.event.otherTimes.buttonReadMore.replace(
        '{{date}}',
        dateStr
      ),
    })
  );

  expect(history.location.pathname).toBe(`/fi/event/${event.id}`);
});
