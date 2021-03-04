import { MockedResponse } from '@apollo/react-testing';

import {
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
  superEvent: EventListQueryVariables['superEvent']
): EventListQueryVariables => ({
  include: ['keywords', 'location'],
  sort: 'start_time',
  start: 'now',
  superEvent,
});

export const createEventListRequestAndResultMocks = (
  variablesOverride: EventListQueryVariables = {},
  expectedResponse: EventListResponse
): MockedResponse => ({
  request: {
    query: EventListDocument,
    variables: {
      ...eventListBaseVariables,
      ...variablesOverride,
    },
  },
  result: {
    data: {
      eventList: expectedResponse,
    },
  },
});

export const createEventListRequestThrowsErrorMocks = (
  variablesOverride: EventListQueryVariables = {}
): MockedResponse => ({
  request: {
    query: EventListDocument,
    variables: {
      ...eventListBaseVariables,
      ...variablesOverride,
    },
  },
  error: new Error('not found'),
});

export const createOtherEventTimesRequestAndResultMocks = (
  superEvent: EventListQueryVariables['superEvent'],
  variablesOverride: EventListQueryVariables = {},
  expectedResponse: EventListResponse
): MockedResponse => ({
  request: {
    query: EventListDocument,
    variables: {
      ...getOtherEventsVariables(superEvent),
      ...variablesOverride,
    },
  },
  result: {
    data: {
      eventList: expectedResponse,
    },
  },
});

export const createOtherEventTimesRequestThrowsErrorMocks = (
  superEvent: EventListQueryVariables['superEvent'],
  variablesOverride: EventListQueryVariables = {}
): MockedResponse => ({
  request: {
    query: EventListDocument,
    variables: {
      ...getOtherEventsVariables(superEvent),
      ...variablesOverride,
    },
  },
  error: new Error('not found'),
});
