import {
  IconBoots,
  IconDoubleLike,
  IconFemale,
  IconFill,
  IconFood,
  IconLanguage,
  IconLips,
  IconSearch,
  IconTree,
  IconVolume,
  IconWine
} from "hds-react";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import Button from "../../common/components/button/Button";
import CategoryFilters from "../../common/components/category/CategoryFilters";
import DateSelector from "../../common/components/dateSelector/DateSelector";
import SearchAutosuggest from "../../common/components/search/SearchAutosuggest";
import SupriseMeButton from "../../common/components/search/SupriseMeButton";
import { AutosuggestMenuOption, Category } from "../../common/types";
import { CATEGORIES } from "../../constants";
import useLocale from "../../hooks/useLocale";
import { getSearchQuery } from "../../util/searchUtils";
import styles from "./search.module.scss";

const Search: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [dateTypes, setDateTypes] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState("");
  const { push } = useHistory();

  const handleCategoryClick = (newCategory: Category) => {
    if (
      categories.findIndex(category => category.value === newCategory.value) ===
      -1
    ) {
      setCategories([...categories, newCategory]);
    }
  };

  const handleChangeDateTypes = (value: string[]) => {
    setDateTypes(value);
  };

  const handleRemoveCategory = (removedCategory: Category) => {
    setCategories(
      categories.filter(category => category.value !== removedCategory.value)
    );
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const moveToSearchPage = React.useCallback(() => {
    const search = getSearchQuery({
      categories: categories.map(category => category.value),
      dateTypes,
      districts: [],
      endDate,
      isCustomDate,
      keywords: [],
      places: [],
      publisher: null,
      search: searchValue,
      startDate,
      targets: []
    });

    push({ pathname: `/${locale}/events`, search });
  }, [
    categories,
    dateTypes,
    endDate,
    isCustomDate,
    locale,
    push,
    searchValue,
    startDate
  ]);

  const handleClickSupriseMe = () => {
    // TODO: Add suprise me feature
    alert("TODO: suprise me");
  };

  const handleMenuOptionClick = (option: AutosuggestMenuOption) => {
    const type = option.type;
    const value = option.value;

    const search = getSearchQuery({
      categories: categories.map(category => category.value),
      dateTypes,
      districts: type === "district" ? [value] : [],
      endDate,
      isCustomDate,
      keywords: type === "keyword" || type === "yso" ? [value] : [],
      places: type === "place" ? [value] : [],
      publisher: null,
      search: "",
      startDate,
      targets: []
    });

    push({ pathname: `/${locale}/events`, search });
    setSearchValue("");
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <SupriseMeButton onClick={handleClickSupriseMe} />
        <div className={styles.titleWrapper}>
          <h3>{t("home.search.title")}</h3>
        </div>
        <div className={styles.autosuggestWrapper}>
          <label>{t("home.search.labelSearchField")}</label>
          <SearchAutosuggest
            categories={categories}
            onChangeSearchValue={setSearchValue}
            onOptionClick={handleMenuOptionClick}
            onRemoveCategory={handleRemoveCategory}
            placeholder={t("home.search.placeholder")}
            searchValue={searchValue}
          />
        </div>
        <div className={styles.dateSelectorWrapper}>
          <label>{t("home.search.labelDateRange")}</label>
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
        <div className={styles.buttonWrapper}>
          <Button
            color="primary"
            fullWidth={true}
            iconLeft={<IconSearch />}
            onClick={moveToSearchPage}
            size="default"
          >
            {t("home.search.buttonSearch")}
          </Button>
        </div>
      </div>
      <div className={styles.categoriesWrapper}>
        <CategoryFilters
          categories={[
            {
              icon: <IconVolume />,
              text: t("home.category.movie"),
              value: CATEGORIES.MOVIE
            },
            {
              icon: <IconLips />,
              text: t("home.category.music"),
              value: CATEGORIES.MUSIC
            },
            {
              icon: <IconBoots />,
              text: t("home.category.sport"),
              value: CATEGORIES.SPORT
            },
            {
              icon: <IconLanguage />,
              text: t("home.category.museum"),
              value: CATEGORIES.MUSEUM
            },
            {
              icon: <IconFemale />,
              text: t("home.category.dance"),
              value: CATEGORIES.DANCE
            },
            {
              icon: <IconWine />,
              text: t("home.category.culture"),
              value: CATEGORIES.CULTURE
            },
            {
              icon: <IconTree />,
              text: t("home.category.nature"),
              value: CATEGORIES.NATURE
            },
            {
              icon: <IconFill />,
              text: t("home.category.influence"),
              value: CATEGORIES.INFLUENCE
            },
            {
              icon: <IconDoubleLike />,
              text: t("home.category.theatre"),
              value: CATEGORIES.THEATRE
            },
            {
              icon: <IconFood />,
              text: t("home.category.food"),
              value: CATEGORIES.FOOD
            }
          ]}
          onClickCategory={handleCategoryClick}
        />
      </div>
    </>
  );
};

export default Search;
