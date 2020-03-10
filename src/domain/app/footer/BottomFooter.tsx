import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Container from "../layout/Container";
import styles from "./bottomFooter.module.scss";

const BottomFooter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.bottomFooter}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.linkContainer}>
            <Link to="about">{t("footer.linkAbout")}</Link>
            <Link to="feedback">{t("footer.linkFeedback")}</Link>
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
