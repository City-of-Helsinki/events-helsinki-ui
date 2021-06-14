import { FetchResult, GraphQLRequest } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';

import { EventType } from '../../domain/event/types';
import {
  EventListDocument,
  EventListQueryVariables,
  EventListResponse,
  EventTypeId,
  QueryEventListArgs,
} from '../../generated/graphql';

export const baseVariables = {
  audienceMaxAgeLt: '',
  audienceMinAgeGt: '',
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keywordAnd: [],
  keywordNot: [],
  keywordOrSet3: [],
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

export const courseListBaseVariables: QueryEventListArgs = {
  ...baseVariables,
  keywordOrSet2: ['keyword1', 'keyword2', 'keyword3'],
};

export const getOtherEventsVariables = (
  superEvent: EventListQueryVariables['superEvent']
): EventListQueryVariables => ({
  sort: 'start_time',
  start: 'now',
  superEvent,
  eventType: [EventTypeId.General, EventTypeId.Course],
});

const createRequest = (
  type: EventType = 'event',
  variablesOverride: EventListQueryVariables = {}
): GraphQLRequest => ({
  query: EventListDocument,
  variables: {
    ...(type === 'event' ? eventListBaseVariables : courseListBaseVariables),
    ...variablesOverride,
    eventType: type === 'event' ? [EventTypeId.General] : [EventTypeId.Course],
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
  type?: EventType;
  superEventId?: EventListQueryVariables['superEvent'];
  variables?: EventListQueryVariables;
  response?: EventListResponse;
};

export const createEventListRequestAndResultMocks = ({
  type = 'event',
  variables = {},
  response,
}: EventListMockArguments): MockedResponse => ({
  request: createRequest(type, variables),
  result: createResult(response),
});

export const createEventListRequestThrowsErrorMocks = ({
  type = 'event',
  variables = {},
}: EventListMockArguments = {}): MockedResponse => ({
  request: createRequest(type, variables),
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
