/* eslint-disable no-console */
import { MockedResponse } from '@apollo/react-testing';
import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';
import { toast } from 'react-toastify';

import translations from '../../../../common/translation/i18n/fi.json';
import { CollectionFieldsFragment, Meta } from '../../../../generated/graphql';
import {
  createEventListRequestAndResultMocks,
  createEventListRequestThrowsErrorMocks,
} from '../../../../test/apollo-mocks/eventListMocks';
import { fakeCollection, fakeEvents } from '../../../../test/mockDataUtils';
import { render, screen, userEvent, waitFor } from '../../../../test/testUtils';
import EventList from '../EventList';

const eventListTitle = 'Event list title';

const meta: Meta = {
  count: 20,
  next:
    'https://api.hel.fi/linkedevents/v1/event/?page=2&sort=start_time&start=2020-10-05T03',
  previous: null,
  __typename: 'Meta',
};

const events = fakeEvents(10);

const eventsResponse = {
  ...events,
  meta,
};

const loadMoreEvents = fakeEvents(10);

const loadMoreEventsResponse = {
  ...loadMoreEvents,
  meta: { ...meta, next: null },
};

const searchVariables = { allOngoingAnd: ['jooga'], isFree: true };

const firstPageMock = createEventListRequestAndResultMocks({
  variables: searchVariables,
  response: eventsResponse,
});

const secondPageMock = createEventListRequestAndResultMocks({
  variables: { ...searchVariables, page: 2 },
  response: loadMoreEventsResponse,
});

const secondPageThrowsErrorMock = createEventListRequestThrowsErrorMocks({
  variables: {
    ...searchVariables,
    page: 2,
  },
});

const defaultMocks = [firstPageMock, secondPageMock];

afterAll(() => {
  clear();
});

const renderComponent = (
  collection: CollectionFieldsFragment,
  mocks: MockedResponse[] = defaultMocks
) => render(<EventList collection={collection} />, { mocks });

test('should show event list correctly', async () => {
  advanceTo('2020-10-03');
  const collection = fakeCollection({
    eventListTitle: { fi: eventListTitle },
  }) as CollectionFieldsFragment;
  renderComponent(collection);

  await waitFor(() => {
    expect(
      screen.queryByRole('heading', { name: eventListTitle })
    ).toBeInTheDocument();
  });

  events.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.buttonLoadMore.replace('{{count}}', '10'),
    })
  );

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  loadMoreEvents.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });
});

test('should show toastr if loading next page fails', async () => {
  advanceTo('2020-10-03');
  toast.error = jest.fn();
  const mocks = [firstPageMock, secondPageThrowsErrorMock];
  const collection = fakeCollection({
    eventListTitle: { fi: eventListTitle },
  }) as CollectionFieldsFragment;
  renderComponent(collection, mocks);

  await waitFor(() => {
    expect(
      screen.queryByRole('heading', { name: eventListTitle })
    ).toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.buttonLoadMore.replace('{{count}}', '10'),
    })
  );

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(toast.error).toBeCalledWith(
    translations.collection.eventList.errorLoadMore
  );
});

test('should not show event list when eventListQuery is empty string', async () => {
  advanceTo('2020-10-03');

  const collection = fakeCollection({
    eventListQuery: { fi: '' },
    eventListTitle: { fi: eventListTitle },
  }) as CollectionFieldsFragment;

  renderComponent(collection);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(
    screen.queryByRole('heading', { name: eventListTitle })
  ).not.toBeInTheDocument();
});
