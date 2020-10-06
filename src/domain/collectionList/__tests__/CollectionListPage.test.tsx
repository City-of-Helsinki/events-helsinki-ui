import { screen, waitFor } from '@testing-library/react';
import range from 'lodash/range';
import * as React from 'react';

import {
  CollectionListDocument,
  CollectionListResponse,
} from '../../../generated/graphql';
import { fakeCollections } from '../../../util/mockDataUtils';
import { render } from '../../../util/testUtils';
import CollectionListPage from '../CollectionListPage';

const collectionIds = range(1, 8).map((id) => id.toString());
const collectionNames = collectionIds.map((id) => `Collection ${id}`);

const getMocks = (collections: CollectionListResponse) => [
  {
    request: {
      query: CollectionListDocument,
    },
    result: { data: { collectionList: collections } },
  },
];

test('should show all collections', async () => {
  const collections = fakeCollections(
    collectionIds.length,
    collectionIds.map((id, index) => ({
      id,
      title: { fi: collectionNames[index] },
    }))
  );
  const mocks = getMocks(collections);
  render(<CollectionListPage />, { mocks });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  collections.data.forEach((collection) => {
    expect(screen.getByText(collection.title.fi)).toBeInTheDocument();
  });
});

test('should not show collection if language is not supported', async () => {
  const collections = fakeCollections(
    collectionIds.length,
    collectionIds.map((id, index) => ({
      id,
      title: { fi: index % 2 ? collectionNames[index] : '' },
    }))
  );

  const mocks = getMocks(collections);
  render(<CollectionListPage />, { mocks });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  collections.data.forEach((collection, index) => {
    if (index % 2) {
      expect(screen.getByText(collectionNames[index])).toBeInTheDocument();
    } else {
      expect(
        screen.queryByText(collectionNames[index])
      ).not.toBeInTheDocument();
    }
  });
});

test('should not show expired collections', async () => {
  const collections = fakeCollections(
    collectionIds.length,
    collectionIds.map((id, index) => ({
      id,
      expired: Boolean(index % 2),
      title: { fi: collectionNames[index] },
    }))
  );

  const mocks = getMocks(collections);
  render(<CollectionListPage />, { mocks });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  collections.data.forEach((collection, index) => {
    if (index % 2) {
      expect(
        screen.queryByText(collectionNames[index])
      ).not.toBeInTheDocument();
    } else {
      expect(screen.getByText(collectionNames[index])).toBeInTheDocument();
    }
  });
});
