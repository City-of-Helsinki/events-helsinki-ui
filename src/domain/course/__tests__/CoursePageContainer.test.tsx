import { advanceTo, clear } from 'jest-date-mock';
import { forEach } from 'lodash';
import React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import {
  CourseDetailsDocument,
  CourseListDocument,
} from '../../../generated/graphql';
import {
  fakeEvent,
  fakeKeyword,
  fakeKeywords,
  fakeLocalizedObject,
  fakeTargetGroup,
} from '../../../util/mockDataUtils';
import { renderWithRoute, screen, waitFor } from '../../../util/testUtils';
import { ROUTES } from '../../app/routes/constants';
import CoursePageContainer from '../CoursePageContainer';

const id = '1';
const name = 'Course title';
const description = 'Course descirption';
const startTime = '2020-10-05T07:00:00.000000Z';
const endTime = '2020-10-05T10:00:00.000000Z';

const audience = ['Aikuiset', 'Lapset'];
const keywords = ['Avouinti', 'Eläimet', 'Grillaus'];

const course = fakeEvent({
  id,
  startTime,
  endTime,
  name: fakeLocalizedObject(name),
  description: fakeLocalizedObject(description),
  keywords: keywords.map((k) => fakeKeyword({ name: fakeLocalizedObject(k) })),
  audience: audience.map((targetGroup) =>
    fakeTargetGroup({ name: fakeLocalizedObject(targetGroup) })
  ),
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
    combinedText: [],
    division: ['kunta:helsinki'],
    end: '',
    include: ['keywords', 'location'],
    keyword: [
      'yso:p17887',
      'yso:p2023',
      'yso:p26265',
      'yso:p2901',
      'yso:p23137',
      'yso:p16485',
      'yso:p4354',
      'yso:p2357',
      'yso:p916',
      'yso:p13084',
      'yso:p11617',
      'yso:p6062',
      'yso:p6381',
      'yso:p14049',
      'yso:p11384',
      'yso:p4330',
      'yso:p24893',
      'yso:p3792',
    ],
    keywordAnd: [],
    keywordNot: [],
    language: 'fi',
    location: [],
    pageSize: 10,
    publisher: null,
    sort: 'end_time',
    start: 'now',
    superEventType: ['umbrella', 'none'],
  },
};

const courseResponse = { data: { courseDetails: course } };

const mocks = [
  {
    request: courseRequest,
    result: courseResponse,
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

it.only('should render course page with all the correct info', async () => {
  advanceTo('2020-10-01');
  renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  expect(screen.queryByRole('heading', { name })).toBeInTheDocument();

  expect(screen.queryByRole('heading', { name: 'Kuvaus' })).toBeInTheDocument();
  expect(screen.queryByText(description)).toBeInTheDocument();

  keywords.forEach((keyword) => {
    expect(screen.queryByRole('button', { name: keyword })).toBeInTheDocument();
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
      request,
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
