import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as FlagInformationIcon } from "../../../../assets/icons/svg/flag-information.svg";
import { ReactComponent as OneEyeSmileyIcon } from "../../../../assets/icons/svg/one-eye-smiley.svg";
import { ReactComponent as RankingStartsRibbonIcon } from "../../../../assets/icons/svg/ranking-stars-ribbon.svg";
import { ReactComponent as TagsSearchIcon } from "../../../../assets/icons/svg/tags-search.svg";
import styles from "./mobileNavigationMenu.module.scss";

interface Props {
  isMenuOpen: boolean;
  onMenuClose: () => void;
}

const NavbarMobile: React.FC<Props> = ({ isMenuOpen, onMenuClose }) => {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(styles.mobileNavigationMenu, {
        [styles.menuOpen]: isMenuOpen
      })}
    >
      <div
        className={classNames(styles.menuItem, styles.searchCategories)}
        onClick={onMenuClose}
      >
        <div className={styles.text}>{t("menu.searchCategories")}</div>
        <div className={styles.iconWrapper}>
          <TagsSearchIcon />
        </div>
      </div>
      <div
        className={classNames(styles.menuItem, styles.searchEvents)}
        onClick={onMenuClose}
      >
        <div className={styles.text}>{t("menu.searchEvents")}</div>
        <div className={styles.iconWrapper}>
          <OneEyeSmileyIcon />
        </div>
      </div>
      <div
        className={classNames(styles.menuItem, styles.mostPopular)}
        onClick={onMenuClose}
      >
        <div className={styles.text}>{t("menu.mostPopular")}</div>
        <div className={styles.iconWrapper}>
          <RankingStartsRibbonIcon />
        </div>
      </div>
      <div
        className={classNames(styles.menuItem, styles.aboutService)}
        onClick={onMenuClose}
      >
        <div className={styles.text}>{t("menu.aboutService")}</div>
        <div className={styles.iconWrapper}>
          <FlagInformationIcon />
        </div>
      </div>
      <div className={styles.login} onClick={onMenuClose}>
        <div className={styles.squareExtension}></div>
      </div>
    </div>
  );
};

export default NavbarMobile;
