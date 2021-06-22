import { MockedResponse } from '@apollo/client/testing';
import { screen, waitFor, within } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { axe } from 'jest-axe';
import * as React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import {
  CollectionFieldsFragment,
  EventTypeId,
} from '../../../generated/graphql';
import { getCollectionDetailsMock } from '../../../test/apollo-mocks/collectionsDetailsMocks';
import { getEventsByIdsMock } from '../../../test/apollo-mocks/eventByIdsMocks';
import {
  fakeCollection,
  fakeEvent,
  fakeLocalizedObject,
} from '../../../test/mockDataUtils';
import { renderWithRoute } from '../../../test/testUtils';
import { ROUTES } from '../../app/routes/constants';
import CollectionPageContainer from '../CollectionPageContainer';

const curatedEventId = 'kulke:51381';
const curatedEventName = 'Curated test event';

const collection = fakeCollection({
  curatedEvents: [
    `https://tapahtumat.test.kuva.hel.ninja/fi/event/${curatedEventId}?places=tprek%3A7254`,
  ],
}) as CollectionFieldsFragment;

const path = ROUTES.COLLECTION;
const routes = [ROUTES.COLLECTION.replace(':slug', collection.slug)];
const draftRoutes = [
  `${ROUTES.COLLECTION.replace(':slug', collection.slug)}?draft=true`,
];

const eventsByIds = [
  fakeEvent({
    id: curatedEventId,
    name: fakeLocalizedObject(curatedEventName),
  }),
];

const getMocks = (
  collectionDetails: CollectionFieldsFragment,
  draft = false
): MockedResponse[] => [
  getCollectionDetailsMock({
    collectionDetails,
    variables: { draft, slug: collectionDetails.slug },
  }),
  getEventsByIdsMock({
    variables: {
      ids: [curatedEventId],
      eventType: [EventTypeId.General, EventTypeId.Course],
      include: ['location'],
      pageSize: 10,
      sort: 'end_time',
    },
    eventsByIds,
  }),
];

it('component should be accessible', async () => {
  const mocks = getMocks(collection, false);
  const { container } = renderWithRoute(<CollectionPageContainer />, {
    mocks,
    path,
    routes,
  });

  await waitFor(() => {
    expect(screen.getByText(collection.title.fi)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(await axe(container)).toHaveNoViolations();
});

it('should show PreviewBanner if draft version is requested', async () => {
  const mocks = getMocks(collection, true);
  renderWithRoute(<CollectionPageContainer />, {
    mocks,
    path,
    routes: draftRoutes,
  });

  await waitFor(() => {
    expect(screen.getByText(collection.title.fi)).toBeInTheDocument();
  });

  expect(screen.getByText(translations.commons.preview)).toBeInTheDocument();
});

it("should show 'not found' page if collection doesn't exist", async () => {
  renderWithRoute(<CollectionPageContainer />, {
    mocks: [],
    path,
    routes,
  });

  await waitFor(() => {
    expect(
      screen.getByText(translations.collection.notFound.title)
    ).toBeInTheDocument();
  });

  expect(
    screen.getByText(translations.collection.notFound.linkSearchEvents)
  ).toBeInTheDocument();
  expect(
    screen.getByText(translations.collection.notFound.text)
  ).toBeInTheDocument();
});

it('should show error hero if selected language is not supported', async () => {
  const mocks = getMocks(
    { ...collection, title: { ...collection.title, fi: '' } },
    false
  );
  renderWithRoute(<CollectionPageContainer />, {
    mocks,
    path,
    routes,
  });

  await waitFor(() => {
    expect(
      screen.getByText(translations.collection.languageNotSupported.title)
    ).toBeInTheDocument();
  });

  expect(
    screen.getByText(
      translations.collection.languageNotSupported.linkSearchEvents
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(translations.collection.languageNotSupported.text)
  ).toBeInTheDocument();
});

it('should show error hero if collection is expired', async () => {
  const mocks = getMocks({ ...collection, expired: true }, false);
  renderWithRoute(<CollectionPageContainer />, {
    mocks,
    path,
    routes,
  });

  await waitFor(() => {
    expect(
      screen.getByText(translations.collection.expired.title)
    ).toBeInTheDocument();
  });

  expect(
    screen.getByText(translations.collection.expired.linkSearchEvents)
  ).toBeInTheDocument();
  expect(
    screen.getByText(translations.collection.expired.text)
  ).toBeInTheDocument();
});

it('should fetch and render curated event and scroll to it', async () => {
  const mocks = getMocks(collection, false);
  const history = createMemoryHistory();
  history.push({ pathname: routes[0], state: { eventId: curatedEventId } });

  const scrollIntoViewMock = jest.fn();

  jest.spyOn(document, 'getElementById').mockImplementation(() => {
    const el = document.createElement('div');
    el.scrollIntoView = scrollIntoViewMock;
    return el;
  });

  renderWithRoute(<CollectionPageContainer />, {
    mocks,
    routes,
    path,
    history,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  const eventsList = screen.getByTestId('curated-events-list');

  await waitFor(() => {
    expect(
      within(eventsList).queryByText(curatedEventName)
    ).toBeInTheDocument();
  });
  expect(scrollIntoViewMock).toHaveBeenCalledWith({
    behavior: 'smooth',
    block: 'center',
  });
});
