import { MockedResponse } from '@apollo/client/testing';

import {
  EventDetails,
  EventsByIdsDocument,
  EventsByIdsQueryVariables,
} from '../../generated/graphql';

export const getEventsByIdsMock = ({
  variables,
  eventsByIds,
}: {
  variables: Partial<EventsByIdsQueryVariables>;
  eventsByIds: EventDetails[];
}): MockedResponse => {
  console.log("eventsByIds", eventsByIds)
  return {
    request: {
      query: EventsByIdsDocument,
      variables,
    },
    result: {
      data: {
        data: eventsByIds,
        meta: {
          count: eventsByIds.length
        }
      },
    },
  };
};
