/* eslint-disable no-console */
import { MockedResponse } from '@apollo/react-testing';
import { addDays } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import range from 'lodash/range';
import React from 'react';
import { toast } from 'react-toastify';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  CourseListDocument,
  EventFieldsFragment,
  EventListDocument,
} from '../../../../generated/graphql';
import getDateRangeStr from '../../../../util/getDateRangeStr';
import { fakeEvent, fakeEvents } from '../../../../util/mockDataUtils';
import { render, screen, userEvent, waitFor } from '../../../../util/testUtils';
import OtherCourseTimesContainer from '../otherEventTimes/OtherCourseTimesContainer';

const startTime = '2020-10-01T16:00:00Z';
const endTime = '2020-10-01T18:00:00Z';

const superEventId = 'hel:123';
const superEventInternalId = `https://api.hel.fi/linkedcourses/v1/event/${superEventId}`;

const event = fakeEvent({
  superEvent: { internalId: superEventInternalId },
}) as EventFieldsFragment;

const meta = {
  count: 20,
  next:
    // eslint-disable-next-line max-len
    'https://api.hel.fi/linkedcourses/v1/event/?include=keyword,location&page=2&sort=start_time&start=2020-08-11T03&super_event=hel:123',
  previous: null,
  __typename: 'Meta',
};

const otherEventsResponse = {
  data: {
    courseList: {
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
    courseList: {
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
  start: 'now',
  superEvent: superEventId,
};

const commonMocks = [
  {
    request: {
      query: CourseListDocument,
      variables,
    },
    result: otherEventsResponse,
  },
];

const defaultMocks = [
  ...commonMocks,
  {
    request: {
      query: CourseListDocument,
      variables: { ...variables, page: 2 },
    },
    result: otherEventsLoadMoreResponse,
  },
];

afterAll(() => {
  clear();
});

const renderComponent = (mocks: MockedResponse[] = defaultMocks) =>
  render(<OtherCourseTimesContainer event={event} />, { mocks });

test('should render other event times', async () => {
  advanceTo(new Date('2020-08-11'));
  renderComponent();

  const toggleButton = screen.getByRole('button', {
    name: translations.event.otherTimes.buttonShow,
  });

  userEvent.click(toggleButton);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  otherEventsResponse.data.courseList.data.forEach((event) => {
    const dateStr = getDateRangeStr({
      start: event.startTime,
      end: event.endTime,
      locale: 'fi',
      includeTime: true,
      timeAbbreviation: translations.commons.timeAbbreviation,
    });
    expect(screen.getByText(dateStr)).toBeInTheDocument();
  });

  // Make sure that loading more events is completed
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  otherEventsLoadMoreResponse.data.courseList.data.forEach((event) => {
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

test('should show toastr when loading next event page fails', async () => {
  toast.error = jest.fn();
  advanceTo(new Date('2020-08-11'));
  const mocks = [
    ...commonMocks,
    {
      request: {
        query: EventListDocument,
        variables: { ...variables, page: 2 },
      },
      error: new Error('not found'),
    },
  ];
  renderComponent(mocks);

  const toggleButton = screen.getByRole('button', {
    name: translations.event.otherTimes.buttonShow,
  });

  userEvent.click(toggleButton);

  await waitFor(() => {
    expect(toast.error).toBeCalledWith(translations.event.info.errorLoadMode);
  });
});

test('should go to event page of other event time', async () => {
  advanceTo(new Date('2020-08-11'));
  const { history } = renderComponent();

  const toggleButton = screen.getByRole('button', {
    name: translations.event.otherTimes.buttonShow,
  });

  userEvent.click(toggleButton);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  const event = otherEventsResponse.data.courseList.data[0];
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

  expect(history.location.pathname).toBe(`/fi/courses/${event.id}`);
});
