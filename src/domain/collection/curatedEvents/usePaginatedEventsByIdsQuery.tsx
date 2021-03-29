import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
  EventFieldsFragment,
  LinkedEventsSource,
  useEventsByIdsQuery,
} from '../../../generated/graphql';
import { isEventClosed } from '../../event/EventUtils';
import { EventType } from '../../event/types';

export const PAGE_SIZE = 10;

const usePageNumber = (
  eventsCount: number | undefined,
  eventIdsCount: number
) => {
  const pageNumber = React.useRef(
    // if eventsByIds is available on first render, they are coming from cache
    // Initialize page number based on its length
    eventsCount ? Math.ceil(eventsCount / PAGE_SIZE) : 1
  );
  const eventCursorIndex = pageNumber.current * PAGE_SIZE;
  const hasMoreEventsToLoad = eventCursorIndex < eventIdsCount;

  return { pageNumber, eventCursorIndex, hasMoreEventsToLoad };
};

const usePaginatedEventsByIdsQuery = (
  eventIds: string[],
  eventType: EventType
): {
  isFetchingMore: boolean;
  loading: boolean;
  events: EventFieldsFragment[];
  expiredEvents: EventFieldsFragment[];
  onLoadMoreEvents: () => Promise<void>;
  hasMoreEventsToLoad: boolean;
  eventCursorIndex: number;
} => {
  const { t } = useTranslation();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

  const { data: eventsData, loading, fetchMore } = useEventsByIdsQuery({
    variables: {
      ids: eventIds.slice(0, PAGE_SIZE),
      include: ['location'],
      source: {
        course: LinkedEventsSource.Linkedcourses,
        event: LinkedEventsSource.Linkedevents,
      }[eventType],
    },
    ssr: false,
  });

  const { pageNumber, eventCursorIndex, hasMoreEventsToLoad } = usePageNumber(
    eventsData?.eventsByIds.length,
    eventIds.length
  );

  const events =
    eventsData?.eventsByIds.filter((event) => !isEventClosed(event)) || [];
  const expiredEvents =
    eventsData?.eventsByIds.filter((event) => isEventClosed(event)) || [];

  const onLoadMoreEvents = async () => {
    if (hasMoreEventsToLoad) {
      setIsFetchingMore(true);
      try {
        await fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            const events = [
              ...prev.eventsByIds,
              ...fetchMoreResult.eventsByIds,
            ];
            fetchMoreResult.eventsByIds = events;
            return fetchMoreResult;
          },
          variables: {
            ids: eventIds.slice(eventCursorIndex, eventCursorIndex + PAGE_SIZE),
            include: ['location'],
          },
        });
        pageNumber.current = pageNumber.current + 1;
      } catch (e) {
        toast.error(t('collection.eventList.errorLoadMore'));
      }

      setIsFetchingMore(false);
    }
  };

  return {
    isFetchingMore,
    loading,
    events,
    expiredEvents,
    onLoadMoreEvents,
    hasMoreEventsToLoad,
    eventCursorIndex,
  };
};

export default usePaginatedEventsByIdsQuery;
