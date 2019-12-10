import React from "react";
import { useTranslation } from "react-i18next";

import {
  EventDetails,
  Image,
  LocalizedObject,
  Maybe
} from "../../generated/graphql";
import getDateRangeStr from "../../util/getDateRangeStr";
import getLocale from "../../util/getLocale";
import getLocalisedString from "../../util/getLocalisedString";
import getTimeRangeStr from "../../util/getTimeRangeStr";
import styles from "./eventCard.module.scss";

type Location = {
  addressLocality: Maybe<Pick<LocalizedObject, "fi" | "sv" | "en">>;
  name: Maybe<Pick<LocalizedObject, "fi" | "en" | "sv">>;
  streetAddress: Maybe<Pick<LocalizedObject, "fi" | "sv" | "en">>;
};

type Event = Pick<EventDetails, "id" | "startTime" | "endTime"> & {
  images: Array<Pick<Image, "id" | "name" | "url">>;
  location: Maybe<Location>;
  name: Pick<LocalizedObject, "fi" | "en" | "sv">;
};

interface Props {
  event: Event;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = getLocale();

  const getLocationStr = () => {
    const location = event.location;
    const addressLocality = getLocalisedString(
      (location && location.addressLocality) || {},
      locale
    );
    const locationName = getLocalisedString(
      (location && location.name) || {},
      locale
    );
    const streetAddress = getLocalisedString(
      (location && location.streetAddress) || {},
      locale
    );

    return [locationName, streetAddress, addressLocality]
      .filter(e => e)
      .join(", ");
  };

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
          <div className={styles.eventLocation}>{getLocationStr()}</div>
        </div>
        <div className={styles.buttonWrapper}>BUTTON</div>
      </div>
    </div>
  );
};

export default EventCard;
