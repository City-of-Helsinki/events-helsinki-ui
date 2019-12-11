import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { useEventListQuery } from "../../generated/graphql";
import Layout from "../app/layout/Layout";
import { PAGE_SIZE } from "./constants";
import { getNextPage } from "./EventListUtils";
import styles from "./eventSearchPage.module.scss";
import SearchResultList from "./SearchResultList";

const EventSearchPageContainer: React.FC<RouteComponentProps> = () => {
  const { data: eventsData, fetchMore, loading } = useEventListQuery({
    fetchPolicy: "cache-and-network",
    variables: { pageSize: PAGE_SIZE }
  });

  const handleLoadMore = () => {
    const page = getNextPage(eventsData);

    if (page) {
      fetchMore({
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
          page: page,
          pageSize: PAGE_SIZE
        }
      });
    }
  };

  return (
    <Layout>
      <div className={styles.eventSearchPageWrapper}>
        <LoadingSpinner isLoading={!eventsData && loading}>
          {eventsData && (
            <>
              <SearchResultList
                eventsData={eventsData}
                loading={loading}
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
