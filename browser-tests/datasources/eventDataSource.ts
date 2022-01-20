import { GraphQLClient } from 'graphql-request';

import { SUPPORT_LANGUAGES } from '../../src/constants';
import { isEventClosed, isLocalized } from '../../src/domain/event/EventUtils';
import {
  EVENT_SORT_OPTIONS,
  PAGE_SIZE,
} from '../../src/domain/eventSearch/constants';
import { getEventSearchVariables } from '../../src/domain/eventSearch/utils';
import { EventFieldsFragment, getSdk } from '../utils/generated/graphql';
import { getGraphQLUrl } from '../utils/settings';
const client = new GraphQLClient(getGraphQLUrl());
const sdk = getSdk(client);

export const getEvents = async (
  count = PAGE_SIZE,
  locale = SUPPORT_LANGUAGES.FI,
  queryParams = ''
): Promise<EventFieldsFragment[]> => {
  const searchVariables = getEventSearchVariables({
    params: new URLSearchParams(`?${queryParams}`),
    include: ['keywords', 'location'],
    language: SUPPORT_LANGUAGES.FI,
    pageSize: count,
    sortOrder: EVENT_SORT_OPTIONS.END_TIME,
    superEventType: ['umbrella', 'none'],
  });
  const {
    eventList: { data },
  } = await sdk.EventList(searchVariables);
  // Filter out events that have ended less than 15 minutes ago due to linked events cache.
  return data.filter(
    (event) => isLocalized(event, locale) && !isEventClosed(event)
  );
};
