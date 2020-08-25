import { screen, waitFor } from '@testing-library/react';
import React from 'react';

import mockCollection from '../__mocks__/collection';
import translations from '../../../common/translation/i18n/fi.json';
import {
  CollectionDetailsDocument,
  CollectionFieldsFragment,
} from '../../../generated/graphql';
import { renderWithRoute } from '../../../util/testUtils';
import { ROUTES } from '../../app/constants';
import CollectionPageContainer from '../CollectionPageContainer';

const path = ROUTES.COLLECTION;
const routes = [ROUTES.COLLECTION.replace(':slug', mockCollection.slug)];
const draftRoutes = [
  `${ROUTES.COLLECTION.replace(':slug', mockCollection.slug)}?draft=true`,
];

const getMocks = (
  collectionDetails: CollectionFieldsFragment,
  draft = false
) => [
  {
    request: {
      query: CollectionDetailsDocument,
      variables: {
        draft,
        slug: mockCollection.slug,
      },
    },
    result: {
      data: {
        collectionDetails,
      },
    },
  },
];

it('matches snapshot', async () => {
  const mocks = getMocks(mockCollection, false);
  const { container } = renderWithRoute(<CollectionPageContainer />, {
    mocks,
    path,
    routes,
  });

  await waitFor(() => {
    expect(
      screen.getByText((mockCollection.title || {})['fi'] || '')
    ).toBeInTheDocument();
  });

  expect(container.firstChild).toMatchSnapshot();
});

it('should show PreviewBanner if draft version is requested ', async () => {
  const mocks = getMocks(mockCollection, true);
  renderWithRoute(<CollectionPageContainer />, {
    mocks,
    path,
    routes: draftRoutes,
  });

  await waitFor(() => {
    expect(
      screen.getByText((mockCollection.title || {})['fi'] || '')
    ).toBeInTheDocument();
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
    { ...mockCollection, title: { ...mockCollection.title, fi: '' } },
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
  const mocks = getMocks({ ...mockCollection, expired: true }, false);
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
