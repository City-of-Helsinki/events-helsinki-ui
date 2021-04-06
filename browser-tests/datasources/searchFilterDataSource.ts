import { GraphQLClient } from 'graphql-request';

import { getFilteredNeighborhoodList } from '../../src/hooks/useDivisionOptions';
import {
  getSdk,
  Neighborhood,
  PlaceFieldsFragment,
} from '../utils/generated/graphql';
import { getGraphQLUrl } from '../utils/settings';

const client = new GraphQLClient(getGraphQLUrl());
const sdk = getSdk(client);

const getNeighborhoodOptions = async (): Promise<Neighborhood[]> => {
  const {
    neighborhoodList: { data },
  } = await sdk.NeighborhoodList();
  return getFilteredNeighborhoodList(data);
};

const getHelsinkiPlaceOptions = async (): Promise<PlaceFieldsFragment[]> => {
  const {
    placeList: { data },
  } = await sdk.PlaceList({
    divisions: ['kunta:helsinki'],
    hasUpcomingEvents: true,
  });
  return data;
};
export const searchFilterDataSource = {
  getNeighborhoodOptions,
  getHelsinkiPlaceOptions,
};
