import { MockedResponse } from '@apollo/react-testing';
import { FetchResult, GraphQLRequest } from 'apollo-link';

import { EventType } from '../../domain/event/types';
import {
  CourseListDocument,
  CourseListQueryVariables,
  EventListDocument,
  EventListQueryVariables,
  EventListResponse,
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
  superEvent: (EventListQueryVariables | CourseListQueryVariables)['superEvent']
): EventListQueryVariables => ({
  include: ['keywords', 'location'],
  sort: 'start_time',
  start: 'now',
  superEvent,
});

const createRequest = (
  type: EventType = 'event',
  variablesOverride: EventListQueryVariables | CourseListQueryVariables = {}
): GraphQLRequest => ({
  query: type === 'event' ? EventListDocument : CourseListDocument,
  variables: {
    ...(type === 'event' ? eventListBaseVariables : courseListBaseVariables),
    ...variablesOverride,
  },
});

const createResult = (
  type: EventType = 'event',
  expectedResponse: EventListResponse
): FetchResult => ({
  data: {
    [`${type}List`]: expectedResponse,
  },
});

export type EventListMockArguments = {
  type?: EventType;
  superEventId?: (
    | EventListQueryVariables
    | CourseListQueryVariables
  )['superEvent'];
  variables?: EventListQueryVariables | CourseListQueryVariables;
  response?: EventListResponse;
};

export const createEventListRequestAndResultMocks = ({
  type = 'event',
  variables = {},
  response,
}: EventListMockArguments): MockedResponse => ({
  request: createRequest(type, variables),
  result: createResult(type, response),
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
    query: type === 'event' ? EventListDocument : CourseListDocument,
    variables: {
      ...getOtherEventsVariables(superEventId),
      ...variables,
    },
  },
  result: createResult(type, response),
});

export const createOtherEventTimesRequestThrowsErrorMocks = ({
  type = 'event',
  superEventId,
  variables,
}: EventListMockArguments): MockedResponse => ({
  request: {
    query: type === 'event' ? EventListDocument : CourseListDocument,
    variables: {
      ...getOtherEventsVariables(superEventId),
      ...variables,
    },
  },
  error: new Error('not found'),
});
