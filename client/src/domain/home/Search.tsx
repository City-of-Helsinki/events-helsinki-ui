import React, { FunctionComponent } from "react";
import { useHistory } from "react-router";

import { ReactComponent as CultureIcon } from "../../assets/icons/svg/culture.svg";
import { ReactComponent as DanceIcon } from "../../assets/icons/svg/dance.svg";
import { ReactComponent as FoodIcon } from "../../assets/icons/svg/food.svg";
import { ReactComponent as InfluenceIcon } from "../../assets/icons/svg/influence.svg";
import { ReactComponent as MovieIcon } from "../../assets/icons/svg/movie.svg";
import { ReactComponent as MuseumIcon } from "../../assets/icons/svg/museum.svg";
import { ReactComponent as MusicIcon } from "../../assets/icons/svg/music.svg";
import { ReactComponent as NatureIcon } from "../../assets/icons/svg/nature.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/svg/search.svg";
import { ReactComponent as SportIcon } from "../../assets/icons/svg/sport.svg";
import { ReactComponent as TheatreIcon } from "../../assets/icons/svg/theatre.svg";
import Button, { ButtonStyles } from "../../common/components/button/Button";
import CategoryFilters from "../../common/components/category/CategoryFilters";
import DateSelector from "../../common/components/dateSelector/DateSelector";
import SearchAutosuggest from "../../common/components/search/SearchAutosuggest";
import SupriseMeButton from "../../common/components/search/SupriseMeButton";
import { formatMessage } from "../../common/translation/TranslationUtils";
import { Category } from "../../common/types";
import { CATEGORIES } from "../../constants";
import { getSearchQuery } from "../../util/searchUtils";
import styles from "./search.module.scss";

const Search: FunctionComponent = () => {
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

  const moveToSearchPage = () => {
    const search = getSearchQuery({
      categories,
      dateTypes,
      endDate,
      isCustomDate,
      search: searchValue,
      startDate
    });

    push({ pathname: "search", search });
  };

  const handleClickSupriseMe = () => {
    // TODO: Add suprise me feature
    alert("suprise me");
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <SupriseMeButton onClick={handleClickSupriseMe} />
        <div className={styles.titleWrapper}>
          <h3>{formatMessage("home.search.title")}</h3>
        </div>
        <div className={styles.autosuggestWrapper}>
          <label>{formatMessage("home.search.labelSearchField")}</label>
          <SearchAutosuggest
            categories={categories}
            onChangeSearchValue={setSearchValue}
            onRemoveCategory={handleRemoveCategory}
            placeholder={formatMessage("home.search.placeholder")}
            searchValue={searchValue}
          />
        </div>
        <div className={styles.dateSelectorWrapper}>
          <label>{formatMessage("home.search.labelDateRange")}</label>
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
            buttonStyle={ButtonStyles.MEDIUM_PRIMARY}
            icon={<SearchIcon />}
            isBlock={true}
            onClick={moveToSearchPage}
          >
            {formatMessage("home.search.buttonSearch")}
          </Button>
        </div>
      </div>
      <div className={styles.categoriesWrapper}>
        <CategoryFilters
          categories={[
            {
              icon: <MovieIcon />,
              text: formatMessage("home.category.movie"),
              value: CATEGORIES.MOVIE
            },
            {
              icon: <MusicIcon />,
              text: formatMessage("home.category.music"),
              value: CATEGORIES.MUSIC
            },
            {
              icon: <SportIcon />,
              text: formatMessage("home.category.sport"),
              value: CATEGORIES.SPORT
            },
            {
              icon: <MuseumIcon />,
              text: formatMessage("home.category.museum"),
              value: CATEGORIES.MUSEUM
            },
            {
              icon: <DanceIcon />,
              text: formatMessage("home.category.dance"),
              value: CATEGORIES.DANCE
            },
            {
              icon: <CultureIcon />,
              text: formatMessage("home.category.culture"),
              value: CATEGORIES.CULTURE
            },
            {
              icon: <NatureIcon />,
              text: formatMessage("home.category.nature"),
              value: CATEGORIES.NATURE
            },
            {
              icon: <InfluenceIcon />,
              text: formatMessage("home.category.influence"),
              value: CATEGORIES.INFLUENCE
            },
            {
              icon: <TheatreIcon />,
              text: formatMessage("home.category.theatre"),
              value: CATEGORIES.THEATRE
            },
            {
              icon: <FoodIcon />,
              text: formatMessage("home.category.food"),
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
