import { Button } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import useLocale from "../../../hooks/useLocale";
import { ROUTES } from "../../app/constants";
import styles from "./eventClosedHero.module.scss";

const EventClosedHero: React.FC = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const locale = useLocale();

  const moveToHomePage = () => {
    push(`/${locale}${ROUTES.HOME}`);
  };

  return (
    <div className={styles.eventClosedHero}>
      <h1>{t("event.hero.titleEventClosed")}</h1>
      <p>{t("event.hero.textEventClosed")}</p>
      <Button onClick={moveToHomePage} variant="success">
        {t("event.hero.buttonToHomePage")}
      </Button>
    </div>
  );
};

export default EventClosedHero;
