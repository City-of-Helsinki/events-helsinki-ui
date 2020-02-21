import { IconSearch } from "hds-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useLocation } from "react-router-dom";

import LanguageDropdown from "../../../../common/components/languageDropdown/LanguageDropdown";
import IconLink from "../../../../common/components/link/IconLink";
import { updateLocaleParam } from "../../../../common/route/RouteUtils";
import { getCurrentLanguage } from "../../../../common/translation/TranslationUtils";
import { SUPPORT_LANGUAGES } from "../../../../constants";
import useLocale from "../../../../hooks/useLocale";
import IconStar from "../../../../icons/IconStar";
import { Language } from "../../../../types";
import styles from "./navbar.module.scss";

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const locale = useLocale();

  const languageOptions = Object.values(SUPPORT_LANGUAGES).map(language => {
    return {
      label: t(`header.languages.${language}`),
      value: language
    };
  });

  const handleChange = (newLanguage: Language) => {
    const currentLanguage = getCurrentLanguage(i18n);
    history.push({
      pathname: updateLocaleParam(
        location.pathname,
        currentLanguage,
        newLanguage
      ),
      search: location.search
    });
  };

  return (
    <div className={styles.navbarTop}>
      <Link
        aria-label={t("header.ariaLabelLogo")}
        to={"/"}
        className={styles.logoWrapper}
      >
        <div className={styles.logo} />
        <div className={styles.appName}>{t("appName")}</div>
      </Link>
      <div className={styles.linkWrapper}>
        <IconLink
          icon={<IconSearch />}
          text={t("header.searchEvents")}
          to={`/${locale}/events`}
        />
        <IconLink
          icon={<IconStar />}
          text={t("header.searchCollections")}
          to={`/${locale}/collections`}
        />
      </div>
      <LanguageDropdown
        languageOptions={languageOptions}
        onChange={handleChange}
        value={locale}
      />
    </div>
  );
};

export default Navbar;
