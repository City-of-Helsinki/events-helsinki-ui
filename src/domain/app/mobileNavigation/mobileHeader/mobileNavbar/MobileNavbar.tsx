import { IconClose } from "hds-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { ReactComponent as MenuIcon } from "../../../../../assets/icons/svg/menu.svg";
import LanguageDropdown from "../../../header/navbar/languageDropdown/LanguageDropdown";
import styles from "./mobileNavbar.module.scss";

interface Props {
  isMenuOpen: boolean;
  onCloseMenu: () => void;
  onOpenMenu: () => void;
}

const MobileNavbar: React.FC<Props> = ({
  isMenuOpen,
  onCloseMenu,
  onOpenMenu
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className={styles.mobileNavbar}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo} onClick={() => history.push("/")}></div>
        <h1 className={styles.appName}>{t("appName")}</h1>
      </div>
      <div className={styles.buttonWrapper}>
        {isMenuOpen ? (
          <>
            <LanguageDropdown />
            <button
              className={styles.closeButton}
              onClick={onCloseMenu}
              aria-label={t("header.ariaButtonCloseMenu")}
            >
              <IconClose />
            </button>
          </>
        ) : (
          <button
            className={styles.menuButton}
            onClick={onOpenMenu}
            aria-label={t("header.ariaButtonOpenMenu")}
          >
            <MenuIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;