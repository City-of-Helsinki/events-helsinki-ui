import { MockedResponse } from '@apollo/react-testing';

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
  return {
    request: {
      query: EventsByIdsDocument,
      variables,
    },
    result: {
      data: {
        eventsByIds,
      },
    },
  };
};
