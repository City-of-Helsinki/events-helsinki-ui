import { IconAngleRight, IconSearch, IconTree } from "hds-react";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import Button from "../../common/components/button/Button";
import CategoryFilter from "../../common/components/category/CategoryFilter";
import DateSelector from "../../common/components/dateSelector/DateSelector";
import SearchAutosuggest from "../../common/components/search/SearchAutosuggest";
import SearchLabel from "../../common/components/search/searchLabel/SearchLabel";
import { AutosuggestMenuOption, Category } from "../../common/types";
import { CATEGORIES } from "../../constants";
import useLocale from "../../hooks/useLocale";
import IconCultureAndArts from "../../icons/IconCultureAndArts";
import IconDance from "../../icons/IconDance";
import IconFood from "../../icons/IconFood";
import IconMovies from "../../icons/IconMovies";
import IconMuseum from "../../icons/IconMuseum";
import IconMusic from "../../icons/IconMusic";
import IconParticipate from "../../icons/IconParticipate";
import IconSports from "../../icons/IconSports";
import IconTheatre from "../../icons/IconTheatre";
import { getSearchQuery } from "../../util/searchUtils";
import styles from "./search.module.scss";

const Search: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [dateTypes, setDateTypes] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState("");
  const { push } = useHistory();

  const handleCategoryClick = (category: Category) => {
    const search = getSearchQuery({
      categories: [category.value],
      dateTypes,
      districts: [],
      endDate,
      isCustomDate,
      keywords: [],
      places: [],
      publisher: null,
      search: "",
      startDate,
      targets: []
    });

    push({ pathname: `/${locale}/events`, search });
  };

  const categories = React.useMemo(() => {
    return [
      {
        icon: <IconMovies />,
        text: t("home.category.movie"),
        value: CATEGORIES.MOVIE
      },
      {
        icon: <IconMusic />,
        text: t("home.category.music"),
        value: CATEGORIES.MUSIC
      },
      {
        icon: <IconSports />,
        text: t("home.category.sport"),
        value: CATEGORIES.SPORT
      },
      {
        icon: <IconMuseum />,
        text: t("home.category.museum"),
        value: CATEGORIES.MUSEUM
      },
      {
        icon: <IconDance />,
        text: t("home.category.dance"),
        value: CATEGORIES.DANCE
      },
      {
        icon: <IconCultureAndArts />,
        text: t("home.category.culture"),
        value: CATEGORIES.CULTURE
      },
      {
        icon: <IconTree />,
        text: t("home.category.nature"),
        value: CATEGORIES.NATURE
      },
      {
        icon: <IconParticipate />,
        text: t("home.category.influence"),
        value: CATEGORIES.INFLUENCE
      },
      {
        icon: <IconTheatre />,
        text: t("home.category.theatre"),
        value: CATEGORIES.THEATRE
      },
      {
        className: styles.categoryFood,
        icon: <IconFood />,
        text: t("home.category.food"),
        value: CATEGORIES.FOOD
      }
    ];
  }, [t]);

  const handleChangeDateTypes = (value: string[]) => {
    setDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const moveToSearchPage = React.useCallback(() => {
    const search = getSearchQuery({
      categories: [],
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
  }, [dateTypes, endDate, isCustomDate, locale, push, searchValue, startDate]);

  const handleMenuOptionClick = (option: AutosuggestMenuOption) => {
    const type = option.type;
    const value = option.value;
    const searchValue = option.text;

    const search = getSearchQuery({
      categories: [],
      dateTypes,
      districts: type === "district" ? [value] : [],
      endDate,
      isCustomDate,
      keywords: type === "keyword" || type === "yso" ? [value] : [],
      places: type === "place" ? [value] : [],
      publisher: null,
      search: searchValue,
      startDate,
      targets: []
    });

    push({ pathname: `/${locale}/events`, search });
  };

  return (
    <>
      <div className={styles.searchContainer}>
        {/* Hide Suprise me button on MVP version */}
        {/* <SupriseMeButton onClick={handleClickSupriseMe} /> */}
        <div className={styles.searchRow}>
          <div className={styles.titleWrapper}>
            <h3>{t("home.search.title")}</h3>
          </div>
          <div className={styles.autosuggestWrapper}>
            <SearchLabel htmlFor={"search"}>
              {t("home.search.labelSearchField")}
            </SearchLabel>
            <SearchAutosuggest
              categories={[]}
              name="search"
              onChangeSearchValue={setSearchValue}
              onOptionClick={handleMenuOptionClick}
              placeholder={t("home.search.placeholder")}
              searchValue={searchValue}
            />
          </div>
          <div className={styles.dateAndButtonWrapper}>
            <div className={styles.dateSelectorWrapper}>
              <SearchLabel color="black" htmlFor="date" srOnly={true}>
                {t("home.search.labelDateRange")}
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
        </div>
        <div className={styles.linkRow}>
          <Link to={`/${locale}/events`}>
            {t("home.search.linkAdvancedSearch")}
            <IconAngleRight />
          </Link>
        </div>
      </div>
      <div className={styles.categoriesWrapper}>
        {categories.map(category => {
          return (
            <CategoryFilter
              className={category.className}
              key={category.value}
              icon={category.icon}
              onClick={handleCategoryClick}
              text={category.text}
              value={category.value}
            />
          );
        })}
      </div>
    </>
  );
};

export default Search;
