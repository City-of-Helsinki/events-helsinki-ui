import { IconSearch } from "hds-react";
import get from "lodash/get";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import Button from "../../common/components/button/Button";
import DateSelector from "../../common/components/dateSelector/DateSelector";
import Dropdown from "../../common/components/dropdown/Dropdown";
import SearchAutosuggest from "../../common/components/search/SearchAutosuggest";
import { AutosuggestMenuItem } from "../../common/types";
import { CATEGORIES, DISTRICTS } from "../../constants";
import IconRead from "../../icons/IconRead";
import getLocale from "../../util/getLocale";
import getUrlParamAsArray from "../../util/getUrlParamAsString";
import { getSearchQuery } from "../../util/searchUtils";
import { translateValue } from "../../util/translateUtils";
import Container from "../app/layout/Container";
import styles from "./search.module.scss";

const Search: FunctionComponent = () => {
  const { search } = useLocation();
  const searchParams = React.useMemo(() => new URLSearchParams(search), [
    search
  ]);
  const { t } = useTranslation();
  const locale = getLocale();
  const [searchValue, setSearchValue] = React.useState("");
  const [dateTypes, setDateTypes] = React.useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [districts, setDistricts] = React.useState<string[]>([]);
  const [places, setPlaces] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const { push } = useHistory();

  const districtOptions = React.useMemo(
    () =>
      Object.keys(DISTRICTS)
        .map(key => {
          return {
            text: translateValue("commons.districts.", key, t),
            value: get(DISTRICTS, key)
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
      isCustomDate,
      keywords,
      places,
      publisher: null,
      search: searchValue,
      startDate
    });

    push({ pathname: `/${locale}/events`, search });
  }, [
    dateTypes,
    districts,
    endDate,
    isCustomDate,
    keywords,
    locale,
    places,
    push,
    searchValue,
    selectedCategories,
    startDate
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

    if (searchVal) {
      setSearchValue(searchVal);
    }

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
  }, [searchParams]);

  const handleMenuItemClick = async (item: AutosuggestMenuItem) => {
    let search = "";
    switch (item.type) {
      case "district":
        const newDistricts = getUrlParamAsArray(searchParams, "districts");
        if (!newDistricts.includes(item.value)) {
          newDistricts.push(item.value);
        }

        setDistricts(newDistricts);
        setSearchValue("");
        search = getSearchQuery({
          categories: selectedCategories,
          dateTypes,
          districts: newDistricts,
          endDate,
          isCustomDate,
          keywords,
          places,
          publisher: null,
          search: "",
          startDate
        });
        push({ pathname: `/${locale}/events`, search });
        break;
      case "keyword":
      case "yso":
        const newKeywords = getUrlParamAsArray(searchParams, "keywords");
        if (!newKeywords.includes(item.value)) {
          newKeywords.push(item.value);
        }

        setKeywords(newKeywords);
        setSearchValue("");
        search = getSearchQuery({
          categories: selectedCategories,
          dateTypes,
          districts,
          endDate,
          isCustomDate,
          keywords: newKeywords,
          places,
          publisher: null,
          search: "",
          startDate
        });
        push({ pathname: `/${locale}/events`, search });
        break;
      case "place":
        const newPlaces = getUrlParamAsArray(searchParams, "places");
        if (!newPlaces.includes(item.value)) {
          newPlaces.push(item.value);
        }

        setPlaces(newPlaces);
        setSearchValue("");
        search = getSearchQuery({
          categories: selectedCategories,
          dateTypes,
          districts,
          endDate,
          isCustomDate,
          keywords,
          places: newPlaces,
          publisher: null,
          search: "",
          startDate
        });
        push({ pathname: `/${locale}/events`, search });
    }
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <Container>
          <div className={styles.firstRow}>
            <label>{t("eventSearch.search.labelSearchField")}</label>
            <SearchAutosuggest
              categories={[]}
              onChangeSearchValue={setSearchValue}
              onMenuItemClick={handleMenuItemClick}
              placeholder={t("eventSearch.search.placeholder")}
              searchValue={searchValue}
            />
          </div>
          <div className={styles.secondRow}>
            <div>
              <div className={styles.label}>
                {t("eventSearch.search.labelCategory")}
              </div>
              <Dropdown
                icon={<IconRead />}
                name="category"
                onChange={setSelectedCategories}
                options={categories}
                title={t("eventSearch.search.titleDropdownCategory")}
                value={selectedCategories}
              />
            </div>
            <div className={styles.dateSelectorWrapper}>
              <div className={styles.label}>
                {t("eventSearch.search.labelDateRange")}
              </div>
              <DateSelector
                dateTypes={dateTypes}
                endDate={endDate}
                isCustomDate={isCustomDate}
                onChangeDateTypes={handleChangeDateTypes}
                onChangeEndDate={setEndDate}
                onChangeStartDate={setStartDate}
                startDate={startDate}
                toggleIsCustomDate={toggleIsCustomDate}
              />
            </div>
            <div>
              <div className={styles.label}>
                {t("eventSearch.search.labelDistrict")}
              </div>
              <Dropdown
                icon={<IconRead />}
                name="district"
                onChange={setDistricts}
                options={districtOptions}
                title={t("eventSearch.search.titleDropdownDistrict")}
                value={districts}
              />
            </div>
            <div></div>
            <div className={styles.buttonWrapper}>
              <Button
                color="primary"
                fullWidth={true}
                iconLeft={<IconSearch />}
                onClick={moveToSearchPage}
                size="default"
              >
                {t("eventSearch.search.buttonSearch")}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Search;
