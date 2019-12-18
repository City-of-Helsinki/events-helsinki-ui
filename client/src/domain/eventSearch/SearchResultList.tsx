import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import Button from "../../common/components/button/Button";
import { FilterType } from "../../common/components/filterButton/FilterButton";
import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { EventListQuery } from "../../generated/graphql";
import getLocale from "../../util/getLocale";
import isClient from "../../util/isClient";
import { getSearchQuery } from "../../util/searchUtils";
import Container from "../app/layout/Container";
import EventCard from "./EventCard";
import PublisherFilter from "./PublisherFilter";
import styles from "./searchResultList.module.scss";

interface Props {
  eventsData: EventListQuery;
  loading: boolean;
  onLoadMore: () => void;
}

const SearchResultList: React.FC<Props> = ({
  eventsData,
  loading,
  onLoadMore
}) => {
  const { t } = useTranslation();
  const locale = getLocale();
  const { push } = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);
  const events = eventsData.eventList.data;
  const publisher = searchParams.get("publisher");

  const handleFilterRemove = (value: string, type: FilterType) => {
    // TODO: Support all the filtering types
    const search = getSearchQuery({
      categories: [],
      dateTypes: [],
      endDate: null,
      isCustomDate: false,
      publisher: type !== "publisher" ? searchParams.get("publisher") : null,
      search: "",
      startDate: null
    });

    push({ pathname: `/${locale}/events`, search });
    // Scroll to top when changing filters. Ignore this on SSR becasue window doesn't exist
    window.scrollTo(0, 0);
  };

  // TODO: Uppdate this variable when adding new filters
  const hasFilters = !!searchParams.get("publisher");

  React.useEffect(() => {
    // Scroll to top when page loads. Ignore this on SSR because window doesn't exist
    if (isClient) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className={styles.searchResultListContainer}>
      <Container>
        <div className={styles.count}>
          {t("eventSearch.textFoundEvents", {
            count: eventsData.eventList.meta.count
          })}
        </div>
        <div className={styles.searchResultWrapper}>
          <div className={styles.filtersContainer}>
            <div className={styles.filtersWrapper}>
              <h4 className={styles.titleFilterSummary}>
                {t("eventSearch.filters.titleSummary")}
              </h4>
              {/* TODO: Add filters summary here */}
              {hasFilters ? (
                <>
                  {publisher && (
                    <PublisherFilter
                      id={publisher}
                      onRemove={handleFilterRemove}
                    />
                  )}
                </>
              ) : (
                t("eventSearch.filters.textNoFilters")
              )}
            </div>
          </div>
          <div className={styles.eventListWrapper}>
            {events.map(event => {
              return <EventCard key={event.id} event={event} />;
            })}
            <div className={styles.loadMoreWrapper}>
              <LoadingSpinner isLoading={loading}>
                {!!eventsData.eventList.meta.next && (
                  <Button color="primary" size="default" onClick={onLoadMore}>
                    {t("eventSearch.buttonLoadMore")}
                  </Button>
                )}
              </LoadingSpinner>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchResultList;
