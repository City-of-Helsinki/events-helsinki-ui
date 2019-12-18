import React from "react";
import { useTranslation } from "react-i18next";

import Button from "../../common/components/button/Button";
import styles from "./eventClosedHero.module.scss";

const EventClosedHero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.eventClosedHero}>
      <div className={styles.text}>{t("event.hero.textEventClosed")}</div>
      <Button color="primary" size="md">
        {t("event.hero.buttonToHomePage")}
      </Button>
    </div>
  );
};

export default EventClosedHero;
