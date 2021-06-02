import { MockedResponse } from '@apollo/client/testing';

import {
  CollectionDetailsDocument,
  CollectionDetailsQueryVariables,
  CollectionFieldsFragment,
} from '../../generated/graphql';

const collectionDetailsBaseVariables: CollectionDetailsQueryVariables = {
  draft: false,
  slug: '',
};

export const getCollectionDetailsMock = ({
  variables,
  collectionDetails,
}: {
  variables: Partial<CollectionDetailsQueryVariables>;
  collectionDetails: CollectionFieldsFragment;
}): MockedResponse => ({
  request: {
    query: CollectionDetailsDocument,
    variables: {
      ...collectionDetailsBaseVariables,
      ...variables,
    },
  },
  result: {
    data: {
      collectionDetails,
    },
  },
});
