import { MockedResponse } from '@apollo/react-testing';
import { screen, waitFor } from '@testing-library/react';
import range from 'lodash/range';

import {
  CollectionListDocument,
  CollectionListQueryVariables,
  CollectionListResponse,
} from '../generated/graphql';
import { fakeCollections } from './mockDataUtils';
import { render } from './testUtils';

export const getCollectionQueryListMocks = (
  collections: CollectionListResponse,
  variables?: CollectionListQueryVariables
): MockedResponse[] => [
  {
    request: {
      query: CollectionListDocument,
      variables,
    },
    result: { data: { collectionList: collections } },
  },
];

const renderAndWaitForComponentToBeLoaded = async ({
  component,
  collections,
  mocks = [],
  variables,
}: {
  component: React.ReactElement;
  collections: CollectionListResponse;
  mocks: MockedResponse[];
  variables?: CollectionListQueryVariables;
}) => {
  const collectionMocks = getCollectionQueryListMocks(collections, variables);
  render(component, { mocks: [...collectionMocks, ...mocks] });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
};

const renderComponentAndExpectOddCollectionsToBePresent = async ({
  component,
  collections,
  collectionNames,
  mocks = [],
  variables,
}: {
  component: React.ReactElement;
  collections: CollectionListResponse;
  collectionNames: string[];
  mocks?: MockedResponse[];
  variables?: CollectionListQueryVariables;
}) => {
  await renderAndWaitForComponentToBeLoaded({
    component,
    collections,
    mocks,
    variables,
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
};

export const collectionListFilterTests = ({
  component,
  generatedCollectionListSize = 7,
  mocks = [],
  variables,
}: {
  component: React.ReactElement;
  generatedCollectionListSize?: number;
  mocks?: MockedResponse[];
  variables?: CollectionListQueryVariables;
}): void => {
  const collectionIds = range(generatedCollectionListSize).map((id) =>
    (id + 1).toString()
  );
  const collectionNames = collectionIds.map((id) => `Collection ${id}`);

  it('should show all collections', async () => {
    const collections = fakeCollections(
      collectionIds.length,
      collectionIds.map((id, index) => ({
        id,
        title: { fi: collectionNames[index] },
      }))
    );
    await renderAndWaitForComponentToBeLoaded({
      component,
      collections,
      mocks,
      variables,
    });

    collections.data.forEach((collection) => {
      expect(screen.getByText(collection.title.fi)).toBeInTheDocument();
    });
  });

  it('should not show collection if language is not supported', async () => {
    const collections = fakeCollections(
      collectionIds.length,
      collectionIds.map((id, index) => ({
        id,
        title: { fi: Boolean(1 - (index % 2)) ? collectionNames[index] : '' },
      }))
    );

    await renderComponentAndExpectOddCollectionsToBePresent({
      component,
      collections,
      collectionNames,
      mocks,
      variables,
    });
  });

  it('should not show expired collections', async () => {
    const collections = fakeCollections(
      collectionIds.length,
      collectionIds.map((id, index) => ({
        id,
        expired: Boolean(index % 2),
        title: { fi: collectionNames[index] },
      }))
    );

    await renderComponentAndExpectOddCollectionsToBePresent({
      component,
      collections,
      collectionNames,
      mocks,
      variables,
    });
  });

  it('should not show collections that are not live', async () => {
    const collections = fakeCollections(
      collectionIds.length,
      collectionIds.map((id, index) => ({
        id,
        live: Boolean(1 - (index % 2)),
        title: { fi: collectionNames[index] },
      }))
    );
    await renderComponentAndExpectOddCollectionsToBePresent({
      component,
      collections,
      collectionNames,
      mocks,
      variables,
    });
  });
};
