import React from "react";
import { useTranslation } from "react-i18next";

import { EVENT_STATUS } from "../../../constants";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import { EventInList } from "../types";
import styles from "./eventName.module.scss";

interface Props {
  event: EventInList;
}

const EventName: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const isCancelled = event.eventStatus === EVENT_STATUS.EVENT_CANCELLED;

  return (
    <>
      {isCancelled && (
        <span className={styles.eventCancelled}>
          {t("event.eventCancelled")}
          {": "}
        </span>
      )}
      {getLocalisedString(event.name, locale)}
    </>
  );
};

export default EventName;
