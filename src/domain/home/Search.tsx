import { IconFill, IconFood } from "hds-react";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import { ReactComponent as CultureIcon } from "../../assets/icons/svg/culture.svg";
import { ReactComponent as DanceIcon } from "../../assets/icons/svg/dance.svg";
import { ReactComponent as MovieIcon } from "../../assets/icons/svg/movie.svg";
import { ReactComponent as MuseumIcon } from "../../assets/icons/svg/museum.svg";
import { ReactComponent as MusicIcon } from "../../assets/icons/svg/music.svg";
import { ReactComponent as NatureIcon } from "../../assets/icons/svg/nature.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/svg/search.svg";
import { ReactComponent as SportIcon } from "../../assets/icons/svg/sport.svg";
import { ReactComponent as TheatreIcon } from "../../assets/icons/svg/theatre.svg";
import Button from "../../common/components/button/Button";
import CategoryFilters from "../../common/components/category/CategoryFilters";
import DateSelector from "../../common/components/dateSelector/DateSelector";
import SearchAutosuggest from "../../common/components/search/SearchAutosuggest";
import SupriseMeButton from "../../common/components/search/SupriseMeButton";
import { AutosuggestMenuItem, Category } from "../../common/types";
import { CATEGORIES } from "../../constants";
import getLocale from "../../util/getLocale";
import { getSearchQuery } from "../../util/searchUtils";
import styles from "./search.module.scss";

const Search: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = getLocale();
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
      startDate
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

  const handleMenuItemClick = (item: AutosuggestMenuItem) => {
    let search = "";
    switch (item.type) {
      case "district":
        search = getSearchQuery({
          categories: categories.map(category => category.value),
          dateTypes,
          districts: [item.value],
          endDate,
          isCustomDate,
          keywords: [],
          places: [],
          publisher: null,
          search: "",
          startDate
        });
        break;
      case "keyword":
      case "yso":
        search = getSearchQuery({
          categories: categories.map(category => category.value),
          dateTypes,
          districts: [],
          endDate,
          isCustomDate,
          keywords: [item.value],
          places: [],
          publisher: null,
          search: "",
          startDate
        });
        break;
      case "place":
        search = getSearchQuery({
          categories: categories.map(category => category.value),
          dateTypes,
          districts: [],
          endDate,
          isCustomDate,
          keywords: [],
          places: [item.value],
          publisher: null,
          search: "",
          startDate
        });
    }
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
            onMenuItemClick={handleMenuItemClick}
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
            iconLeft={<SearchIcon />}
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
              icon: <MovieIcon />,
              text: t("home.category.movie"),
              value: CATEGORIES.MOVIE
            },
            {
              icon: <MusicIcon />,
              text: t("home.category.music"),
              value: CATEGORIES.MUSIC
            },
            {
              icon: <SportIcon />,
              text: t("home.category.sport"),
              value: CATEGORIES.SPORT
            },
            {
              icon: <MuseumIcon />,
              text: t("home.category.museum"),
              value: CATEGORIES.MUSEUM
            },
            {
              icon: <DanceIcon />,
              text: t("home.category.dance"),
              value: CATEGORIES.DANCE
            },
            {
              icon: <CultureIcon />,
              text: t("home.category.culture"),
              value: CATEGORIES.CULTURE
            },
            {
              icon: <NatureIcon />,
              text: t("home.category.nature"),
              value: CATEGORIES.NATURE
            },
            {
              icon: <IconFill />,
              text: t("home.category.influence"),
              value: CATEGORIES.INFLUENCE
            },
            {
              icon: <TheatreIcon />,
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
