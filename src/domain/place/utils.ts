import {
  Maybe,
  PlaceDetailsDocument,
  PlaceDetailsQuery,
} from '../../generated/graphql';
import apolloClient from '../app/apollo/apolloClient';

export const getPlaceDetailsFromCache = (
  id: string
): Maybe<PlaceDetailsQuery> => {
  const data = apolloClient.readQuery<PlaceDetailsQuery>({
    query: PlaceDetailsDocument,
    variables: { id },
  });

  return data;
};
