import { IconSearch } from "hds-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import IconLink from "../../../../common/components/link/IconLink";
import useLocale from "../../../../hooks/useLocale";
import IconStar from "../../../../icons/IconStar";
import LanguageDropdown from "./languageDropdown/LanguageDropdown";
import styles from "./navbar.module.scss";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();

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
      <LanguageDropdown />
    </div>
  );
};

export default Navbar;
