import { IconClose, IconMenu } from "hds-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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

  return (
    <div className={styles.mobileNavbar}>
      <Link
        aria-label={t("header.ariaLabelLogo")}
        onClick={onCloseMenu}
        to={"/"}
        className={styles.logoWrapper}
      >
        <div className={styles.logo} />
        <div className={styles.appName}>{t("appName")}</div>
      </Link>
      <div className={styles.buttonWrapper}>
        {isMenuOpen ? (
          <>
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
            <IconMenu />
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
