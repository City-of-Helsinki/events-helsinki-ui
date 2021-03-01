import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import {
  EventDetailsDocument,
  EventFieldsFragment,
} from '../../../generated/graphql';
import { createEventListRequestAndResultMocks } from '../../../test/apollo-mocks/eventListMocks';
import { fakeEvent, fakeEvents } from '../../../test/mockDataUtils';
import { renderWithRoute, screen, waitFor } from '../../../test/testUtils';
import { setFeatureFlags } from '../../../util/featureFlags.test.utils';
import { ROUTES } from '../../app/routes/constants';
import EventPageContainer from '../EventPageContainer';

const id = '1';
const name = 'Event title';
const startTime = '2020-10-05T07:00:00.000000Z';
const endTime = '2020-10-05T10:00:00.000000Z';

const event = fakeEvent({
  id,
  startTime,
  endTime,
  name: { fi: name },
}) as EventFieldsFragment;

const eventKeywordIds = event.keywords.map((keyword) => keyword.id);

const request = {
  query: EventDetailsDocument,
  variables: {
    id,
    include: ['in_language', 'keywords', 'location'],
  },
};

const eventResponse = { data: { eventDetails: event } };
const responseEvents = fakeEvents(3);
const mocks = [
  {
    request,
    result: eventResponse,
  },
  createEventListRequestAndResultMocks(
    { allOngoing: true, keyword: eventKeywordIds },
    responseEvents
  ),
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

it('should render event', async () => {
  advanceTo('2020-10-01');
  renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  expect(screen.queryByRole('heading', { name })).toBeInTheDocument();
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
    setFeatureFlags({ SHOW_SIMILAR_EVENTS: true });
    advanceTo('2020-10-01');
    renderComponent();
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    expect(
      screen.queryByRole('heading', {
        name: translations.event.similarEvents.title,
      })
    ).toBeInTheDocument();
  });
  it('doesnt show similar events when flag is off', async () => {
    setFeatureFlags({ SHOW_SIMILAR_EVENTS: false });
    advanceTo('2020-10-01');
    renderComponent();
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
