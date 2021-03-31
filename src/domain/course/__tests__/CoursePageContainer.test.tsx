import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import { CourseDetailsDocument } from '../../../generated/graphql';
import {
  createEventListRequestAndResultMocks,
  createOtherEventTimesRequestAndResultMocks,
} from '../../../test/apollo-mocks/eventListMocks';
import {
  fakeEvent,
  fakeEvents,
  fakeKeyword,
  fakeLocalizedObject,
  fakeTargetGroup,
} from '../../../test/mockDataUtils';
import {
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../test/testUtils';
import getDateRangeStr from '../../../util/getDateRangeStr';
import { ROUTES } from '../../app/routes/constants';
import {
  otherEventTimesListTestId,
  otherEventTimesShownListTestId,
} from '../../event/eventInfo/otherEventTimes/OtherEventTimes';
import { similarEventsListTestId } from '../../event/similarEvents/SimilarEvents';
import CoursePageContainer from '../CoursePageContainer';

const id = '1';
const name = 'Course title';
const description = 'Course descirption';
const startTime = '2020-10-05T07:00:00.000000Z';
const endTime = '2020-10-05T10:00:00.000000Z';

const audience = ['Aikuiset', 'Lapset'];
const keywords = [
  { name: 'Avouinti', id: 'keyword1' },
  { name: 'Eläimet', id: 'keyword2' },
  { name: 'Grillaus', id: 'keyword3' },
];
const superEventId = 'harrastushaku:13433';
const otherEventTimesCount = 5;
const similarEventTimesCount = 10;
const similarCoursesNames = [
  'JUMPPI-streetdance Suurpellossa, Opimäen koululla!',
  'Narrin teatteriryhmä Rastilassa',
];

const course = fakeEvent({
  id,
  startTime,
  endTime,
  name: fakeLocalizedObject(name),
  description: fakeLocalizedObject(description),
  keywords: keywords.map((k) =>
    fakeKeyword({ name: fakeLocalizedObject(k.name), id: k.id })
  ),
  audience: audience.map((targetGroup) =>
    fakeTargetGroup({ name: fakeLocalizedObject(targetGroup) })
  ),
  superEvent: {
    __typename: 'InternalIdObject',
    internalId: `https://api.hel.fi/linkedcourses/v1/event/${superEventId}/`,
  },
});

const courseRequest = {
  query: CourseDetailsDocument,
  variables: {
    id,
    include: ['in_language', 'keywords', 'location', 'audience'],
  },
};

const superEventRequest = {
  query: CourseDetailsDocument,
  variables: {
    id: superEventId,
    include: ['in_language', 'keywords', 'location', 'audience'],
  },
};

const courseResponse = { data: { courseDetails: course } };

const superEventResponse = {
  data: {
    courseDetails: {
      ...course,
      startTime: '2020-06-22T07:00:00.000000Z',
      endTime: '2020-06-25T07:00:00.000000Z',
    },
  },
};

const otherCoursesMock = createOtherEventTimesRequestAndResultMocks({
  type: 'course',
  superEventId,
  response: fakeEvents(otherEventTimesCount),
});

const similarCoursesMock = createEventListRequestAndResultMocks({
  type: 'course',
  variables: { allOngoing: true },
  response: fakeEvents(
    similarEventTimesCount,
    similarCoursesNames.map((name) => ({ name: fakeLocalizedObject(name) }))
  ),
});

const mocks = [
  {
    request: courseRequest,
    result: courseResponse,
  },
  otherCoursesMock,
  similarCoursesMock,
];

const superEventMocks = [
  {
    request: courseRequest,
    result: courseResponse,
  },
  {
    request: superEventRequest,
    result: superEventResponse,
  },
  otherCoursesMock,
  similarCoursesMock,
];

const testPath = ROUTES.COURSE.replace(':id', id);
const routes = [testPath];

const renderComponent = () =>
  renderWithRoute(<CoursePageContainer />, {
    mocks,
    routes,
    path: ROUTES.COURSE,
  });

afterAll(() => {
  clear();
});

it('should render info and load other courses + similar courses', async () => {
  advanceTo('2020-10-01');
  renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  expect(screen.queryByRole('heading', { name })).toBeInTheDocument();

  expect(screen.queryByRole('heading', { name: 'Kuvaus' })).toBeInTheDocument();
  expect(screen.queryByText(description)).toBeInTheDocument();

  keywords.forEach((keyword) => {
    expect(
      screen.queryByRole('button', { name: keyword.name })
    ).toBeInTheDocument();
  });

  await screen.findByText('Tapahtuman muut ajat');

  expect(
    screen.getByTestId(otherEventTimesShownListTestId).children
  ).toHaveLength(3);

  // click show other times
  userEvent.click(screen.getByRole('button', { name: 'Näytä kaikki' }));

  expect(screen.getByTestId(otherEventTimesListTestId).children).toHaveLength(
    otherEventTimesCount - 3
  );

  expect(screen.getByTestId(similarEventsListTestId).children).toHaveLength(8);

  similarCoursesNames.forEach((courseName) => {
    expect(
      screen.queryByLabelText(`Siirry tapahtumaan: ${courseName}`, {
        selector: 'a',
      })
    ).toBeInTheDocument();
  });
});

it('should show error info when course is closed', async () => {
  advanceTo('2020-10-10');
  renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(
    screen.queryByRole('heading', {
      name: translations.event.hero.titleEventClosed,
    })
  ).toBeInTheDocument();
});

it("should show error info when event doesn't exist", async () => {
  const mocks = [
    {
      request: courseRequest,
      error: new Error('not found'),
    },
  ];

  renderWithRoute(<CoursePageContainer />, {
    mocks,
    routes,
    path: ROUTES.COURSE,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(
    screen.queryByRole('heading', {
      name: translations.event.notFound.title,
    })
  ).toBeInTheDocument();
});

it('should link to courses search when clicking tags', async () => {
  advanceTo('2020-10-01');
  const { history } = renderComponent();

  const pushSpy = jest.spyOn(history, 'push');

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  // click keyword / tag
  userEvent.click(screen.getByRole('button', { name: 'Avouinti' }));

  expect(pushSpy).toHaveBeenCalledWith({
    pathname: '/fi/courses',
    search: '?text=Avouinti',
  });
});

it('should contain event hero with super event date', async () => {
  advanceTo('2020-06-23');

  renderWithRoute(<CoursePageContainer />, {
    mocks: superEventMocks,
    routes,
    path: ROUTES.COURSE,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  const superDateStr = getDateRangeStr({
    start: superEventResponse.data.courseDetails.startTime,
    end: superEventResponse.data.courseDetails.endTime,
    locale: 'fi',
    includeTime: true,
    timeAbbreviation: translations.commons.timeAbbreviation,
  });

  expect(
    screen.getByText((_content, el) => el.textContent === superDateStr)
  ).toBeInTheDocument();
});
