/* eslint-disable no-console */
import { MockedResponse } from '@apollo/client/testing';
import { addDays } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import range from 'lodash/range';
import React from 'react';
import { toast } from 'react-toastify';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  EventDetails,
  EventFieldsFragment,
  EventListQueryVariables,
  EventListResponse,
  EventTypeId,
  Meta,
} from '../../../../generated/graphql';
import {
  createOtherEventTimesRequestAndResultMocks,
  createOtherEventTimesRequestThrowsErrorMocks,
} from '../../../../test/apollo-mocks/eventListMocks';
import { fakeEvent, fakeEvents } from '../../../../test/mockDataUtils';
import { render, screen, userEvent, waitFor } from '../../../../test/testUtils';
import getDateRangeStr from '../../../../util/getDateRangeStr';
import { EventType } from '../../types';
import OtherEventTimes from '../OtherEventTimes';

const startTime = '2020-10-01T16:00:00Z';
const endTime = '2020-10-01T18:00:00Z';

const superEventId = 'hel:123';
const superEventInternalId = `https://api.hel.fi/linkedevents/v1/event/${superEventId}`;

const generalEvent = fakeEvent({
  superEvent: { internalId: superEventInternalId },
  typeId: EventTypeId.General,
}) as EventFieldsFragment;

const courseEvent = Object.assign({}, generalEvent, {
  typeId: EventTypeId.Course,
}) as EventFieldsFragment;

const meta: Meta = {
  count: 20,
  next:
    // eslint-disable-next-line max-len
    'https://api.hel.fi/linkedevents/v1/event/?include=keyword,location&page=2&sort=start_time&start=2020-08-11T03&super_event=hel:123',
  previous: null,
  __typename: 'Meta',
};

const otherEventsResponse = {
  ...fakeEvents(
    10,
    range(1, 11).map((i) => ({
      endTime: addDays(new Date(endTime), i).toISOString(),
      startTime: addDays(new Date(startTime), i).toISOString(),
    }))
  ),
  meta,
};

const otherEventsLoadMoreResponse = {
  ...fakeEvents(
    10,
    range(11, 21).map((i) => ({
      endTime: addDays(new Date(endTime), i).toISOString(),
      startTime: addDays(new Date(startTime), i).toISOString(),
    }))
  ),
  meta: { ...meta, next: null },
};

const getEventTimesMocks = ({
  eventType = 'event',
  response,
  variables,
}: {
  eventType: EventType;
  response: EventListResponse;
  variables?: EventListQueryVariables;
}) =>
  createOtherEventTimesRequestAndResultMocks({
    superEventId,
    response,
    variables,
    type: eventType,
  });

const firstLoadMock = getEventTimesMocks({
  eventType: 'event',
  response: otherEventsResponse,
});

const secondLoadMock = getEventTimesMocks({
  variables: { page: 2 },
  response: otherEventsLoadMoreResponse,
  eventType: 'event',
});

const secondPageLoadThrowsErrorMock = createOtherEventTimesRequestThrowsErrorMocks(
  {
    superEventId,
    variables: { page: 2 },
    type: 'event',
  }
);

const firstCourseLoadMock = getEventTimesMocks({
  response: otherEventsResponse,
  eventType: 'course',
});

const secondCourseLoadMock = getEventTimesMocks({
  variables: { page: 2 },
  response: otherEventsLoadMoreResponse,
  eventType: 'course',
});

const secondCoursePageLoadThrowsErrorMock = createOtherEventTimesRequestThrowsErrorMocks(
  {
    superEventId,
    variables: { page: 2 },
    type: 'course',
  }
);

const defaultMocks = [
  firstLoadMock,
  secondLoadMock,
  firstCourseLoadMock,
  secondCourseLoadMock,
];

afterAll(() => {
  clear();
});

