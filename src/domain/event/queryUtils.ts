import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

import {
  EventListQuery,
  EventListQueryVariables,
  EventTypeId,
  useEventListQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import {
  EVENT_DEFAULT_SEARCH_FILTERS,
  EVENT_SORT_OPTIONS,
  PAGE_SIZE,
} from '../eventSearch/constants';
import {
  getEventSearchVariables,
  getNextPage,
  getSearchQuery,
} from '../eventSearch/utils';
import { SIMILAR_EVENTS_AMOUNT } from './constants';
import { getEventFields, getEventIdFromUrl } from './EventUtils';
import { EventFields, EventType } from './types';

const useSimilarEventsQueryVariables = (
  event: EventFields,
  type: EventType
) => {
  const locale = useLocale();
  const { search } = useLocation();
  const { keywords } = getEventFields(event, locale);
  const eventSearch = getSearchQuery({
    ...EVENT_DEFAULT_SEARCH_FILTERS,
    keyword: keywords.map((keyword) => keyword.id),
  });

  return React.useMemo(() => {
    // Filter by search query if exists, if not filter by event keywords
    const searchParams = new URLSearchParams(search || eventSearch);
    return getEventSearchVariables({
      include: ['keywords', 'location'],
      language: locale,
      pageSize: PAGE_SIZE,
      params: searchParams,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      superEventType: ['umbrella', 'none'],
      eventType: type,
    });
  }, [eventSearch, locale, search, type]);
};

export const useSimilarEventsQuery = (
  event: EventFields,
  type: EventType
): { loading: boolean; data: EventListQuery['eventList']['data'] } => {
  const eventFilters = useSimilarEventsQueryVariables(event, type);
  const { data: eventsData, loading } = useEventListQuery({
    ssr: false,
    variables: eventFilters,
  });

  // To display only certain amount of events.
  // Always fetch data by using same page size to get events from cache
  const data =
    eventsData?.eventList.data
      // Don't show current event on the list
      ?.filter((item) => item.id !== event.id)
      .slice(0, SIMILAR_EVENTS_AMOUNT) || [];

  return { data, loading };
};

const useOtherEventTimesVariables = (event: EventFields) => {
  const superEventId = React.useMemo(
    () => getEventIdFromUrl(event.superEvent?.internalId || '', 'event'),
    [event.superEvent]
  );

  const variables = React.useMemo(
    (): EventListQueryVariables => ({
      // include: ['keywords', 'location'],
      sort: EVENT_SORT_OPTIONS.START_TIME,
      start: 'now',
      superEvent: superEventId,
      /* 
      Since LE v2 is listing general type of events 
      when no event type is given as a parameter,
      this needs a list of eventTypes
      or otherwise some events or courses are always excluded.
      */
      eventType: [EventTypeId.General, EventTypeId.Course] //event.typeId
    }),
    [superEventId]
  );

  return { superEventId, variables };
};

export const useSubEventsQueryVariables = (
  event: EventFields
): { superEventId: string | undefined; variables: EventListQueryVariables } => {
  const variables = React.useMemo(
    (): EventListQueryVariables => ({
      // include: ['keywords', 'location'],
      sort: EVENT_SORT_OPTIONS.START_TIME,
      start: 'now',
      superEvent: event.id,
      /* 
      Since LE v2 is listing general type of events 
      when no event type is given as a parameter,
      this needs a list of eventTypes
      or otherwise some events or courses are always excluded.
      */
      eventType: [EventTypeId.General, EventTypeId.Course] //event.typeId
    }),
    [event.id]
  );

  return { superEventId: event.id, variables };
};

export const useSubEvents = (
  event: EventFields,
  variables: EventListQueryVariables,
  superEventId: string | undefined
): { subEvents: EventFields[]; isFetchingMore: boolean; loading: boolean } => {
  const { t } = useTranslation();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const { data: subEventsData, fetchMore, loading } = useEventListQuery({
    skip: !superEventId,
    ssr: false,
    variables,
  });
  const handleLoadMore = React.useCallback(
    async (page: number) => {
      setIsFetchingMore(true);

      try {
        await fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;

            const events = [
              ...prev.eventList.data,
              ...fetchMoreResult.eventList.data,
            ];
            fetchMoreResult.eventList.data = events;

            return fetchMoreResult;
          },
          variables: {
            ...variables,
            page: page,
          },
        });
      } catch (e) {
        toast.error(t('event.info.errorLoadMode'));
      }
      setIsFetchingMore(false);
    },
    [fetchMore, t, variables]
  );

  React.useEffect(() => {
    const page = subEventsData?.eventList.meta
      ? getNextPage(subEventsData.eventList.meta)
      : null;

    if (page) {
      handleLoadMore(page);
    }
  }, [handleLoadMore, subEventsData]);

  const subEvents =
    subEventsData?.eventList.data.filter(
      (subEvent) => subEvent.id !== event.id
    ) || [];

  return { subEvents, isFetchingMore, loading };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useOtherEventTimes = (
  event: EventFields,
): {
  events: EventFields[];
  loading: boolean;
  isFetchingMore: boolean;
  superEventId: string | undefined;
} => {
  const { variables, superEventId } = useOtherEventTimesVariables(event);

  const { subEvents, isFetchingMore, loading } = useSubEvents(
    event,
    variables,
    superEventId
  );

  return { events: subEvents, loading, isFetchingMore, superEventId };
};
