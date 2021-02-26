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