const renderComponent = ({
  mocks = defaultMocks,
  event = generalEvent,
}: {
  mocks?: MockedResponse[];
  event?: EventFieldsFragment;
} = {}) => render(<OtherEventTimes event={event} />, { mocks });

const getDateRangeStrProps = (event: EventDetails) => ({
  start: event.startTime,
  end: event.endTime,
  locale: 'fi',
  includeTime: true,
  timeAbbreviation: translations.commons.timeAbbreviation,
});

describe('events', () => {
  test('should render other event times', async () => {
    advanceTo(new Date('2020-08-11'));
    renderComponent({ event: courseEvent });
    await testOtherEventTimes();
  });

  test('should show toastr when loading next event page fails', async () => {
    toast.error = jest.fn();
    advanceTo(new Date('2020-08-11'));
    const mocks = [firstLoadMock, secondPageLoadThrowsErrorMock];
    renderComponent({ mocks });
    await testToaster();
  });

  test('should go to event page of other event time', async () => {
    advanceTo(new Date('2020-08-11'));
    const { history } = renderComponent();
    await testNavigation(history, '/fi/events/');
  });
});

describe('courses', () => {
  test('should render other course times', async () => {
    advanceTo(new Date('2020-08-11'));
    renderComponent({ event: courseEvent });
    await testOtherEventTimes();
  });

  test('should show toastr when loading next course page fails', async () => {
    toast.error = jest.fn();
    advanceTo(new Date('2020-08-11'));
    const mocks = [firstCourseLoadMock, secondCoursePageLoadThrowsErrorMock];
    renderComponent({ event: courseEvent, mocks });
    await testToaster();
  });

  test('should go to course page of other course time', async () => {
    advanceTo(new Date('2020-08-11'));
    const { history } = renderComponent({ event: courseEvent });
    await testNavigation(history, '/fi/courses/');
  });
});

async function testOtherEventTimes() {
  await waitFor(() => {
    expect(
      screen.queryByTestId('skeleton-loader-wrapper')
    ).not.toBeInTheDocument();
  });
  otherEventsResponse.data.slice(0, 3).forEach((event) => {
    const dateStr = getDateRangeStr(getDateRangeStrProps(event));
    expect(screen.getByText(dateStr)).toBeInTheDocument();
  });
  const fourthevent = otherEventsResponse.data[3];
  const fourthDateStr = getDateRangeStr(getDateRangeStrProps(fourthevent));
  expect(screen.queryByText(fourthDateStr)).not.toBeInTheDocument();

  const toggleButton = await screen.findByRole('button', {
    name: translations.event.otherTimes.buttonShow,
  });

  userEvent.click(toggleButton);

  otherEventsResponse.data.forEach((event) => {
    const dateStr = getDateRangeStr(getDateRangeStrProps(event));
    expect(screen.getByText(dateStr)).toBeInTheDocument();
  });
  otherEventsLoadMoreResponse.data.forEach((event) => {
    const dateStr = getDateRangeStr(getDateRangeStrProps(event));
    expect(screen.getByText(dateStr)).toBeInTheDocument();
  });
}

async function testToaster() {
  const toggleButton = await screen.findByRole('button', {
    name: translations.event.otherTimes.buttonShow,
  });

  userEvent.click(toggleButton);

  await waitFor(() => {
    expect(toast.error).toBeCalledWith(translations.event.info.errorLoadMode);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function testNavigation(history: any, url: string) {
  const toggleButton = await screen.findByRole('button', {
    name: translations.event.otherTimes.buttonShow,
  });

  userEvent.click(toggleButton);

  const event = otherEventsResponse.data[0];
  const dateStr = getDateRangeStr(getDateRangeStrProps(event));
  expect(screen.getByText(dateStr)).toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', {
      name: translations.event.otherTimes.buttonReadMore.replace(
        '{{date}}',
        dateStr
      ),
    })
  );

  expect(history.location.pathname).toBe(`${url}${event.id}`);
}
