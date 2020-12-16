import React from 'react';

import {
  CollectionFieldsFragment,
  CollectionListDocument,
} from '../../../../generated/graphql';
import { fakeCollections } from '../../../../util/mockDataUtils';
import { render, screen, waitFor } from '../../../../util/testUtils';
import SimilarCollections from '../SimilarCollections';

const collectionNames = [
  'Collection 1',
  'Collection 2',
  'Collection 3',
  'Collection 4',
];

const collections = fakeCollections(
  collectionNames.length,
  collectionNames.map((name) => ({
    title: { fi: name },
  }))
);
const collection = collections.data[0] as CollectionFieldsFragment;
const collectionsResponse = { data: { collectionList: collections } };

const mocks = [
  {
    request: {
      query: CollectionListDocument,
    },
    result: collectionsResponse,
  },
];

test('should show similar collections', async () => {
  render(<SimilarCollections collection={collection} />, {
    mocks,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  // Should hide current collection from the list
  collectionNames.forEach((name, index) => {
    if (index === 0) {
      // Current collection should not be in the list
      expect(screen.queryByText(name)).not.toBeInTheDocument();
    } else {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });
});
