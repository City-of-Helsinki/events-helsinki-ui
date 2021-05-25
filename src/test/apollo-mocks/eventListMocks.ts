import { MockedResponse } from '@apollo/react-testing';
import { FetchResult, GraphQLRequest } from 'apollo-link';

import { EventType } from '../../domain/event/types';
import {
  EventListDocument,
  EventListQueryVariables,
  EventListResponse,
  EventTypeId,
  QueryEventListArgs,
} from '../../generated/graphql';

export const eventListBaseVariables: QueryEventListArgs = {
  audienceMaxAgeLt: '',
  audienceMinAgeGt: '',
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keywordAnd: [],
  keywordNot: [],
  keywordOrSet1: [],
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

export const courseListBaseVariables: QueryEventListArgs = {
  ...eventListBaseVariables,
  keywordOrSet1: ['keyword1', 'keyword2', 'keyword3'],
};

export const getOtherEventsVariables = (
  superEvent: EventListQueryVariables['superEvent']
): EventListQueryVariables => ({
  include: ['keywords', 'location'],
  sort: 'start_time',
  start: 'now',
  superEvent,
});

const createRequest = (
  type: EventType = 'event',
  variablesOverride: EventListQueryVariables = {}
): GraphQLRequest => ({
  query: EventListDocument,
  variables: {
    ...(type === 'event' ? eventListBaseVariables : courseListBaseVariables),
    ...variablesOverride,
    eventType: type === 'event' ? EventTypeId.General : EventTypeId.Course,
  },
});

const createResult = (expectedResponse: EventListResponse): FetchResult => ({
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
  type = 'event',
  superEventId,
  variables,
  response,
}: EventListMockArguments): MockedResponse => ({
  request: {
    query: EventListDocument,
    variables: {
      ...getOtherEventsVariables(superEventId),
      ...variables,
      eventType: type === 'event' ? EventTypeId.General : EventTypeId.Course,
    },
  },
  result: createResult(response),
});

export const createOtherEventTimesRequestThrowsErrorMocks = ({
  type = 'event',
  superEventId,
  variables,
}: EventListMockArguments): MockedResponse => ({
  request: {
    query: EventListDocument,
    variables: {
      ...getOtherEventsVariables(superEventId),
      ...variables,
      eventType: type === 'event' ? EventTypeId.General : EventTypeId.Course,
    },
  },
  error: new Error('not found'),
});
