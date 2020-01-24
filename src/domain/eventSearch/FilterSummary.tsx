import get from "lodash/get";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import FilterButton, {
  FilterType
} from "../../common/components/filterButton/FilterButton";
import { DISTRICTS, TARGET_GROUPS } from "../../constants";
import useLocale from "../../hooks/useLocale";
import { formatDate } from "../../util/dateUtils";
import getUrlParamAsString from "../../util/getUrlParamAsString";
import { getSearchQuery } from "../../util/searchUtils";
import { translateValue } from "../../util/translateUtils";
import DateFilter from "./DateFilter";
import styles from "./filterSummary.module.scss";
import KeywordFilter from "./KeywordFilter";
import PlaceFilter from "./PlaceFilter";
import PublisherFilter from "./PublisherFilter";

const findKeyOfDistrict = (value: string) =>
  Object.keys(DISTRICTS).find(key => get(DISTRICTS, key) === value);

const findKeyOfTarget = (value: string) =>
  Object.keys(TARGET_GROUPS).find(key => get(TARGET_GROUPS, key) === value);

const FilterSummary = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { push } = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);
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
  };

  const clearFilters = () => {
    const search = getSearchQuery({
      categories: [],
      dateTypes: [],
      districts: [],
      endDate: null,
      isCustomDate: !!(startDate || endDate),
      keywords: [],
      places: [],
      publisher: null,
      search: "",
      startDate: null,
      targets: []
    });

    push({ pathname: `/${locale}/events`, search });
  };

  const hasFilters =
    !!searchParams.get("publisher") ||
    !!categories.length ||
    !!dateText ||
    !!dateTypes.length ||
    !!districts.length ||
    !!keywords.length ||
    !!places.length ||
    !!targets.length;

  return (
    <div className={styles.filterSummary}>
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
              <PublisherFilter id={publisher} onRemove={handleFilterRemove} />
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
            <button
              className={styles.clearButton}
              onClick={clearFilters}
              type="button"
            >
              {t("eventSearch.buttonClearFilters")}
            </button>
          </>
        ) : (
          t("eventSearch.filters.textNoFilters")
        )}
      </div>
    </div>
  );
};

export default FilterSummary;
