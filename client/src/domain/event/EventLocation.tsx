import React from "react";
import { useTranslation } from "react-i18next";

import Map from "../../common/components/map/Map";
import { EventDetailsQuery } from "../../generated/graphql";
import AngleRightIcon from "../../icons/AngleRightIcon";
import ExternalLinkIcon from "../../icons/ExternalLinkIcon";
import LocationIcon from "../../icons/LocationIcon";
import getLocale from "../../util/getLocale";
import getLocalisedString from "../../util/getLocalisedString";
import styles from "./eventLocation.module.scss";
import {
  getEventDistrict,
  getGoogleDirectionsLink,
  getGoogleLink,
  getHslDirectionsLink
} from "./EventUtils";

interface Props {
  eventData: EventDetailsQuery;
}

const EventLocation: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();
  const locale = getLocale();

  const getLocationStr = () => {
    const location = eventData.eventDetails.location;
    const addressLocality = getLocalisedString(
      (location && location.addressLocality) || {},
      locale
    );
    const district = getEventDistrict(eventData, locale);
    const streetAddress = getLocalisedString(
      (location && location.streetAddress) || {},
      locale
    );

    return [streetAddress, district, addressLocality].filter(e => e).join(", ");
  };

  const coordinates =
    eventData.eventDetails.location &&
    eventData.eventDetails.location.position
      ? eventData.eventDetails.location.position.coordinates
      : null;
  const name = eventData.eventDetails.name;

  return (
    <div className={styles.eventLocationContainer}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <LocationIcon />
          <h3>{t("event.location.title")}</h3>
        </div>
        <a
          className={styles.mapLink}
          href={getGoogleLink(eventData, locale)}
          target="__blank"
        >
          {t("event.location.openMap")}
          <ExternalLinkIcon />
        </a>
      </div>

      <Map coordinates={coordinates} zoom={16} />
      <div className={styles.eventName}>{getLocalisedString(name, locale)}</div>
      <div className={styles.location}>{getLocationStr()}</div>
      <a
        className={styles.directionsLink}
        href={getGoogleDirectionsLink(eventData, locale)}
        target="__blank"
      >
        {t("event.location.directionsGoogle")}
        <AngleRightIcon />
      </a>
      <a
        className={styles.directionsLink}
        href={getHslDirectionsLink(eventData, locale)}
        target="__blank"
      >
        {t("event.location.directionsHSL")}
        <AngleRightIcon />
      </a>
    </div>
  );
};

export default EventLocation;
