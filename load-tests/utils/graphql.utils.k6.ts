import { QueryResult } from '@apollo/react-common';
import { DocumentNode } from 'graphql';
import { print } from 'graphql/language/printer';
// eslint-disable-next-line import/no-unresolved
import http from 'k6/http';

import {
  CollectionDetailsDocument,
  CollectionDetailsQuery,
  CollectionListDocument,
  CollectionListQuery,
  EventDetailsDocument,
  EventDetailsQuery,
  EventsByIdsDocument,
  EventsByIdsQuery,
  LandingPagesDocument,
  LandingPagesQuery,
} from '../../browser-tests/utils/generated/graphql';
import { BASE_URL, checkResponse } from './utils.k6';

export const GRAPHQL_BASE_URL =
  // eslint-disable-next-line no-undef
  __ENV.GRAPHQL_BASE_URL || 'http://localhost:4000/proxy/graphql';

export const loadGraphQlResponse = <Query>({
  operationName,
  variables,
  query,
}: {
  operationName: string;
  variables: Record<string, unknown>;
  query: DocumentNode;
}): QueryResult<Query> => {
  const response = http.post(
    GRAPHQL_BASE_URL,
    JSON.stringify({
      operationName,
      variables,
      query: print(query),
    }),
    {
      headers: {
        referer: BASE_URL,
        accept: '*/*',
        'content-type': 'application/json',
      },
    }
  );
  checkResponse(response);
  return JSON.parse(response.body as string) as QueryResult<Query>;
};

export const loadLandingPageData = (
  visibleOnFrontpage = true
): QueryResult<LandingPagesQuery> =>
  loadGraphQlResponse<LandingPagesQuery>({
    operationName: 'LandingPages',
    variables: { visibleOnFrontpage },
    query: LandingPagesDocument,
  });

export const loadLandingPageCollections = (
  visibleOnFrontpage = true
): QueryResult<CollectionListQuery> =>
  loadGraphQlResponse<CollectionListQuery>({
    operationName: 'CollectionList',
    variables: { visibleOnFrontpage },
    query: CollectionListDocument,
  });

export const loadCollection = (
  slug: string
): QueryResult<CollectionDetailsQuery> =>
  loadGraphQlResponse<CollectionDetailsQuery>({
    operationName: 'CollectionDetails',
    variables: { draft: false, slug },
    query: CollectionDetailsDocument,
  });

export const loadCuratedEvents = (
  eventIds: string[]
): QueryResult<EventsByIdsQuery> =>
  loadGraphQlResponse<EventsByIdsQuery>({
    operationName: 'EventsByIds',
    variables: {
      ids: eventIds,
      include: ['location'],
      source: 'LINKEDEVENTS',
    },
    query: EventsByIdsDocument,
  });

export const loadEventDetails = (
  eventId: string
): QueryResult<EventDetailsQuery> =>
  loadGraphQlResponse<EventDetailsQuery>({
    operationName: 'EventDetails',
    variables: {
      id: eventId,
      include: ['in_language', 'keywords', 'location', 'audience'],
    },
    query: EventDetailsDocument,
  });