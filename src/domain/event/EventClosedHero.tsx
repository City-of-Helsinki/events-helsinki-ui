import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import Button from "../../common/components/button/Button";
import useLocale from "../../hooks/useLocale";
import styles from "./eventClosedHero.module.scss";

const EventClosedHero: React.FC = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const locale = useLocale();

  const moveToHomePage = () => {
    push(`/${locale}/home`);
  };

  return (
    <div className={styles.eventClosedHero}>
      <div className={styles.text}>{t("event.hero.textEventClosed")}</div>
      <Button color="primary" onClick={moveToHomePage} size="default">
        {t("event.hero.buttonToHomePage")}
      </Button>
    </div>
  );
};

export default EventClosedHero;
