import { FetchResult, GraphQLRequest } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';

import {
  EventListDocument,
  EventListQueryVariables,
  EventListResponse,
  EventTypeId,
  QueryEventListArgs,
} from '../../generated/graphql';

export const baseVariables = {
  suitableFor: [],
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keywordAnd: [],
  keywordNot: [],
  language: 'fi',
  location: [],
  pageSize: 10,
  publisher: null,
  sort: 'end_time',
  start: 'now',
  startsAfter: undefined,
  superEventType: ['umbrella', 'none'],
};

export const eventListBaseVariables: QueryEventListArgs = {
  ...baseVariables,
  keywordOrSet1: [],
};

export const getOtherEventsVariables = (
  superEvent: EventListQueryVariables['superEvent']
): EventListQueryVariables => ({
  sort: 'start_time',
  start: 'now',
  superEvent,
  eventType: [EventTypeId.General],
});

const createRequest = (
  variablesOverride: EventListQueryVariables = {}
): GraphQLRequest => ({
  query: EventListDocument,
  variables: {
    ...eventListBaseVariables,
    ...variablesOverride,
    eventType: [EventTypeId.General],
  },
});

const createResult = (
  expectedResponse: EventListResponse | undefined
): FetchResult => ({
  data: {
    eventList: expectedResponse,
  },
});

export type EventListMockArguments = {
  superEventId?: EventListQueryVariables['superEvent'];
  variables?: EventListQueryVariables;
  response?: EventListResponse;
};

export const createEventListRequestAndResultMocks = ({
  variables = {},
  response,
}: EventListMockArguments): MockedResponse => ({
  request: createRequest(variables),
  result: createResult(response),
});

export const createEventListRequestThrowsErrorMocks = ({
  variables = {},
}: EventListMockArguments = {}): MockedResponse => ({
  request: createRequest(variables),
  error: new Error('not found'),
});

export const createOtherEventTimesRequestAndResultMocks = ({
  superEventId,
  variables,
  response,
}: EventListMockArguments): MockedResponse => ({
  request: {
    query: EventListDocument,
    variables: {
      ...getOtherEventsVariables(superEventId),
      ...variables,
    },
  },
  result: createResult(response),
});

export const createOtherEventTimesRequestThrowsErrorMocks = ({
  superEventId,
  variables,
}: EventListMockArguments): MockedResponse => ({
  request: {
    query: EventListDocument,
    variables: {
      ...getOtherEventsVariables(superEventId),
      ...variables,
    },
  },
  error: new Error('not found'),
});
