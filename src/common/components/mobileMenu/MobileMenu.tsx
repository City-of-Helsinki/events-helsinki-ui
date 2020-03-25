import classNames from "classnames";
import { IconSearch } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { updateLocaleParam } from "../../../common/route/RouteUtils";
import { getCurrentLanguage } from "../../../common/translation/TranslationUtils";
import { SUPPORT_LANGUAGES } from "../../../constants";
import useLocale from "../../../hooks/useLocale";
import IconStar from "../../../icons/IconStar";
import scrollToTop from "../../../util/scrollToTop";
import styles from "./mobileMenu.module.scss";

interface MobileMenuContext {
  closeMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
}

export const MobileMenuContext = React.createContext<MobileMenuContext>({
  closeMobileMenu: () => null,
  isMobileMenuOpen: false,
  openMobileMenu: () => null
});

export const MobileMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const closeMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const openMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  return (
    <MobileMenuContext.Provider
      value={{
        closeMobileMenu,
        isMobileMenuOpen,
        openMobileMenu
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenuContext = (): MobileMenuContext =>
  React.useContext(MobileMenuContext);

interface Props {
  isMenuOpen: boolean;
  onClose: () => void;
}

const MobileMenuModal: React.FC<Props> = ({ isMenuOpen, onClose }) => {
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
    onClose();
    scrollToTop();
  };

  return (
    <div
      aria-hidden={!isMenuOpen}
      className={classNames(styles.mobileMenu, {
        [styles.menuOpen]: isMenuOpen
      })}
      style={{ visibility: isMenuOpen ? undefined : "hidden" }}
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
            <Link lang="fi" onClick={onClose} to={getUrl(SUPPORT_LANGUAGES.FI)}>
              {t("header.languages.fi")}
            </Link>
          </li>
          <li
            className={classNames(styles.languageLink, {
              [styles.isSelected]: currentLanguage === SUPPORT_LANGUAGES.SV
            })}
          >
            <Link lang="sv" onClick={onClose} to={getUrl(SUPPORT_LANGUAGES.SV)}>
              {t("header.languages.sv")}
            </Link>
          </li>
          <li
            className={classNames(styles.languageLink, {
              [styles.isSelected]: currentLanguage === SUPPORT_LANGUAGES.EN
            })}
          >
            <Link lang="en" onClick={onClose} to={getUrl(SUPPORT_LANGUAGES.EN)}>
              {t("header.languages.en")}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenuModal;
