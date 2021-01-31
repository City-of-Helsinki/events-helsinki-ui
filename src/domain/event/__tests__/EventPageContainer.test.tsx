import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import {
  EventDetailsDocument,
  EventListDocument,
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
import { otherEventTimesListTestId } from '../eventInfo/otherEventTimes/OtherEventTimes';
import EventPageContainer from '../EventPageContainer';
import { similarEventsListTestId } from '../similarEvents/SimilarEvents';

const id = '1';
const name = 'Event title';
const description = 'Event descirption';
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
const similarEventsNames = [
  'JUMPPI-streetdance Suurpellossa, Opimäen koululla!',
  'Narrin teatteriryhmä Rastilassa',
];

const event = fakeEvent({
  id,
  startTime,
  endTime,
  name: { fi: name },
  description: fakeLocalizedObject(description),
  keywords: keywords.map((k) =>
    fakeKeyword({ name: fakeLocalizedObject(k.name), id: k.id })
  ),
  audience: audience.map((targetGroup) =>
    fakeTargetGroup({ name: fakeLocalizedObject(targetGroup) })
  ),
  superEvent: {
    __typename: 'InternalIdObject',
    internalId: `https://api.hel.fi/linkedevents/v1/event/${superEventId}/`,
  },
});

const eventRequest = {
  query: EventDetailsDocument,
  variables: {
    id,
    include: ['in_language', 'keywords', 'location', 'audience'],
  },
};

const similarEventsListRequest = {
  query: EventListDocument,
  variables: {
    audienceMinAgeGt: '',
    audienceMaxAgeLt: '',
    end: '',
    include: ['keywords', 'location'],
    isFree: undefined,
    //keyword: ['keyword1', 'keyword2', 'keyword3'],
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

const otherEventsRequest = {
  query: EventListDocument,
  variables: {
    include: ['keywords', 'location'],
    sort: 'start_time',
    start: 'now',
    superEvent: superEventId,
  },
};

const request = {
  query: EventDetailsDocument,
  variables: {
    id,
    include: ['in_language', 'keywords', 'location'],
  },
};

const similarEventsResponse = {
  data: {
    eventList: fakeEvents(
      similarEventTimesCount,
      similarEventsNames.map((name) => ({ name: fakeLocalizedObject(name) }))
    ),
  },
};

const eventResponse = { data: { eventDetails: event } };

const otherEventsResponse = {
  data: { eventList: fakeEvents(otherEventTimesCount) },
};

const mocks = [
  {
    request: eventRequest,
    result: eventResponse,
  },
  {
    request: otherEventsRequest,
    result: otherEventsResponse,
  },
  {
    request: similarEventsListRequest,
    result: similarEventsResponse,
  },
];

const testPath = ROUTES.EVENT.replace(':id', id);
const routes = [testPath];

const renderComponent = () =>
  renderWithRoute(<EventPageContainer />, {
    mocks,
    routes,
    path: ROUTES.EVENT,
  });

afterAll(() => {
  clear();
});

it('should render info and load other events + similar events', async () => {
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

  similarEventsNames.forEach((eventName) => {
    expect(
      screen.queryByLabelText(`Siirry tapahtumaan: ${eventName}`, {
        selector: 'a',
      })
    ).toBeInTheDocument();
  });
});

it('should show error info when event is closed', async () => {
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

  renderWithRoute(<EventPageContainer />, {
    mocks,
    routes,
    path: ROUTES.EVENT,
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
