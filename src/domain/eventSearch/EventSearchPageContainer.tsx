import React from "react";
import { RouteComponentProps, useLocation, withRouter } from "react-router";

import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { useEventListQuery } from "../../generated/graphql";
import useLocale from "../../hooks/useLocale";
import Layout from "../app/layout/Layout";
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from "./constants";
import { getEventFilters, getNextPage } from "./EventListUtils";
import styles from "./eventSearchPage.module.scss";
import Search from "./Search";
import SearchResultList from "./searchResultList/SearchResultList";

const EventSearchPageContainer: React.FC<RouteComponentProps> = () => {
  const locale = useLocale();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const eventFilters = React.useMemo(() => {
    return getEventFilters(
      searchParams,
      ["keywords", "location"],
      PAGE_SIZE,
      EVENT_SORT_OPTIONS.START_TIME,
      locale
    );
  }, [locale, searchParams]);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

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
    <Layout>
      <div className={styles.eventSearchPageWrapper}>
        <Search />
        <LoadingSpinner isLoading={!isFetchingMore && loading}>
          {eventsData && (
            <>
              <SearchResultList
                eventsData={eventsData}
                loading={isFetchingMore}
                onLoadMore={handleLoadMore}
              />
            </>
          )}
        </LoadingSpinner>
      </div>
    </Layout>
  );
};

export default withRouter(EventSearchPageContainer);
