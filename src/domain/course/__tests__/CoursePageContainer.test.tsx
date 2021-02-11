import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import {
  CourseDetailsDocument,
  CourseListDocument,
} from '../../../generated/graphql';
import {
  fakeEvent,
  fakeEvents,
  fakeKeyword,
  fakeLocalizedObject,
  fakeTargetGroup,
} from '../../../util/mockDataUtils';
import {
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../util/testUtils';
import { ROUTES } from '../../app/routes/constants';
import { otherEventTimesListTestId } from '../../event/eventInfo/otherEventTimes/OtherEventTimes';
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
const otherEventTimesCount = 3;
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

const similarCoursesListRequest = {
  query: CourseListDocument,
  variables: {
    audienceMinAgeGt: '',
    audienceMaxAgeLt: '',
    end: '',
    include: ['keywords', 'location'],
    isFree: undefined,
    keywordAnd: [],
    keywordOrSet1: ['keyword1', 'keyword2', 'keyword3'],
    keywordOrSet3: [],
    keywordNot: [],
    language: 'fi',
    location: [],
    pageSize: 10,
    publisher: null,
    sort: 'end_time',
    start: 'now',
    startsAfter: undefined,
    superEventType: ['umbrella', 'none'],
  },
};

const otherCoursesRequest = {
  query: CourseListDocument,
  variables: {
    include: ['keywords', 'location'],
    sort: 'start_time',
    start: 'now',
    superEvent: superEventId,
  },
};

const courseResponse = { data: { courseDetails: course } };

const similarCoursesResponse = {
  data: {
    courseList: fakeEvents(
      similarEventTimesCount,
      similarCoursesNames.map((name) => ({ name: fakeLocalizedObject(name) }))
    ),
  },
};

const otherCoursesResponse = {
  data: { courseList: fakeEvents(otherEventTimesCount) },
};

const mocks = [
  {
    request: courseRequest,
    result: courseResponse,
  },
  {
    request: otherCoursesRequest,
    result: otherCoursesResponse,
  },
  {
    request: similarCoursesListRequest,
    result: similarCoursesResponse,
  },
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

  // click show other times
  userEvent.click(screen.getByRole('button', { name: 'Näytä' }));

  expect(screen.getByTestId(otherEventTimesListTestId).children).toHaveLength(
    otherEventTimesCount
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
