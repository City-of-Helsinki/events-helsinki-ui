import get from "lodash/get";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import FilterButton, {
  FilterType
} from "../../../../common/components/filterButton/FilterButton";
import { TARGET_GROUPS } from "../../../../constants";
import { useNeighborhoodListQuery } from "../../../../generated/graphql";
import useLocale from "../../../../hooks/useLocale";
import { formatDate } from "../../../../util/dateUtils";
import getLocalisedString from "../../../../util/getLocalisedString";
import getUrlParamAsString from "../../../../util/getUrlParamAsString";
import { getSearchQuery } from "../../../../util/searchUtils";
import { translateValue } from "../../../../util/translateUtils";
import DateFilter from "./DateFilter";
import styles from "./filterSummary.module.scss";
import KeywordFilter from "./KeywordFilter";
import PlaceFilter from "./PlaceFilter";
import PublisherFilter from "./PublisherFilter";
import SearchWordFilter from "./SearchWordFilter";

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
  const isFree = searchParams.get("isFree") === "true" ? true : false;
  const keywords = getUrlParamAsString(searchParams, "keywords");
  const places = getUrlParamAsString(searchParams, "places");
  const targets = getUrlParamAsString(searchParams, "targets");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const searchWord = searchParams.get("search");
  const dateText =
    startDate || endDate
      ? `${startDate ? formatDate(new Date(startDate)) : ""} - ${
          endDate ? formatDate(new Date(endDate)) : ""
        }`.trim()
      : "";

  const { data: neighborhoodsData } = useNeighborhoodListQuery();

  const getNeighorhoodName = React.useCallback(
    (id: string) => {
      const neighborhoods = neighborhoodsData
        ? neighborhoodsData.neighborhoodList.data
        : [];
      const neighborhood = neighborhoods.find(item => item.id === id);
      return getLocalisedString(neighborhood ? neighborhood.name : {}, locale);
    },
    [locale, neighborhoodsData]
  );

  const handleFilterRemove = (value: string, type: FilterType) => {
    const endDate = searchParams.get("endDate");
    const searchWord = searchParams.get("search") || "";
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
      isFree,
      keywords:
        type === "keyword" || type === "yso"
          ? keywords.filter(keyword => keyword !== value)
          : keywords,
      places:
        type === "place" ? places.filter(place => place !== value) : places,
      publisher: type !== "publisher" ? searchParams.get("publisher") : null,
      search: type === "searchWord" ? "" : searchWord,
      startDate:
        type === "date" ? null : startDate ? new Date(startDate) : null,
      targets:
        type === "target" ? targets.filter(target => target !== value) : targets
    });

    push({ pathname: `/${locale}/events`, search });
  };

  const deleteSearchWord = () => {
    handleFilterRemove("", "searchWord");
  };

  const clearFilters = () => {
    const search = getSearchQuery({
      categories: [],
      dateTypes: [],
      districts: [],
      endDate: null,
      isFree: false,
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
    !!searchWord ||
    !!targets.length;

  return (
    <div className={styles.filterSummary}>
      <div className={styles.filtersWrapper}>
        <h2 className={styles.titleFilterSummary}>
          {t("eventSearch.filters.titleSummary")}
        </h2>
        {!!searchWord && (
          <SearchWordFilter
            onRemove={deleteSearchWord}
            searchWord={searchWord}
          />
        )}
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
            {districts.map(district => (
              <FilterButton
                key={district}
                onRemove={handleFilterRemove}
                text={getNeighorhoodName(district)}
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
