import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import useLocale from "../../../hooks/useLocale";
import Container from "../layout/Container";
import styles from "./bottomFooter.module.scss";

const BottomFooter: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <div className={styles.bottomFooter}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.linkContainer}>
            <Link to={`/${locale}/about`}>{t("footer.linkAbout")}</Link>
            <Link to={`/${locale}/feedback`}>{t("footer.linkFeedback")}</Link>
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
