import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

import {
  EventFieldsFragment,
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

const useSimilarEventsQueryVariables = (
  event: EventFields,
  type: EventTypeId
) => {
  const locale = useLocale();
  const { search } = useLocation();
  const { keywords } = getEventFields(event, locale);
  const eventSearch = getSearchQuery({
    ...EVENT_DEFAULT_SEARCH_FILTERS,
    keyword: keywords.map((keyword) => keyword.id),
  });

  // Filter by search query if exists, if not filter by event keywords
  const searchParams = new URLSearchParams(search || eventSearch);
  return React.useMemo(() => {
    return getEventSearchVariables({
      include: ['keywords', 'location'],
      language: locale,
      pageSize: PAGE_SIZE,
      params: searchParams,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      superEventType: ['umbrella', 'none'],
      eventType: type,
    });
  }, [locale, searchParams, type]);
};

const getSimilarEventsQueryData = (query: EventListQuery | undefined) => {
  if (!query) return null;

  if ('eventList' in query) {
    return query.eventList.data;
  }
  if ('courseList' in query) {
    return query.eventList.data;
  }
  throw new Error('invalid type' + query);
};

type SimilarEventsQueryResult<T> = {
  data: T[];
  loading: boolean;
};

export const useSimilarEventsQuery = <T extends EventFieldsFragment>(
  event: EventFields,
  type: EventTypeId
): SimilarEventsQueryResult<T> => {
  const eventFilters = useSimilarEventsQueryVariables(event, type);
  const { data: eventsData, loading } = useEventListQuery({
    ssr: false,
    variables: eventFilters,
  });
  // To display only certain amount of events.
  // Always fetch data by using same page size to get events from cache
  const data = (getSimilarEventsQueryData(eventsData)
    // Don't show current event on the list
    ?.filter((item) => item.id !== event.id)
    .slice(0, SIMILAR_EVENTS_AMOUNT) || []) as T[];

  return { data, loading };
};

export const useSimilarCoursesQuery = <T extends EventFieldsFragment>(
  event: EventFields
): SimilarEventsQueryResult<T> => {
  return useSimilarEventsQuery(event, EventTypeId.Course);
};

const useOtherEventTimesVariables = (
  event: EventFields,
  eventType: EventTypeId = EventTypeId.General
) => {
  const superEventId = React.useMemo(
    () => getEventIdFromUrl(event.superEvent?.internalId || '', 'event'),
    [event.superEvent]
  );

  const variables = React.useMemo(
    (): EventListQueryVariables => ({
      include: ['keywords', 'location'],
      sort: EVENT_SORT_OPTIONS.START_TIME,
      start: 'now',
      superEvent: superEventId,
      eventType,
    }),
    [eventType, superEventId]
  );

  return { superEventId, variables };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useOtherEventTimes = (event: EventFields) => {
  const { t } = useTranslation();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const { variables, superEventId } = useOtherEventTimesVariables(
    event,
    EventTypeId.General
  );
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

  return { events: subEvents, loading, isFetchingMore, superEventId };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useOtherCourseTimes = (event: EventFields) => {
  const { t } = useTranslation();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const { variables, superEventId } = useOtherEventTimesVariables(
    event,
    EventTypeId.Course
  );
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

  return { events: subEvents, loading, isFetchingMore, superEventId };
};
