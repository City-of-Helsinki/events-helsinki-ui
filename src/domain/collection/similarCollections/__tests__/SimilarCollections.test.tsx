import * as React from 'react';

import { CollectionFieldsFragment } from '../../../../generated/graphql';
import {
  collectionListFilterTests,
  getCollectionQueryListMocks,
} from '../../../../util/collections.common.tests';
import { fakeCollections } from '../../../../util/mockDataUtils';
import { render, screen, waitFor } from '../../../../util/testUtils';
import { SIMILAR_COLLECTIONS_AMOUNT } from '../../constants';
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

const mocks = getCollectionQueryListMocks(collections);

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

describe('similar collections filters', () => {
  collectionListFilterTests(
    <SimilarCollections collection={collection} />,
    SIMILAR_COLLECTIONS_AMOUNT
  );
});
