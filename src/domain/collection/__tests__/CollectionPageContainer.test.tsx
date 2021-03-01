import { MockedResponse } from '@apollo/react-testing';
import { screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import * as React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import {
  CollectionDetailsDocument,
  CollectionFieldsFragment,
} from '../../../generated/graphql';
import { fakeCollection } from '../../../test/mockDataUtils';
import { renderWithRoute } from '../../../test/testUtils';
import { ROUTES } from '../../app/routes/constants';
import CollectionPageContainer from '../CollectionPageContainer';

const collection = fakeCollection() as CollectionFieldsFragment;

const path = ROUTES.COLLECTION;
const routes = [ROUTES.COLLECTION.replace(':slug', collection.slug)];
const draftRoutes = [
  `${ROUTES.COLLECTION.replace(':slug', collection.slug)}?draft=true`,
];

export const getMocks = (
  collectionDetails: CollectionFieldsFragment,
  draft = false
): MockedResponse[] => [
  {
    request: {
      query: CollectionDetailsDocument,
      variables: {
        draft,
        slug: collectionDetails.slug,
      },
    },
    result: {
      data: {
        collectionDetails,
      },
    },
  },
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
