import * as React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import LanguageDropdown from "./languageDropdown/LanguageDropdown";
import styles from "./navbar.module.scss";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className={styles.navbarTop}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo} onClick={() => history.push("/")}></div>
        <h1 className={styles.appName}>{t("appName")}</h1>
      </div>
      <LanguageDropdown />
    </div>
  );
};

export default Navbar;
