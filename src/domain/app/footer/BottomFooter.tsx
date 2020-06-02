import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useMobileMenuContext } from "../../../common/components/mobileMenu/MobileMenu";
import useLocale from "../../../hooks/useLocale";
import { ROUTES } from "../constants";
import Container from "../layout/Container";
import styles from "./bottomFooter.module.scss";

const BottomFooter: React.FC = () => {
  const { isMobileMenuOpen } = useMobileMenuContext();
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <div
      aria-hidden={isMobileMenuOpen}
      className={classNames(styles.bottomFooter, {
        [styles.mobileMenuOpen]: isMobileMenuOpen
      })}
    >
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.linkContainer}>
            <Link to={`/${locale}${ROUTES.ABOUT}`}>
              {t("footer.linkAbout")}
            </Link>
            <Link to={`/${locale}${ROUTES.FEEDBACK}`}>
              {t("footer.linkFeedback")}
            </Link>
          </div>
          <div className={styles.logoWrapper}>
            <div className={styles.helsinkiLogo}></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BottomFooter;
