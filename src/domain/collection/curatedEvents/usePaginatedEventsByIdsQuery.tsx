import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
  EventFieldsFragment,
  EventTypeId,
  useEventsByIdsQuery,
} from '../../../generated/graphql';
import { isEventClosed } from '../../event/EventUtils';
import { EVENT_SORT_OPTIONS } from '../../eventSearch/constants';
import { getNextPage } from '../../eventSearch/utils';

export const PAGE_SIZE = 10;

const usePaginatedEventsByIdsQuery = (
  eventIds: string[]
): {
  isFetchingMore: boolean;
  loading: boolean;
  events: EventFieldsFragment[];
  expiredEvents: EventFieldsFragment[];
  onLoadMoreEvents: () => Promise<void>;
  hasMoreEventsToLoad: boolean;
  eventCursorIndex: number;
  eventsTotalCount: number;
} => {
  const { t } = useTranslation();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const [eventCursorIndex, setEventCursorIndex] = React.useState(PAGE_SIZE);
  const [hasMoreEventsToLoad, setHasMoreEventsToLoad] = React.useState(false);
  const {
    data: eventsData,
    loading,
    fetchMore,
  } = useEventsByIdsQuery({
    variables: {
      ids: eventIds,
      eventType: [EventTypeId.General, EventTypeId.Course],
      include: ['location'],
      pageSize: PAGE_SIZE,
      sort: EVENT_SORT_OPTIONS.END_TIME,
    },
    ssr: false,
  });
  React.useEffect(() => {
    setHasMoreEventsToLoad(!!eventsData?.eventsByIds.meta.next);
  }, [eventsData, isFetchingMore]);

  const events =
    eventsData?.eventsByIds.data.filter((event) => !isEventClosed(event)) || [];
  const expiredEvents =
    eventsData?.eventsByIds.data.filter((event) => isEventClosed(event)) || [];

  const onLoadMoreEvents = async () => {
    const page = eventsData?.eventsByIds.meta
      ? getNextPage(eventsData.eventsByIds.meta)
      : null;
    setHasMoreEventsToLoad(!!eventsData?.eventsByIds.meta.next);
    setIsFetchingMore(true);
    if (page) {
      try {
        await fetchMore({
          variables: {
            page,
          },
        });
      } catch (e) {
        toast.error(t('collection.eventList.errorLoadMore'));
      }
      setEventCursorIndex(page * PAGE_SIZE);
    }
    setIsFetchingMore(false);
  };

  return {
    isFetchingMore,
    loading,
    events,
    expiredEvents,
    onLoadMoreEvents,
    hasMoreEventsToLoad,
    eventCursorIndex,
    eventsTotalCount: eventsData?.eventsByIds.meta.count ?? 0,
  };
};

export default usePaginatedEventsByIdsQuery;
