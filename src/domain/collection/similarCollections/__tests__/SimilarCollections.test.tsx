import * as React from 'react';

import { CollectionFieldsFragment } from '../../../../generated/graphql';
import {
  collectionListFilterTests,
  getCollectionQueryListMocks,
} from '../../../../test/collections/collections.common.tests';
import { fakeCollections } from '../../../../test/mockDataUtils';
import { render, screen, waitFor } from '../../../../test/testUtils';
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
  expect(screen.queryByText(collectionNames[0])).not.toBeInTheDocument();

  // rest should be visible
  collectionNames.slice(1).forEach((name) => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});

describe('similar collections filters', () => {
  collectionListFilterTests({
    component: <SimilarCollections collection={collection} />,
    generatedCollectionListSize: SIMILAR_COLLECTIONS_AMOUNT,
  });
});
