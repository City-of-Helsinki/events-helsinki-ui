import { MockedResponse } from '@apollo/react-testing';

import {
  EventListDocument,
  EventListQueryVariables,
  EventListResponse,
} from '../../generated/graphql';

export const eventListBaseVariables: EventListQueryVariables = {
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keyword: [],
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

export const getOtherEventsVariables = (
  superEvent: EventListQueryVariables['superEvent'],
  start: EventListQueryVariables['start']
): EventListQueryVariables => ({
  include: ['keywords', 'location'],
  sort: 'start_time',
  start,
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
  start: EventListQueryVariables['start'],
  variablesOverride: EventListQueryVariables = {},
  expectedResponse: EventListResponse
): MockedResponse => ({
  request: {
    query: EventListDocument,
    variables: {
      ...getOtherEventsVariables(superEvent, start),
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
  start: EventListQueryVariables['start'],
  variablesOverride: EventListQueryVariables = {}
): MockedResponse => ({
  request: {
    query: EventListDocument,
    variables: {
      ...getOtherEventsVariables(superEvent, start),
      ...variablesOverride,
    },
  },
  error: new Error('not found'),
});
