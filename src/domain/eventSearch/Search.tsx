import { IconLocation, IconSearch } from "hds-react";
import get from "lodash/get";
import React, { FormEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import Button from "../../common/components/button/Button";
import DateSelector from "../../common/components/dateSelector/DateSelector";
import MultiSelectDropdown from "../../common/components/multiSelectDropdown/MultiSelectDropdown";
import SearchAutosuggest from "../../common/components/search/SearchAutosuggest";
import SearchLabel from "../../common/components/search/searchLabel/SearchLabel";
import { AutosuggestMenuOption } from "../../common/types";
import { CATEGORIES, DISTRICTS, TARGET_GROUPS } from "../../constants";
import useLocale from "../../hooks/useLocale";
import IconPerson from "../../icons/IconPerson";
import IconRead from "../../icons/IconRead";
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
      isCustomDate,
      keywords,
      places,
      publisher: null,
      search: searchValue,
      startDate,
      targets
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

    let search = "";
    switch (type) {
      case "district":
        const newDistricts = getUrlParamAsArray(searchParams, "districts");
        if (!newDistricts.includes(value)) {
          newDistricts.push(value);
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
          startDate,
          targets
        });
        push({ pathname: `/${locale}/events`, search });
        break;
      case "keyword":
      case "yso":
        const newKeywords = getUrlParamAsArray(searchParams, "keywords");
        if (!newKeywords.includes(value)) {
          newKeywords.push(value);
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
          startDate,
          targets
        });
        push({ pathname: `/${locale}/events`, search });
        break;
      case "place":
        const newPlaces = getUrlParamAsArray(searchParams, "places");
        if (!newPlaces.includes(value)) {
          newPlaces.push(value);
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
          startDate,
          targets
        });
        push({ pathname: `/${locale}/events`, search });
    }
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
              <div className={styles.fieldsWrapper}>
                <div className={styles.firstRow}>
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
                <div className={styles.secondRow}>
                  <div>
                    <SearchLabel color="black" htmlFor="category" srOnly={true}>
                      {t("eventSearch.search.labelCategory")}
                    </SearchLabel>
                    <MultiSelectDropdown
                      icon={<IconRead />}
                      name="category"
                      onChange={setSelectedCategories}
                      onSubmit={handleSubmit}
                      options={categories}
                      title={t("eventSearch.search.titleDropdownCategory")}
                      submitOnEnter={true}
                      value={selectedCategories}
                    />
                  </div>
                  <div className={styles.dateSelectorWrapper}>
                    <SearchLabel color="black" htmlFor="date" srOnly={true}>
                      {t("eventSearch.search.labelDateRange")}
                    </SearchLabel>
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
                    <SearchLabel color="black" htmlFor="district" srOnly={true}>
                      {t("eventSearch.search.labelDistrict")}
                    </SearchLabel>
                    <MultiSelectDropdown
                      icon={<IconLocation />}
                      name="district"
                      onChange={setDistricts}
                      onSubmit={handleSubmit}
                      options={districtOptions}
                      submitOnEnter={true}
                      title={t("eventSearch.search.titleDropdownDistrict")}
                      value={districts}
                    />
                  </div>
                  <div>
                    <SearchLabel color="black" htmlFor="targets" srOnly={true}>
                      {t("eventSearch.search.labelTargetGroup")}
                    </SearchLabel>
                    <MultiSelectDropdown
                      icon={<IconPerson />}
                      name="targets"
                      onChange={setTargets}
                      onSubmit={handleSubmit}
                      options={targetOptions}
                      submitOnEnter={true}
                      title={t("eventSearch.search.titleDropdownTargetGroup")}
                      value={targets}
                    />
                  </div>
                </div>
              </div>
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
          </form>
        </Container>
      </div>
    </>
  );
};

export default Search;
