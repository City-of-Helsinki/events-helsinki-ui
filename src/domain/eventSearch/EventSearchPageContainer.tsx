import React from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, useLocation, withRouter } from "react-router";

import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import SrOnly from "../../common/components/srOnly/SrOnly";
import { useEventListQuery } from "../../generated/graphql";
import useLocale from "../../hooks/useLocale";
import PageWrapper from "../app/layout/PageWrapper";
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from "./constants";
import { getEventFilters, getNextPage } from "./EventListUtils";
import styles from "./eventSearchPage.module.scss";
import Search from "./Search";
import SearchResultList from "./searchResultList/SearchResultList";

const EventSearchPageContainer: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const eventFilters = React.useMemo(() => {
    return getEventFilters(
      searchParams,
      ["keywords", "location"],
      ["umbrella", "none"],
      PAGE_SIZE,
      EVENT_SORT_OPTIONS.END_TIME,
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
    <PageWrapper
      className={styles.eventSearchPageWrapper}
      title="eventSearch.title"
    >
      <SrOnly as="h1">{t("eventSearch.title")}</SrOnly>
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
    </PageWrapper>
  );
};

export default withRouter(EventSearchPageContainer);
