import { IconAngleRight, IconLocation } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";

import { EventDetailsQuery } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import IconExternalLink from "../../../icons/IconExternalLink";
import getLocalisedString from "../../../util/getLocalisedString";
import {
  getGoogleDirectionsLink,
  getHslDirectionsLink,
  getServiceMapUrl
} from "../EventUtils";
import styles from "./eventLocation.module.scss";
import LocationText from "./EventLocationText";

interface Props {
  eventData: EventDetailsQuery;
}

const EventLocation: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const name = eventData.eventDetails.name;

  return (
    <div className={styles.eventLocationContainer}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <IconLocation />
          <h2>{t("event.location.title")}</h2>
        </div>
        <a
          className={styles.mapLink}
          href={getServiceMapUrl(eventData, locale, false)}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t("event.location.openMap")}
          <IconExternalLink />
        </a>
      </div>

      <iframe
        title={t("event.location.mapTitle")}
        className={styles.mapContainer}
        src={getServiceMapUrl(eventData, locale, true)}
      ></iframe>

      <div className={styles.eventName}>{getLocalisedString(name, locale)}</div>
      <div className={styles.location}>
        <LocationText
          event={eventData.eventDetails}
          showDistrict={true}
          showLocationName={false}
        />
      </div>
      <a
        className={styles.directionsLink}
        href={getGoogleDirectionsLink(eventData, locale)}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t("event.location.directionsGoogle")}
        <IconAngleRight />
      </a>
      <a
        className={styles.directionsLink}
        href={getHslDirectionsLink(eventData, locale)}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t("event.location.directionsHSL")}
        <IconAngleRight />
      </a>
    </div>
  );
};

export default EventLocation;
