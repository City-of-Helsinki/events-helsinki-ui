import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import {
  EventDetailsDocument,
  EventFieldsFragment,
  EventListDocument,
} from '../../../generated/graphql';
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
import { ROUTES } from '../../app/routes/constants';
import { otherEventTimesListTestId } from '../eventInfo/OtherEventTimes';
import EventPageContainer, {
  EventPageContainerProps,
} from '../EventPageContainer';

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
const otherEventTimesCount = 10;

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
}) as EventFieldsFragment;

const eventKeywordIds = event.keywords.map((keyword) => keyword.id);

const eventRequest = {
  query: EventDetailsDocument,
  variables: {
    id,
    include: ['in_language', 'keywords', 'location', 'audience'],
  },
};
const otherEventsRequest = {
  query: EventListDocument,
  variables: {
    include: ['in_language', 'keywords', 'location', 'audience'],
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

const eventResponse = { data: { eventDetails: event } };
const otherEventsResponse = {
  data: { eventList: fakeEvents(otherEventTimesCount) },
};
const similarEvents = fakeEvents(3);
const mocks = [
  {
    request: eventRequest,
    result: eventResponse,
  },
  {
    request: otherEventsRequest,
    result: otherEventsResponse,
  },
  createOtherEventTimesRequestAndResultMocks({
    superEventId,
    response: fakeEvents(otherEventTimesCount),
  }),
  createEventListRequestAndResultMocks({
    variables: { allOngoing: true, keywordOrSet1: eventKeywordIds },
    response: similarEvents,
  }),
];

const testPath = ROUTES.EVENT.replace(':id', id);
const routes = [testPath];

const renderComponent = (props?: Partial<EventPageContainerProps>) =>
  renderWithRoute(<EventPageContainer {...props} />, {
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
      screen.queryByRole('link', { name: keyword.name })
    ).toBeInTheDocument();
  });

  await screen.findByText('Tapahtuman muut ajat');

  expect(screen.getByTestId(otherEventTimesListTestId).children).toHaveLength(
    3
  );

  // click show other times
  userEvent.click(screen.getByRole('button', { name: 'Näytä kaikki' }));

  expect(screen.getByTestId(otherEventTimesListTestId).children).toHaveLength(
    otherEventTimesCount
  );
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

describe(`SIMILAR_EVENTS feature flag`, () => {
  it('shows similar events when flag is on', async () => {
    advanceTo('2020-10-01');
    renderComponent({ showSimilarEvents: true });
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    expect(
      screen.queryByRole('heading', {
        name: translations.event.similarEvents.title,
      })
    ).toBeInTheDocument();

    similarEvents.data.forEach(({ name }) => {
      expect(
        screen.queryByLabelText(`Siirry tapahtumaan: ${name.fi}`, {
          selector: 'a',
        })
      ).toBeInTheDocument();
    });
  });

  it('doesnt show similar events when flag is off', async () => {
    advanceTo('2020-10-01');
    renderComponent({ showSimilarEvents: false });
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    expect(
      screen.queryByRole('heading', {
        name: translations.event.similarEvents.title,
      })
    ).not.toBeInTheDocument();
  });
});

it('should link to events search when clicking tags', async () => {
  advanceTo('2020-10-01');
  const { history } = renderComponent();

  const pushSpy = jest.spyOn(history, 'push');

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  // click keyword / tag
  userEvent.click(screen.getByRole('link', { name: 'Avouinti' }));

  expect(pushSpy).toHaveBeenCalledWith({
    pathname: '/fi/events',
    search: '?text=Avouinti',
  });
});
