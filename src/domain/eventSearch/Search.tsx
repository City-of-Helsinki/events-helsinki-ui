import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import { ReactComponent as SearchIcon } from "../../assets/icons/svg/search.svg";
import Button from "../../common/components/button/Button";
import DateSelector from "../../common/components/dateSelector/DateSelector";
import Dropdown from "../../common/components/dropdown/Dropdown";
import Checkbox from "../../common/components/input/Checkbox";
import SearchAutosuggest from "../../common/components/search/SearchAutosuggest";
import { CATEGORIES } from "../../constants";
import IconRead from "../../icons/IconRead";
import getLocale from "../../util/getLocale";
import getUrlParamAsArray from "../../util/getUrlParamAsString";
import { getSearchQuery } from "../../util/searchUtils";
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
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const { push } = useHistory();

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

  const moveToSearchPage = () => {
    const search = getSearchQuery({
      categories: selectedCategories,
      dateTypes,
      endDate,
      isCustomDate,
      publisher: null,
      search: searchValue,
      startDate
    });

    push({ pathname: `/${locale}/events`, search });
  };

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const searchVal = searchParams.get("search");
    const end = searchParams.get("endDate");
    const start = searchParams.get("startDate");
    const dTypes = getUrlParamAsArray(searchParams, "dateTypes");
    const categories = getUrlParamAsArray(searchParams, "categories");

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
  }, [searchParams]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClearCategories = () => {
    setSelectedCategories([]);
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
                onClearButtonClick={handleClearCategories}
                title={t("eventSearch.search.titleDropdownCategory")}
              >
                <>
                  {categories.map(category => {
                    return (
                      <Checkbox
                        key={category.value}
                        checked={selectedCategories.includes(category.value)}
                        name="category"
                        onChange={handleCategoryChange}
                        value={category.value}
                      >
                        {category.text}
                      </Checkbox>
                    );
                  })}
                </>
              </Dropdown>
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
            <div></div>
            <div></div>
            <div className={styles.buttonWrapper}>
              <Button
                color="primary"
                fullWidth={true}
                iconLeft={<SearchIcon />}
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
