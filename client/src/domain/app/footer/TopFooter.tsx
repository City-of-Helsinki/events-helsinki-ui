import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import { ReactComponent as CultureIcon } from "../../../assets/icons/svg/culture.svg";
import { ReactComponent as DanceIcon } from "../../../assets/icons/svg/dance.svg";
import { ReactComponent as FoodIcon } from "../../../assets/icons/svg/food.svg";
import { ReactComponent as InfluenceIcon } from "../../../assets/icons/svg/influence.svg";
import { ReactComponent as MovieIcon } from "../../../assets/icons/svg/movie.svg";
import { ReactComponent as MuseumIcon } from "../../../assets/icons/svg/museum.svg";
import { ReactComponent as MusicIcon } from "../../../assets/icons/svg/music.svg";
import { ReactComponent as NatureIcon } from "../../../assets/icons/svg/nature.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icons/svg/search.svg";
import { ReactComponent as SmileIcon } from "../../../assets/icons/svg/smile.svg";
import { ReactComponent as SportIcon } from "../../../assets/icons/svg/sport.svg";
import { ReactComponent as TheatreIcon } from "../../../assets/icons/svg/theatre.svg";
import CategoryFilters from "../../../common/components/category/CategoryFilters";
import IconLink from "../../../common/components/link/IconLink";
import { Category } from "../../../common/types";
import { CATEGORIES } from "../../../constants";
import { getSearchQuery } from "../../../util/searchUtils";
import Container from "../layout/Container";
import styles from "./topFooter.module.scss";

const TopFooter: FunctionComponent = () => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleCategoryClick = (category: Category) => {
    const search = getSearchQuery({
      categories: [category],
      dateTypes: [],
      endDate: null,
      isCustomDate: false,
      search: "",
      startDate: null
    });

    push({ pathname: "search", search });
  };

  return (
    <footer className={styles.topFooterWrapper}>
      <Container>
        <div className={styles.companyInfoWrapper}>
          <div className={styles.logoWrapper}>
            <div className={styles.helsinkiLogo}></div>
            <h2 className={styles.appName}>{t("appName")}</h2>
          </div>
          <div className={styles.iconLinkWrapper}>
            <IconLink
              icon={<SearchIcon />}
              text={t("footer.searchEvents")}
              to="/search"
            />
            <IconLink
              icon={<SmileIcon />}
              text={t("footer.searchCollections")}
              to="/search"
            />
          </div>
        </div>
        <div className={styles.categoriesWrapper}>
          <h2 className={styles.categoriesTitle}>
            {t("footer.titleCategories")}
          </h2>

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
                icon: <InfluenceIcon />,
                text: t("home.category.influence"),
                value: CATEGORIES.INFLUENCE
              },
              {
                icon: <TheatreIcon />,
                text: t("home.category.theatre"),
                value: CATEGORIES.THEATRE
              },
              {
                icon: <FoodIcon />,
                text: t("home.category.food"),
                value: CATEGORIES.FOOD
              }
            ]}
            hasHorizontalPadding={true}
            onClickCategory={handleCategoryClick}
          />
        </div>
      </Container>
    </footer>
  );
};

export default TopFooter;
