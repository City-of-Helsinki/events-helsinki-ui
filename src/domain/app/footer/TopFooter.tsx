import { IconSearch, IconTree } from "hds-react";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import CategoryFilter from "../../../common/components/category/CategoryFilter";
import IconLink from "../../../common/components/link/IconLink";
import { Category } from "../../../common/types";
import { CATEGORIES } from "../../../constants";
import useLocale from "../../../hooks/useLocale";
import IconCultureAndArts from "../../../icons/IconCultureAndArts";
import IconDance from "../../../icons/IconDance";
import IconFood from "../../../icons/IconFood";
import IconMovies from "../../../icons/IconMovies";
import IconMuseum from "../../../icons/IconMuseum";
import IconMusic from "../../../icons/IconMusic";
import IconParticipate from "../../../icons/IconParticipate";
import IconSports from "../../../icons/IconSports";
import IconStar from "../../../icons/IconStar";
import IconTheatre from "../../../icons/IconTheatre";
import scrollToTop from "../../../util/scrollToTop";
import { getSearchQuery } from "../../../util/searchUtils";
import Container from "../layout/Container";
import styles from "./topFooter.module.scss";

const TopFooter: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { push } = useHistory();

  const handleCategoryClick = (category: Category) => {
    const search = getSearchQuery({
      categories: [category.value],
      dateTypes: [],
      districts: [],
      endDate: null,
      keywords: [],
      places: [],
      publisher: null,
      search: "",
      startDate: null,
      targets: []
    });

    push({ pathname: `/${locale}/events`, search });
    scrollToTop();
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
        icon: <IconFood />,
        text: t("home.category.food"),
        value: CATEGORIES.FOOD
      }
    ];
  }, [t]);

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
              icon={<IconSearch />}
              onClick={scrollToTop}
              text={t("footer.searchEvents")}
              to={`/${locale}/events`}
            />
            <IconLink
              icon={<IconStar />}
              onClick={scrollToTop}
              text={t("footer.searchCollections")}
              to={`/${locale}/collections`}
            />
          </div>
        </div>
        <div className={styles.categoriesWrapper}>
          <h2 className={styles.categoriesTitle}>
            {t("footer.titleCategories")}
          </h2>

          <div className={styles.categoriesInnerWrapper}>
            {categories.map(category => {
              return (
                <CategoryFilter
                  key={category.value}
                  hasHorizontalPadding={true}
                  icon={category.icon}
                  onClick={handleCategoryClick}
                  text={category.text}
                  value={category.value}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default TopFooter;
