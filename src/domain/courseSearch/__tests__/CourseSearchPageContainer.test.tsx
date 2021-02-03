/* eslint-disable */
import { MockedResponse } from '@apollo/react-testing';
import { advanceTo } from 'jest-date-mock';
import React from 'react';
import { toast } from 'react-toastify';

import translations from '../../../common/translation/i18n/fi.json';
import {
  CourseListDocument,
  NeighborhoodListDocument,
  PlaceDetailsDocument,
  PlaceListDocument,
} from '../../../generated/graphql';
import {
  fakeEvents,
  fakeLocalizedObject,
  fakeNeighborhoods,
  fakePlace,
  fakePlaces,
} from '../../../util/mockDataUtils';
import {
  configure,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../util/testUtils';
import apolloClient from '../../app/apollo/apolloClient';
import { filterSummaryContainerTestId } from '../../eventSearch/filterSummary/FilterSummary';
import CourseSearchPageContainer from '../CourseSearchPageContainer';

configure({ defaultHidden: true });

const meta = {
  count: 20,
  next:
    // eslint-disable-next-line max-len
    'https://api.hel.fi/linkedevents/v1/event/?division=kunta%3Ahelsinki&include=keywords%2Clocation&language=fi&page=2&page_size=10&sort=end_time&start=2020-08-12T17&super_event_type=umbrella%2Cnone&text=jazz',
  previous: null,
  __typename: 'Meta',
};

const placeId = 'tprek:9302';

const coursesResponse = { data: { courseList: { ...fakeEvents(10), meta } } };

const eventsLoadMoreResponse = {
  data: {
    courseList: {
      ...fakeEvents(10),
      meta: { ...meta, next: null },
    },
  },
};

const courseListVariables = {
  allOngoingAnd: ['jazz'],
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keywordOrSet2: [],
  keywordOrSet3: [],
  keywordAnd: [],
  keywordNot: [],
  language: 'fi',
  location: [],
  pageSize: 10,
  publisher: null,
  sort: 'end_time',
  start: 'now',
  startsAfter: undefined,
  superEventType: ['umbrella', 'none'],
  audienceMinAgeGt: '',
  audienceMaxAgeLt: ''
};

const courseListVariables2 = {
  localOngoingAnd: ['jazz'],
  division: ['kaupunginosa:alppiharju', 'kaupunginosa:aluemeri'],
  end: '2020-12-02',
  include: ['keywords', 'location'],
  isFree: undefined,
  keywordOrSet2: ['yso:p1808',  'yso:p10871',
  'yso:p20421', 'yso:p2969',
  'yso:p23171', 'yso:p27962',
  'yso:p18718', 'yso:p18434',
  'yso:p15521', 'yso:p13408',
  'yso:p29932', 'yso:p768',
  'yso:p2841'],
  keywordOrSet3: [],
  keywordAnd: [],
  keywordNot: [],
  language: 'fi',
  location: [placeId],
  pageSize: 10,
  publisher: null,
  sort: 'end_time',
  start: '2020-12-02',
  startsAfter: undefined,
  superEventType: ['umbrella', 'none'],
  audienceMinAgeGt: '',
  audienceMaxAgeLt: ''
};

const neighborhoodsResponse = {
  data: {
    neighborhoodList: fakeNeighborhoods(10, [
      { id: 'kaupunginosa:aluemeri', name: fakeLocalizedObject('Aluemeri') },
      {
        id: 'kaupunginosa:alppiharju',
        name: fakeLocalizedObject('Alppiharju'),
      },
    ]),
  },
};

const placeMock = fakePlace({
  id: placeId,
  name: fakeLocalizedObject('Helsingin Kaupunginteatteri'),
});

const placesResponse = {
  data: {
    placeList: fakePlaces(10, [placeMock]),
  },
};

const commonMocks = [
  {
    request: {
      query: CourseListDocument,
      variables: {
        ...courseListVariables,
      },
    },
    result: coursesResponse,
  },
  {
    request: {
      query: CourseListDocument,
      variables: {
        ...courseListVariables2,
      },
    },
    result: coursesResponse,
  },
  {
    request: {
      query: PlaceDetailsDocument,
      variables: {
        id: placeId,
      },
    },
    result: {
      data: {
        placeDetails: placeMock,
      },
    },
  },
  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: neighborhoodsResponse,
  },
  {
    request: {
      query: PlaceListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 10,
        text: '',
      },
    },
    result: placesResponse,
  },
];

const defaultMocks = [
  ...commonMocks,
  {
    request: {
      query: CourseListDocument,
      variables: {
        ...courseListVariables,
        page: 2,
      },
    },
    result: eventsLoadMoreResponse,
  },
];

