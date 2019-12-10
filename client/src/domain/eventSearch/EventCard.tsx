import React from "react";
import { useTranslation } from "react-i18next";

import getDateRangeStr from "../../util/getDateRangeStr";
import getLocale from "../../util/getLocale";
import getLocalisedString from "../../util/getLocalisedString";
import getTimeRangeStr from "../../util/getTimeRangeStr";
import LocationText from "../event/EventLocationText";
import { EventInList } from "../event/types";
import styles from "./eventCard.module.scss";

interface Props {
  event: EventInList;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = getLocale();

  const image = event.images.length ? event.images[0] : null;
  const name = event.name;
  const startTime = event.startTime;
  const endTime = event.endTime;

  return (
    <div className={styles.eventCard}>
      <div
        className={styles.imageWrapper}
        style={{ backgroundImage: image ? `url(${image.url})` : undefined }}
      ></div>
      <div className={styles.infoWrapper}>
        <div className={styles.categoryWrapper}>CATEGORY</div>
        <div className={styles.textWrapper}>
          <div className={styles.eventDateAndTime}>
            {!!startTime &&
              t("eventSearch.event.dateAndTime", {
                date: getDateRangeStr(startTime, endTime, locale),
                time: getTimeRangeStr(startTime, endTime, locale)
              })}
          </div>
          <div className={styles.eventName}>
            {getLocalisedString(name, locale)}
          </div>
          <div className={styles.eventLocation}>
            <LocationText
              event={event}
              showDistrict={false}
              showLocationName={true}
            />
          </div>
        </div>
        <div className={styles.buttonWrapper}>BUTTON</div>
      </div>
    </div>
  );
};

export default EventCard;
