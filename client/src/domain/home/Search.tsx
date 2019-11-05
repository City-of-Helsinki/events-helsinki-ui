import React, { FunctionComponent } from "react";

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
import SearchAutosuggest from "../../common/components/search/SearchAutosuggest";
import { formatMessage } from "../../common/translation/utils";
import { Category } from "../../common/types";
import { CATEGORIES } from "../../constants";
import styles from "./search.module.scss";

const SearchContainer: FunctionComponent = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const handleCategoryClick = (newCategory: Category) => {
    if (
      categories.findIndex(category => category.value === newCategory.value) ===
      -1
    ) {
      setCategories([...categories, newCategory]);
    }
  };

  const handleRemoveCategory = (removedCategory: Category) => {
    setCategories(
      categories.filter(category => category.value !== removedCategory.value)
    );
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <div>
          <h3>{formatMessage("home.search.title")}</h3>
        </div>
        <div>
          <label>{formatMessage("home.search.labelSearchField")}</label>
          <SearchAutosuggest
            categories={categories}
            onRemoveCategory={handleRemoveCategory}
            placeholder="Aloita kirjoittamalla tähän, esim. teatteri"
          />
        </div>
        <div>
          <label>{formatMessage("home.search.labelDateRange")}</label>
        </div>
        <div>
          <Button
            buttonStyle={ButtonStyles.MEDIUM_PRIMARY}
            icon={<SearchIcon />}
            isBlock={true}
          >
            {formatMessage("home.search.buttonSearch")}
          </Button>
        </div>
      </div>
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
    </>
  );
};

export default SearchContainer;
