import React from "react";

import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import {
  CollectionDetailsQuery,
  useEventListQuery
} from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import Container from "../../app/layout/Container";
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from "../../eventSearch/constants";
import { getEventFilters, getNextPage } from "../../eventSearch/EventListUtils";
import EventSearchList from "../../eventSearch/searchResultList/EventList";
import styles from "./eventList.module.scss";

interface Props {
  collectionData: CollectionDetailsQuery;
}

const EventList: React.FC<Props> = ({ collectionData }) => {
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const locale = useLocale();
  const searchParams = new URLSearchParams(
    collectionData.collectionDetails.eventListQuery
  );
  const eventFilters = React.useMemo(() => {
    return getEventFilters(
      searchParams,
      PAGE_SIZE,
      EVENT_SORT_OPTIONS.END_TIME,
      locale
    );
  }, [locale, searchParams]);
  const { data: eventsData, fetchMore, loading } = useEventListQuery({
    notifyOnNetworkStatusChange: true,
    ssr: false,
    variables: eventFilters
  });

  const handleLoadMore = async () => {
    const page = getNextPage(eventsData);
    setIsFetchingMore(true);

    if (page) {
      await fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const events = [
            ...prev.eventList.data,
            ...fetchMoreResult.eventList.data
          ];
          fetchMoreResult.eventList.data = events;
          return fetchMoreResult;
        },
        variables: {
          ...eventFilters,
          page: page
        }
      });
    }
    setIsFetchingMore(false);
  };

  return (
    <div className={styles.eventList}>
      <Container>
        <h2>
          {getLocalisedString(
            collectionData.collectionDetails.eventListTitle,
            locale
          )}
        </h2>
        <LoadingSpinner isLoading={!isFetchingMore && loading}>
          {eventsData && (
            <div className={styles.eventSearchListWrapper}>
              <EventSearchList
                eventsData={eventsData}
                loading={isFetchingMore}
                onLoadMore={handleLoadMore}
              />
            </div>
          )}
        </LoadingSpinner>
      </Container>
    </div>
  );
};

export default EventList;
