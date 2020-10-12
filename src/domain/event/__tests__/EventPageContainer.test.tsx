import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import { EventDetailsDocument } from '../../../generated/graphql';
import { fakeEvent } from '../../../util/mockDataUtils';
import { renderWithRoute, screen, waitFor } from '../../../util/testUtils';
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
});

const request = {
  query: EventDetailsDocument,
  variables: {
    id,
    include: ['in_language', 'keywords', 'location'],
  },
};

const eventResponse = { data: { eventDetails: event } };

const mocks = [
  {
    request,
    result: eventResponse,
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
