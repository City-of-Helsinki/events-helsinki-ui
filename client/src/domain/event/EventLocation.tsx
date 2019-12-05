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

interface Props {
  eventData: EventDetailsQuery;
}

const EventLocation: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();
  const locale = getLocale();

  const getGoogleLink = () => {
    const location = eventData.linkedEventsEventDetails.location;
    const streetAddress = getLocalisedString(
      (location && location.streetAddress) || {},
      locale
    );
    const postalCode = (location && location.postalCode) || {};
    const addressLocality = getLocalisedString(
      (location && location.addressLocality) || {},
      locale
    );
    const coordinates =
      location && location.position
        ? // Get coordinates for Google in correct order
          [...location.position.coordinates].reverse()
        : [];

    return `https://www.google.com/maps/place/${streetAddress},+${postalCode}+${addressLocality}/@${coordinates.join(
      ","
    )}`.replace(/\s/g, "+");
  };

  const getGoogleDirectionsLink = () => {
    const location = eventData.linkedEventsEventDetails.location;
    const streetAddress = getLocalisedString(
      (location && location.streetAddress) || {},
      locale
    );
    const postalCode = (location && location.postalCode) || {};
    const addressLocality = getLocalisedString(
      (location && location.addressLocality) || {},
      locale
    );
    const coordinates =
      location && location.position
        ? // Get coordinates for Google in correct order
          [...location.position.coordinates].reverse()
        : [];

    return `https://www.google.com/maps/dir//${streetAddress},+${postalCode}+${addressLocality}/@${coordinates.join(
      ","
    )}`.replace(/\s/g, "+");
  };

  const getHslDirectionsLink = () => {
    const location = eventData.linkedEventsEventDetails.location;
    const streetAddress = getLocalisedString(
      (location && location.streetAddress) || {},
      locale
    );
    const addressLocality = getLocalisedString(
      (location && location.addressLocality) || {},
      locale
    );
    const coordinates =
      location && location.position
        ? // Get coordinates for HSL in correct order
          [...location.position.coordinates].reverse()
        : [];

    return `https://reittiopas.hsl.fi/%20/${encodeURIComponent(
      streetAddress
    )},%20${encodeURIComponent(addressLocality)}::${coordinates.join(
      ","
    )}?locale=${locale}`;
  };

  //reittiopas.hsl.fi//Malmin tori 3264, Ylä-Malmi, Helsinki::60.25192,25.00724/

  const getLocationStr = () => {
    const location = eventData.linkedEventsEventDetails.location;
    const addressLocality = getLocalisedString(
      (location && location.addressLocality) || {},
      locale
    );
    const district =
      location &&
      location.divisions.find(
        division => ["district", "neighborhood"].indexOf(division.type) !== -1
      );
    const districtStr =
      district && district.name
        ? getLocalisedString(district.name, locale)
        : null;
    const streetAddress = getLocalisedString(
      (location && location.streetAddress) || {},
      locale
    );

    return [streetAddress, districtStr, addressLocality]
      .filter(e => e)
      .join(", ");
  };

  const coordinates =
    eventData.linkedEventsEventDetails.location &&
    eventData.linkedEventsEventDetails.location.position
      ? eventData.linkedEventsEventDetails.location.position.coordinates
      : null;
  const name = eventData.linkedEventsEventDetails.name;
  return (
    <div className={styles.eventLocationContainer}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <LocationIcon />
          <h3>{t("event.location.title")}</h3>
        </div>
        <a className={styles.mapLink} href={getGoogleLink()} target="__blank">
          {t("event.location.openMap")}
          <ExternalLinkIcon />
        </a>
      </div>

      <Map coordinates={coordinates} zoom={16} />
      <div className={styles.eventName}>{getLocalisedString(name, locale)}</div>
      <div className={styles.location}>{getLocationStr()}</div>
      <a
        className={styles.directionsLink}
        href={getGoogleDirectionsLink()}
        target="__blank"
      >
        {t("event.location.directionsGoogle")}
        <AngleRightIcon />
      </a>
      <a
        className={styles.directionsLink}
        href={getHslDirectionsLink()}
        target="__blank"
      >
        {t("event.location.directionsHSL")}
        <AngleRightIcon />
      </a>
    </div>
  );
};

export default EventLocation;