jest
  .spyOn(apolloClient, 'readQuery')
  .mockImplementation(({ query, variables }) => {
    if (query === PlaceDetailsDocument) {
      return {
        placeDetails: fakePlace({
          id: placeId,
          name: fakeLocalizedObject('Helsingin Kaupunginteatteri'),
        }),
      };
    }
  });

const pathname = '/fi/courses';
const search = '?text=jazz';
const testRoute = `${pathname}${search}`;
const routes = [testRoute];

const renderComponent = (
  mocks: MockedResponse[] = defaultMocks,
  customRoutes: string[] = routes
) =>
  render(<CourseSearchPageContainer />, {
    mocks,
    routes: customRoutes,
  });

it('renders title and search fields', async () => {
  renderComponent();

  await waitFor(() => {
    expect(
      screen.getByText(coursesResponse.data.courseList.data[0].name.fi)
    ).toBeInTheDocument();
  });

  expect(
    screen.getByRole('heading', { name: translations.courseSearch.title })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('textbox', {
      name: translations.eventSearch.search.labelSearchField,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', {
      name: translations.commons.dateSelector.title,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', {
      name: translations.eventSearch.search.titleDropdownDivision,
    })
  ).toBeInTheDocument();

  expect(screen.getByText(/jazz/i)).toBeInTheDocument();
});

it('initializes search fields correctly from query', async () => {
  advanceTo('2020-12-01');
  renderComponent(
    [...defaultMocks],
    [
      // eslint-disable-next-line max-len
      '/fi/courses?categories=movie,music&dateTypes=tomorrow&divisions=kaupunginosa%3Aalppiharju,kaupunginosa%3Aaluemeri&places=tprek%3A9302&text=jazz',
    ]
  );

  await waitFor(() => {
    expect(
      screen.getByText(coursesResponse.data.courseList.data[0].name.fi)
    ).toBeInTheDocument();
  });

  expect(
    screen.getByRole('button', {
      name: translations.commons.dateSelector.title,
    })
  ).toHaveTextContent('Huomenna');

  expect(
    screen.getByRole('button', {
      name: translations.eventSearch.search.titleDropdownDivision,
    })
  ).toHaveTextContent(/Alppiharju \+ 1/i);

  expect(
    screen.getByRole('button', {
      name: translations.eventSearch.search.titleDropdownPlace,
    })
  ).toHaveTextContent(/Helsingin Kaupunginteatteri/i);

  expect(
    screen.getByRole('button', {
      name: translations.eventSearch.search.titleDropdownCategory,
    })
  ).toHaveTextContent(/Elokuva \+ 1/i);

  const filterSummaryContainer = within(
    screen.getByTestId(filterSummaryContainerTestId)
  );

  expect(filterSummaryContainer.queryByText('jazz')).toBeInTheDocument();
  expect(filterSummaryContainer.queryByText('Alppiharju')).toBeInTheDocument();
  expect(filterSummaryContainer.queryByText('Aluemeri')).toBeInTheDocument();
  expect(filterSummaryContainer.queryByText('Huomenna')).toBeInTheDocument();
  expect(
    filterSummaryContainer.queryByText('Helsingin Kaupunginteatteri')
  ).toBeInTheDocument();
});

it('all the course cards should be visible and load more button should load more courses', async () => {
  advanceTo(new Date(2020, 7, 12));
  renderComponent();

  await waitFor(() => {
    expect(
      screen.getByText(coursesResponse.data.courseList.data[0].name.fi)
    ).toBeInTheDocument();
  });

  coursesResponse.data.courseList.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.buttonLoadMore.replace(
        '{{count}}',
        (
          coursesResponse.data.courseList.meta.count -
          coursesResponse.data.courseList.data.length
        ).toString()
      ),
    })
  );

  await waitFor(() => {
    expect(
      screen.getByText(eventsLoadMoreResponse.data.courseList.data[0].name.fi)
    ).toBeInTheDocument();
  });

  eventsLoadMoreResponse.data.courseList.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });
});

it('should show toastr message when loading next event page fails', async () => {
  toast.error = jest.fn();
  const mocks = [
    ...commonMocks,
    {
      request: {
        query: CourseListDocument,
        variables: {
          ...courseListVariables,
          page: 2,
        },
      },
      error: new Error('not found'),
    },
  ];

  renderComponent(mocks);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.buttonLoadMore.replace(
        '{{count}}',
        (
          coursesResponse.data.courseList.meta.count -
          coursesResponse.data.courseList.data.length
        ).toString()
      ),
    })
  );

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(toast.error).toBeCalledWith(translations.eventSearch.errorLoadMode);
});
