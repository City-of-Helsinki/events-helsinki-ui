import classNames from "classnames";
import capitalize from "lodash/capitalize";
import React from "react";
import { useTranslation } from "react-i18next";

import Button from "../../common/components/button/Button";
import { EventDetailsQuery } from "../../generated/graphql";
import AngleRightIcon from "../../icons/AngleRightIcon";
import CalendarIcon from "../../icons/CalendarIcon";
import DirectionsIcon from "../../icons/DirectionsIcon";
import InfoIcon from "../../icons/InfoIcon";
import LanguageIcon from "../../icons/LanguageIcon";
import LocationIcon from "../../icons/LocationIcon";
import TicketIcon from "../../icons/TicketIcon";
import { formatDate } from "../../util/dateUtils";
import getDateRangeStr from "../../util/getDateRangeStr";
import getLocale from "../../util/getLocale";
import getLocalisedString from "../../util/getLocalisedString";
import getTimeRangeStr from "../../util/getTimeRangeStr";
import { translateValue } from "../../util/translateUtils";
import styles from "./eventInfo.module.scss";
import {
  getEventDistrict,
  getEventPrice,
  getGoogleDirectionsLink,
  getGoogleLink,
  getHslDirectionsLink
} from "./EventUtils";

interface Props {
  eventData: EventDetailsQuery;
}

const EventInfo: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();
  const locale = getLocale();

  const offerInfoUrl = React.useMemo(() => {
    const offer = eventData.eventDetails.offers.find(item =>
      getLocalisedString(item.infoUrl || {}, locale)
    );

    return offer ? getLocalisedString(offer.infoUrl || {}, locale) : "";
  }, [eventData.eventDetails.offers, locale]);

  const startTime = eventData.eventDetails.startTime;
  const endTime = eventData.eventDetails.endTime;
  const location = eventData.eventDetails.location;
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
  const district = getEventDistrict(eventData, locale);

  const languages = eventData.eventDetails.inLanguage
    .map(item => capitalize(getLocalisedString(item.name || {}, locale)))
    .filter(e => e);
  const email = location && location.email;
  const infoUrl = eventData.eventDetails.infoUrl
    ? getLocalisedString(eventData.eventDetails.infoUrl, locale)
    : null;
  const telephone =
    location && location.telephone
      ? getLocalisedString(location.telephone, locale)
      : null;
  const externalLinks = eventData.eventDetails.externalLinks;

  const moveToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

  return (
    <div className={styles.eventInfo}>
      {/* Date info */}
      <div className={styles.infoWithIcon}>
        <div className={styles.iconWrapper}>
          <CalendarIcon className={styles.icon} />
        </div>
        <div className={styles.iconTextWrapper}>
          <p>{t("event.info.labelDateAndTime")}</p>
          <div className={styles.mobileOnly}>
            {!!startTime && getDateRangeStr(startTime, endTime, locale)}
          </div>

          <div className={styles.desktopOnly}>
            {!!startTime && getDateRangeStr(startTime, endTime, locale, false)}
          </div>
          <div className={styles.desktopOnly}>
            {!!startTime &&
              capitalize(formatDate(new Date(startTime), "cccc", locale))}
          </div>
          <div>
            {!!startTime && getTimeRangeStr(startTime, endTime, locale)}
          </div>
        </div>
      </div>

      {/* Location info */}
      <div className={styles.infoWithIcon}>
        <div className={styles.iconWrapper}>
          <LocationIcon className={styles.icon} />
        </div>
        <div className={styles.iconTextWrapper}>
          <p>{t("event.info.labelLocation")}</p>
          <div className={styles.mobileOnly}>
            {[locationName, streetAddress, district, addressLocality]
              .filter(e => e)
              .join(", ")}
          </div>
          {locationName && (
            <div className={styles.desktopOnly}>{locationName}</div>
          )}
          {streetAddress && (
            <div className={styles.desktopOnly}>{streetAddress}</div>
          )}
          {district && <div className={styles.desktopOnly}>{district}</div>}
          {addressLocality && (
            <div className={styles.desktopOnly}>{addressLocality}</div>
          )}
          <a
            className={styles.link}
            href={getGoogleLink(eventData, locale)}
            target="__blank"
          >
            {t("event.info.openMap")}
            <AngleRightIcon />
          </a>
        </div>
      </div>

      {/* Languages */}
      {!!languages.length && (
        <div className={styles.infoWithIcon}>
          <div className={styles.iconWrapper}>
            <LanguageIcon className={styles.icon} />
          </div>
          <div className={styles.iconTextWrapper}>
            <p>{t("event.info.labelLanguages")}</p>
            <div>{languages.join(", ")}</div>
          </div>
        </div>
      )}

      {/* Other info */}
      {(!!email || !!externalLinks.length || !!infoUrl || !!telephone) && (
        <div className={styles.infoWithIcon}>
          <div className={styles.iconWrapper}>
            <InfoIcon className={styles.icon} />
          </div>
          <div className={styles.iconTextWrapper}>
            <p>{t("event.info.labelOtherInfo")}</p>
            {email && <div>{email}</div>}
            {telephone && <div>{telephone}</div>}
            {infoUrl && (
              <a className={styles.link} href={infoUrl || ""} target="__blank">
                {t("event.info.linkWebPage")}
                <AngleRightIcon />
              </a>
            )}

            {externalLinks.map((externalLink, index) => {
              return (
                <a
                  key={index}
                  className={styles.link}
                  href={externalLink.link || ""}
                  target="__blank"
                >
                  {translateValue("event.info.", externalLink.name || "", t)}
                  <AngleRightIcon />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Directions */}
      <div className={styles.infoWithIcon}>
        <div className={styles.iconWrapper}>
          <DirectionsIcon className={styles.icon} />
        </div>
        <div className={styles.iconTextWrapper}>
          <p>{t("event.info.labelDistricts")}</p>
          <a
            className={styles.link}
            href={getGoogleDirectionsLink(eventData, locale)}
            target="__blank"
          >
            {t("event.info.directionsGoogle")}
            <AngleRightIcon />
          </a>
          <a
            className={styles.link}
            href={getHslDirectionsLink(eventData, locale)}
            target="__blank"
          >
            {t("event.info.directionsHSL")}
            <AngleRightIcon />
          </a>
        </div>
      </div>

      {/* Price info */}
      <div className={classNames(styles.infoWithIcon, styles.mobileOnly)}>
        <div className={styles.iconWrapper}>
          <TicketIcon className={styles.icon} />
        </div>
        <div className={styles.iconTextWrapper}>
          <p>{t("event.info.labelPrice")}</p>
          {getEventPrice(eventData, locale, t("event.info.offers.isFree")) ||
            "-"}
        </div>
      </div>

      {offerInfoUrl && (
        <div className={classNames(styles.buyButtonWrapper, styles.mobileOnly)}>
          <Button
            color="primary"
            fullWidth={true}
            iconAtStart={<TicketIcon />}
            onClick={moveToBuyTicketsPage}
            size="sm"
          >
            {t("event.info.buttonBuyTickets")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventInfo;
