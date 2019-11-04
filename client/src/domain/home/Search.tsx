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
import { formatMessage } from "../../common/translation/utils";
import { CATEGORIES } from "../../constants";
import styles from "./search.module.scss";

const SearchContainer: FunctionComponent = () => {
  const handleCategoryClick = (categoryKey: string) => {
    // TODO: Handle category click
    // eslint-disable-next-line no-console
    console.log(categoryKey);
  };
  return (
    <>
      <div className={styles.searchContainer}>
        <div>
          <h3>{formatMessage("home.search.title")}</h3>
        </div>
        <div>
          <label>{formatMessage("home.search.labelSearchField")}</label>
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
            onClick: handleCategoryClick,
            text: formatMessage("home.category.movie"),
            value: CATEGORIES.MOVIE
          },
          {
            icon: <MusicIcon />,
            onClick: handleCategoryClick,
            text: formatMessage("home.category.music"),
            value: CATEGORIES.MUSIC
          },
          {
            icon: <SportIcon />,
            onClick: handleCategoryClick,
            text: formatMessage("home.category.sport"),
            value: CATEGORIES.SPORT
          },
          {
            icon: <MuseumIcon />,
            onClick: handleCategoryClick,
            text: formatMessage("home.category.museum"),
            value: CATEGORIES.MUSEUM
          },
          {
            icon: <DanceIcon />,
            onClick: handleCategoryClick,
            text: formatMessage("home.category.dance"),
            value: CATEGORIES.DANCE
          },
          {
            icon: <CultureIcon />,
            onClick: handleCategoryClick,
            text: formatMessage("home.category.culture"),
            value: CATEGORIES.CULTURE
          },
          {
            icon: <NatureIcon />,
            onClick: handleCategoryClick,
            text: formatMessage("home.category.nature"),
            value: CATEGORIES.NATURE
          },
          {
            icon: <InfluenceIcon />,
            onClick: handleCategoryClick,
            text: formatMessage("home.category.influence"),
            value: CATEGORIES.INFLUENCE
          },
          {
            icon: <TheatreIcon />,
            onClick: handleCategoryClick,
            text: formatMessage("home.category.theatre"),
            value: CATEGORIES.THEATRE
          },
          {
            icon: <FoodIcon />,
            onClick: handleCategoryClick,
            text: formatMessage("home.category.food"),
            value: CATEGORIES.FOOD
          }
        ]}
      />
    </>
  );
};

export default SearchContainer;
