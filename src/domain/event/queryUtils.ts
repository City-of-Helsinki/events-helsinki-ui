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
import { EventFields } from './types';

const useSimilarEventsQueryVariables = (event: EventFields) => {
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
      sortOrder: EVENT_SORT_OPTIONS.START_TIME,
      superEventType: ['umbrella', 'none'],
    });
  }, [eventSearch, locale, search]);
};

export const useSimilarEventsQuery = (
  event: EventFields
): { loading: boolean; data: EventListQuery['eventList']['data'] } => {
  const eventFilters = useSimilarEventsQueryVariables(event);
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
      include: ['in_language', 'keywords', 'location', 'audience'],
      sort: EVENT_SORT_OPTIONS.START_TIME,
      start: 'now',
      superEvent: superEventId,
      eventType: [EventTypeId.General],
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
      sort: EVENT_SORT_OPTIONS.START_TIME,
      start: 'now',
      superEvent: event.id,
      eventType: [EventTypeId.General],
      include: ['in_language', 'keywords', 'location', 'audience'],
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
  const {
    data: subEventsData,
    fetchMore,
    loading,
  } = useEventListQuery({
    skip: !superEventId,
    ssr: false,
    variables,
  });

  const handleLoadMore = React.useCallback(
    async (page: number) => {
      setIsFetchingMore(true);

      try {
        await fetchMore({
          variables: {
            page,
          },
        });
      } catch (e) {
        toast.error(t('event.info.errorLoadMode'));
      }
      setIsFetchingMore(false);
    },
    [fetchMore, t]
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
  event: EventFields
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
