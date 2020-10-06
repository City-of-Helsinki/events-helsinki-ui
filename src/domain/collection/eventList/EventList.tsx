import React from 'react';

import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import {
  CollectionFieldsFragment,
  useEventListQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import Container from '../../app/layout/Container';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from '../../eventSearch/constants';
import EventSearchList from '../../eventSearch/searchResultList/EventList';
import { getEventSearchVariables, getNextPage } from '../../eventSearch/utils';
import { getCollectionFields } from '../CollectionUtils';
import styles from './eventList.module.scss';

interface Props {
  collection: CollectionFieldsFragment;
}

const EventList: React.FC<Props> = ({ collection }) => {
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const locale = useLocale();
  const { eventListQuery, eventListTitle } = getCollectionFields(
    collection,
    locale
  );
  const searchParams = new URLSearchParams(
    eventListQuery ? new URL(eventListQuery).search : ''
  );
  const eventFilters = React.useMemo(() => {
    return getEventSearchVariables({
      include: ['keywords', 'location'],
      language: locale,
      pageSize: PAGE_SIZE,
      params: searchParams,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      superEventType: ['umbrella', 'none'],
    });
  }, [locale, searchParams]);

  const { data: eventsData, fetchMore, loading } = useEventListQuery({
    notifyOnNetworkStatusChange: true,
    skip: !eventListQuery,
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
        console.error(e);
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
                  eventsData={eventsData}
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
