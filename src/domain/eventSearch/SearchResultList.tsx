import get from "lodash/get";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import Button from "../../common/components/button/Button";
import FilterButton, {
  FilterType
} from "../../common/components/filterButton/FilterButton";
import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { DISTRICTS, TARGET_GROUPS } from "../../constants";
import { EventListQuery } from "../../generated/graphql";
import { formatDate } from "../../util/dateUtils";
import getLocale from "../../util/getLocale";
import getUrlParamAsString from "../../util/getUrlParamAsString";
import isClient from "../../util/isClient";
import { getSearchQuery } from "../../util/searchUtils";
import { translateValue } from "../../util/translateUtils";
import Container from "../app/layout/Container";
import DateFilter from "./DateFilter";
import EventCard from "./EventCard";
import KeywordFilter from "./KeywordFilter";
import PlaceFilter from "./PlaceFilter";
import PublisherFilter from "./PublisherFilter";
import styles from "./searchResultList.module.scss";

const findKeyOfDistrict = (value: string) =>
  Object.keys(DISTRICTS).find(key => get(DISTRICTS, key) === value);

const findKeyOfTarget = (value: string) =>
  Object.keys(TARGET_GROUPS).find(key => get(TARGET_GROUPS, key) === value);

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
  const districts = getUrlParamAsString(searchParams, "districts");
  const keywords = getUrlParamAsString(searchParams, "keywords");
  const places = getUrlParamAsString(searchParams, "places");
  const targets = getUrlParamAsString(searchParams, "targets");
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
      districts:
        type === "district"
          ? districts.filter(district => district !== value)
          : districts,
      endDate: type === "date" ? null : endDate ? new Date(endDate) : null,
      isCustomDate: !!(startDate || endDate),
      keywords:
        type === "keyword" || type === "yso"
          ? keywords.filter(keyword => keyword !== value)
          : keywords,
      places:
        type === "place" ? places.filter(place => place !== value) : places,
      publisher: type !== "publisher" ? searchParams.get("publisher") : null,
      search: "",
      startDate:
        type === "date" ? null : startDate ? new Date(startDate) : null,
      targets:
        type === "target" ? targets.filter(target => target !== value) : targets
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
    !!dateTypes.length ||
    !!districts.length ||
    !!keywords.length ||
    !!places.length ||
    !!targets.length;

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
                    <FilterButton
                      key={category}
                      onRemove={handleFilterRemove}
                      text={translateValue("home.category.", category, t)}
                      type="category"
                      value={category}
                    />
                  ))}
                  {keywords.map(keyword => (
                    <KeywordFilter
                      key={keyword}
                      onRemove={handleFilterRemove}
                      id={keyword}
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
                  {districts.map(district => (
                    <FilterButton
                      key={district}
                      onRemove={handleFilterRemove}
                      text={translateValue(
                        "commons.districts.",
                        findKeyOfDistrict(district) || "",
                        t
                      )}
                      type="district"
                      value={district}
                    />
                  ))}
                  {places.map(place => (
                    <PlaceFilter
                      key={place}
                      id={place}
                      onRemove={handleFilterRemove}
                    />
                  ))}
                  {targets.map(target => (
                    <FilterButton
                      key={target}
                      onRemove={handleFilterRemove}
                      text={translateValue(
                        "commons.targets.",
                        findKeyOfTarget(target) || "",
                        t
                      )}
                      type="target"
                      value={target}
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
