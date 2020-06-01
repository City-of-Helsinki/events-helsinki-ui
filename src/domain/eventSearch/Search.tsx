import classNames from "classnames";
import { Button, Checkbox, IconLocation, IconSearch } from "hds-react";
import get from "lodash/get";
import React, { FormEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import DateSelector from "../../common/components/dateSelector/DateSelector";
import MultiSelectDropdown from "../../common/components/multiSelectDropdown/MultiSelectDropdown";
import SearchAutosuggest from "../../common/components/search/SearchAutosuggest";
import SearchLabel from "../../common/components/search/searchLabel/SearchLabel";
import { AutosuggestMenuOption } from "../../common/types";
import { CATEGORIES, TARGET_GROUPS } from "../../constants";
import { useNeighborhoodListQuery } from "../../generated/graphql";
import useLocale from "../../hooks/useLocale";
import IconPerson from "../../icons/IconPerson";
import IconRead from "../../icons/IconRead";
import getLocalisedString from "../../util/getLocalisedString";
import getUrlParamAsArray from "../../util/getUrlParamAsArray";
import { getSearchQuery } from "../../util/searchUtils";
import { translateValue } from "../../util/translateUtils";
import Container from "../app/layout/Container";
import PlaceSelector from "../place/placeSelector/PlaceSelector";
import styles from "./search.module.scss";

const Search: FunctionComponent = () => {
  const { search } = useLocation();
  const searchParams = React.useMemo(() => new URLSearchParams(search), [
    search
  ]);
  const { t } = useTranslation();
  const locale = useLocale();
  const [searchValue, setSearchValue] = React.useState("");
  const [dateTypes, setDateTypes] = React.useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [districts, setDistricts] = React.useState<string[]>([]);
  const [places, setPlaces] = React.useState<string[]>([]);
  const [targets, setTargets] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);

  const publisher = searchParams.get("publisher");
  const isFree = searchParams.get("isFree") === "true" ? true : false;

  const { push } = useHistory();

  const keywordNot = getUrlParamAsArray(searchParams, "keywordNot");

  const { data: neighborhoodsData } = useNeighborhoodListQuery();

  const districtOptions = React.useMemo(
    () =>
      neighborhoodsData
        ? neighborhoodsData.neighborhoodList.data
            .map(neighborhood => ({
              text: getLocalisedString(neighborhood.name, locale),
              value: neighborhood.id
            }))
            .sort((a, b) => (a.text >= b.text ? 1 : -1))
        : [],
    [locale, neighborhoodsData]
  );

  const targetOptions = React.useMemo(
    () =>
      Object.keys(TARGET_GROUPS)
        .map(key => {
          return {
            text: translateValue("commons.targets.", key, t),
            value: get(TARGET_GROUPS, key)
          };
        })
        .sort((a, b) => (a.text >= b.text ? 1 : -1)),
    [t]
  );

  const categories = React.useMemo(
    () => [
      {
        text: t("home.category.movie"),
        value: CATEGORIES.MOVIE
      },
      {
        text: t("home.category.music"),
        value: CATEGORIES.MUSIC
      },
      {
        text: t("home.category.sport"),
        value: CATEGORIES.SPORT
      },
      {
        text: t("home.category.museum"),
        value: CATEGORIES.MUSEUM
      },
      {
        text: t("home.category.dance"),
        value: CATEGORIES.DANCE
      },
      {
        text: t("home.category.culture"),
        value: CATEGORIES.CULTURE
      },
      {
        text: t("home.category.nature"),
        value: CATEGORIES.NATURE
      },
      {
        text: t("home.category.influence"),
        value: CATEGORIES.INFLUENCE
      },
      {
        text: t("home.category.theatre"),
        value: CATEGORIES.THEATRE
      },
      {
        text: t("home.category.food"),
        value: CATEGORIES.FOOD
      },
      {
        text: t("home.category.misc"),
        value: CATEGORIES.MISC
      }
    ],
    [t]
  );

  const handleChangeDateTypes = (value: string[]) => {
    setDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const moveToSearchPage = React.useCallback(() => {
    const search = getSearchQuery({
      categories: selectedCategories,
      dateTypes,
      districts,
      endDate,
      isFree,
      keywordNot: keywordNot,
      keywords,
      places,
      publisher,
      search: searchValue,
      startDate,
      targets
    });

    push({ pathname: `/${locale}/events`, search });
  }, [
    dateTypes,
    districts,
    endDate,
    isFree,
    keywordNot,
    keywords,
    locale,
    places,
    publisher,
    push,
    searchValue,
    selectedCategories,
    startDate,
    targets
  ]);

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const searchVal = searchParams.get("search");
    const end = searchParams.get("endDate");
    const start = searchParams.get("startDate");
    const dTypes = getUrlParamAsArray(searchParams, "dateTypes");
    const categories = getUrlParamAsArray(searchParams, "categories");
    const districts = getUrlParamAsArray(searchParams, "districts");
    const keywords = getUrlParamAsArray(searchParams, "keywords");
    const places = getUrlParamAsArray(searchParams, "places");
    const targets = getUrlParamAsArray(searchParams, "targets");

    setSearchValue(searchVal || "");

    if (end) {
      setEndDate(new Date(end));
    } else {
      setEndDate(null);
    }

    if (start) {
      setStartDate(new Date(start));
    } else {
      setStartDate(null);
    }

    if (end || start) {
      setIsCustomDate(true);
    } else {
      setDateTypes(dTypes);
    }

    setSelectedCategories(categories);
    setDistricts(districts);
    setKeywords(keywords);
    setPlaces(places);
    setTargets(targets);
  }, [searchParams]);

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const type = option.type;
    const value = option.value;

    const newSearchValue = option.type === "search" ? option.text : "";

    // Get new keywords
    const newKeywords = getUrlParamAsArray(searchParams, "keywords");
    if (
      (type === "keyword" || type === "yso") &&
      !newKeywords.includes(value)
    ) {
      newKeywords.push(value);
    }

    const search = getSearchQuery({
      categories: selectedCategories,
      dateTypes,
      districts,
      endDate,
      isFree,
      keywordNot,
      keywords: newKeywords,
      places,
      publisher: searchParams.get("publisher"),
      search: newSearchValue,
      startDate,
      targets
    });
    switch (type) {
      case "keyword":
      case "yso":
        setKeywords(newKeywords);
        break;
    }
    setSearchValue(newSearchValue);
    push({ pathname: `/${locale}/events`, search });
  };

  const handleIsFreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchQuery({
      categories: selectedCategories,
      dateTypes,
      districts,
      endDate,
      isFree: e.target.checked,
      keywordNot,
      keywords,
      places,
      publisher,
      search: searchValue,
      startDate,
      targets
    });

    push({ pathname: `/${locale}/events`, search });
  };

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    moveToSearchPage();
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <Container>
          <form onSubmit={handleSubmit}>
            <div className={styles.searchWrapper}>
              <div className={styles.rowWrapper}>
                <div className={classNames(styles.row, styles.autoSuggestRow)}>
                  <div>
                    <SearchLabel color="black" htmlFor="search">
                      {t("eventSearch.search.labelSearchField")}
                    </SearchLabel>
                    <SearchAutosuggest
                      categories={[]}
                      name="search"
                      onChangeSearchValue={setSearchValue}
                      onOptionClick={handleMenuOptionClick}
                      placeholder={t("eventSearch.search.placeholder")}
                      searchValue={searchValue}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.rowWrapper}>
                <div className={styles.row}>
                  {/* TODO: Hide category filter temporarily. Show when needed */}
                  <div style={{ display: "none" }}>
                    <MultiSelectDropdown
                      checkboxName="categoryOptions"
                      icon={<IconRead />}
                      name="category"
                      onChange={setSelectedCategories}
                      options={categories}
                      title={t("eventSearch.search.titleDropdownCategory")}
                      value={selectedCategories}
                    />
                  </div>
                  <div className={styles.dateSelectorWrapper}>
                    <DateSelector
                      dateTypes={dateTypes}
                      endDate={endDate}
                      isCustomDate={isCustomDate}
                      name="date"
                      onChangeDateTypes={handleChangeDateTypes}
                      onChangeEndDate={setEndDate}
                      onChangeStartDate={setStartDate}
                      startDate={startDate}
                      toggleIsCustomDate={toggleIsCustomDate}
                    />
                  </div>
                  <div>
                    <MultiSelectDropdown
                      checkboxName="districtOptions"
                      icon={<IconLocation />}
                      name="district"
                      onChange={setDistricts}
                      options={districtOptions}
                      title={t("eventSearch.search.titleDropdownDistrict")}
                      value={districts}
                    />
                  </div>
                  <div>
                    <MultiSelectDropdown
                      checkboxName="targetOptions"
                      icon={<IconPerson />}
                      name="targets"
                      onChange={setTargets}
                      options={targetOptions}
                      title={t("eventSearch.search.titleDropdownTargetGroup")}
                      value={targets}
                    />
                  </div>
                  <div>
                    <PlaceSelector setPlaces={setPlaces} value={places} />
                  </div>
                </div>
                <div className={styles.buttonWrapper}>
                  <Button
                    fullWidth={true}
                    iconLeft={<IconSearch />}
                    onClick={moveToSearchPage}
                    variant="success"
                  >
                    {t("eventSearch.search.buttonSearch")}
                  </Button>
                </div>
              </div>
              <div className={styles.rowWrapper}>
                <div className={styles.row}>
                  <div></div>
                  <div>
                    <Checkbox
                      className={styles.checkbox}
                      checked={isFree}
                      id="isFree"
                      label={t("eventSearch.search.checkboxIsFree")}
                      onChange={handleIsFreeChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Search;
