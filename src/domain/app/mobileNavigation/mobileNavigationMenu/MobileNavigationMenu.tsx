import classNames from "classnames";
import { IconSearch } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { updateLocaleParam } from "../../../../common/route/RouteUtils";
import { getCurrentLanguage } from "../../../../common/translation/TranslationUtils";
import { SUPPORT_LANGUAGES } from "../../../../constants";
import useLocale from "../../../../hooks/useLocale";
import IconStar from "../../../../icons/IconStar";
import scrollToTop from "../../../../util/scrollToTop";
import styles from "./mobileNavigationMenu.module.scss";

interface Props {
  isMenuOpen: boolean;
  onMenuClose: () => void;
}

const NavbarMobile: React.FC<Props> = ({ isMenuOpen, onMenuClose }) => {
  const { i18n, t } = useTranslation();
  const locale = useLocale();
  const location = useLocation();

  const currentLanguage = getCurrentLanguage(i18n);

  const getUrl = (newLanguage: string) => {
    return `${updateLocaleParam(
      location.pathname,
      currentLanguage,
      newLanguage
    )}${location.search}`;
  };

  const onLinkClick = () => {
    onMenuClose();
    scrollToTop();
  };

  return (
    <div
      className={classNames(styles.mobileNavigationMenu, {
        [styles.menuOpen]: isMenuOpen
      })}
    >
      <div className={styles.linkWrapper}>
        <ul>
          <li className={styles.link}>
            <Link onClick={onLinkClick} to={`/${locale}/events`}>
              <IconSearch />
              {t("header.searchEvents")}
            </Link>
          </li>
          <li className={styles.link}>
            <Link onClick={onLinkClick} to={`/${locale}/collections`}>
              <IconStar />
              {t("header.searchCollections")}
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.languageSelectWrapper}>
        <ul>
          <li
            className={classNames(styles.languageLink, {
              [styles.isSelected]: currentLanguage === SUPPORT_LANGUAGES.FI
            })}
          >
            <Link
              lang="fi"
              onClick={onMenuClose}
              to={getUrl(SUPPORT_LANGUAGES.FI)}
            >
              {t("header.languages.fi")}
            </Link>
          </li>
          <li
            className={classNames(styles.languageLink, {
              [styles.isSelected]: currentLanguage === SUPPORT_LANGUAGES.SV
            })}
          >
            <Link
              lang="sv"
              onClick={onMenuClose}
              to={getUrl(SUPPORT_LANGUAGES.SV)}
            >
              {t("header.languages.sv")}
            </Link>
          </li>
          <li
            className={classNames(styles.languageLink, {
              [styles.isSelected]: currentLanguage === SUPPORT_LANGUAGES.EN
            })}
          >
            <Link
              lang="en"
              onClick={onMenuClose}
              to={getUrl(SUPPORT_LANGUAGES.EN)}
            >
              {t("header.languages.en")}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarMobile;
