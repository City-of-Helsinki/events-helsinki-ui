/* eslint-disable */
import { MockedResponse } from '@apollo/client/testing';
import { advanceTo } from 'jest-date-mock';
import React from 'react';
import { toast } from 'react-toastify';

import translations from '../../../common/translation/i18n/fi.json';
import {
  NeighborhoodListDocument,
  PlaceDetailsDocument,
  PlaceListDocument,
  EventListDocument,
  EventTypeId,
} from '../../../generated/graphql';
import {
  fakeEvents,
  fakeLocalizedObject,
  fakeNeighborhoods,
  fakePlace,
  fakePlaces,
} from '../../../test/mockDataUtils';
import {
  configure,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../test/testUtils';
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

const coursesResponse = { data: { eventList: { ...fakeEvents(10), meta } } };

const eventsLoadMoreResponse = {
  data: {
    eventList: {
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
  audienceMaxAgeLt: '',
  eventType: EventTypeId.Course,
};

const courseListVariables2 = {
  allOngoingAnd: ['jazz'],
  division: ['kaupunginosa:alppiharju', 'kaupunginosa:aluemeri'],
  end: '2020-12-02',
  include: ['keywords', 'location'],
  isFree: undefined,
  keywordOrSet2: [
    'yso:p1235',
    'kulke:29',
    'yso:p16327',
    'kulke:205',
    'yso:p9731',
    'kulke:87',
    'yso:p1979',
  ],
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
  audienceMaxAgeLt: '',
  eventType: EventTypeId.Course,
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
      query: EventListDocument,
      variables: courseListVariables,
    },
    result: coursesResponse,
  },
  {
    request: {
      query: EventListDocument,
      variables: courseListVariables2,
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
      query: EventListDocument,
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

const clickLoadMoreButton = () => {
  userEvent.click(
    screen.getByRole('button', {
      name: translations.courseSearch.buttonLoadMore.replace(
        '{{count}}',
        (
          coursesResponse.data.eventList.meta.count -
          coursesResponse.data.eventList.data.length
        ).toString()
      ),
    })
  );
};

it('renders title and search fields', async () => {
  renderComponent();

  await waitFor(() => {
    expect(
      screen.getByText(coursesResponse.data.eventList.data[0].name.fi)
    ).toBeInTheDocument();
  });

  expect(
    screen.getAllByRole('heading', { name: translations.courseSearch.title })[0]
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
  renderComponent(defaultMocks, [
    // eslint-disable-next-line max-len
    '/fi/courses?categories=movie_and_media&dateTypes=tomorrow&divisions=kaupunginosa%3Aalppiharju,kaupunginosa%3Aaluemeri&places=tprek%3A9302&text=jazz',
  ]);

  await waitFor(() => {
    expect(
      screen.getByText(coursesResponse.data.eventList.data[0].name.fi)
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
      screen.getByText(coursesResponse.data.eventList.data[0].name.fi)
    ).toBeInTheDocument();
  });

  coursesResponse.data.eventList.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });

  clickLoadMoreButton();

  await waitFor(() => {
    expect(
      screen.getByText(eventsLoadMoreResponse.data.eventList.data[0].name.fi)
    ).toBeInTheDocument();
  });

  eventsLoadMoreResponse.data.eventList.data.forEach((event) => {
    expect(
      screen.getByText((_content, el) => el.textContent === event.name.fi)
    ).toBeInTheDocument();
  });
});

it('should show toastr message when loading next event page fails', async () => {
  toast.error = jest.fn();
  const mocks = [
    ...commonMocks,
    {
      request: {
        query: EventListDocument,
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

  clickLoadMoreButton();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(toast.error).toBeCalledWith(translations.eventSearch.errorLoadMode);
});
