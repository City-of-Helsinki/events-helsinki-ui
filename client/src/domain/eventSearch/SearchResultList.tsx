import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import Button from "../../common/components/button/Button";
import { FilterType } from "../../common/components/filterButton/FilterButton";
import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { EventListQuery } from "../../generated/graphql";
import { formatDate } from "../../util/dateUtils";
import getLocale from "../../util/getLocale";
import getUrlParamAsString from "../../util/getUrlParamAsString";
import isClient from "../../util/isClient";
import { getSearchQuery } from "../../util/searchUtils";
import { translateValue } from "../../util/translateUtils";
import Container from "../app/layout/Container";
import CategoryFilter from "./CategoryFilter";
import DateFilter from "./DateFilter";
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
  const categories = getUrlParamAsString(searchParams, "categories");
  const dateTypes = getUrlParamAsString(searchParams, "dateTypes");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const dateText = startDate
    ? endDate
      ? `${formatDate(new Date(startDate))} - ${formatDate(new Date(endDate))}`
      : formatDate(new Date(startDate))
    : endDate
    ? formatDate(new Date(endDate))
    : "";

  const handleFilterRemove = (value: string, type: FilterType) => {
    // TODO: Support all the filtering types
    const endDate = searchParams.get("endDate");
    const startDate = searchParams.get("startDate");

    const search = getSearchQuery({
      categories:
        type === "category"
          ? categories.filter(category => category !== value)
          : categories,
      dateTypes:
        type === "dateType"
          ? dateTypes.filter(dateType => dateType !== value)
          : dateTypes,
      endDate: type === "date" ? null : endDate ? new Date(endDate) : null,
      isCustomDate: !!(startDate || endDate),
      publisher: type !== "publisher" ? searchParams.get("publisher") : null,
      search: "",
      startDate: type === "date" ? null : startDate ? new Date(startDate) : null
    });

    push({ pathname: `/${locale}/events`, search });
    // Scroll to top when changing filters. Ignore this on SSR becasue window doesn't exist
    window.scrollTo(0, 0);
  };

  // TODO: Uppdate this variable when adding new filters
  const hasFilters =
    !!searchParams.get("publisher") ||
    !!categories.length ||
    !!dateText ||
    !!dateTypes.length;

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
                  {categories.map(category => (
                    <CategoryFilter
                      key={category}
                      onRemove={handleFilterRemove}
                      text={translateValue("home.category.", category, t)}
                      value={category}
                    />
                  ))}
                  {publisher && (
                    <PublisherFilter
                      id={publisher}
                      onRemove={handleFilterRemove}
                    />
                  )}
                  {dateText && (
                    <DateFilter
                      onRemove={handleFilterRemove}
                      text={dateText}
                      type="date"
                      value="date"
                    />
                  )}
                  {dateTypes.map(dateType => (
                    <DateFilter
                      key={dateType}
                      onRemove={handleFilterRemove}
                      type="dateType"
                      value={dateType}
                    />
                  ))}
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
