import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import {
  CollectionFieldsFragment,
  useEventListQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import Container from '../../app/layout/Container';
import EventSearchList from '../../eventList/EventList';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from '../../eventSearch/constants';
import {
  getEventSearchVariables,
  getEventTypeFromRouteUrl,
  getNextPage,
} from '../../eventSearch/utils';
import { getCollectionFields } from '../CollectionUtils';
import styles from './eventList.module.scss';

interface Props {
  collection: CollectionFieldsFragment;
}

const EventList: React.FC<Props> = ({ collection }) => {
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const locale = useLocale();
  const { t } = useTranslation();

  const { eventListQuery, eventListTitle } = getCollectionFields(
    collection,
    locale
  );
  const eventType = getEventTypeFromRouteUrl(eventListQuery, locale);

  const eventFilters = React.useMemo(() => {
    const searchParams = new URLSearchParams(
      eventListQuery ? new URL(eventListQuery).search : ''
    );
    return getEventSearchVariables({
      include: ['keywords', 'location'],
      language: locale,
      pageSize: PAGE_SIZE,
      params: searchParams,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      superEventType: ['umbrella', 'none'],
      eventType: eventType ?? 'event',
    });
  }, [eventListQuery, eventType, locale]);

  const { data: eventsData, fetchMore, loading } = useEventListQuery({
    notifyOnNetworkStatusChange: true,
    skip: !eventListQuery || !eventType,
    ssr: false,
    variables: eventFilters,
  });

  const handleLoadMore = async () => {
    const page = eventsData?.eventList.meta
      ? getNextPage(eventsData.eventList.meta)
      : null;

    setIsFetchingMore(true);

    if (page) {
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
            ...eventFilters,
            page: page,
          },
        });
      } catch (e) {
        toast.error(t('collection.eventList.errorLoadMore'));
      }
    }

    setIsFetchingMore(false);
  };

  return (
    <div className={styles.eventList}>
      <Container>
        <LoadingSpinner isLoading={!isFetchingMore && loading}>
          {!!eventsData && !!eventsData.eventList.data.length && (
            <div className={styles.contentWrapper}>
              {eventListTitle && <h2>{eventListTitle}</h2>}
              <div className={styles.eventSearchListWrapper}>
                <EventSearchList
                  buttonCentered={true}
                  events={eventsData.eventList.data}
                  hasNext={!!eventsData.eventList.meta.next}
                  count={eventsData.eventList.meta.count}
                  loading={isFetchingMore}
                  onLoadMore={handleLoadMore}
                />
              </div>
            </div>
          )}
        </LoadingSpinner>
      </Container>
    </div>
  );
};

export default EventList;
