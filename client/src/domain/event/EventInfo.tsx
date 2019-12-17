import classNames from "classnames";
import { saveAs } from "file-saver";
import { IconAngleRight, IconLocation } from "hds-react";
import { createEvent, EventAttributes } from "ics";
import capitalize from "lodash/capitalize";
import React from "react";
import { useTranslation } from "react-i18next";

import Button from "../../common/components/button/Button";
import { EventDetailsQuery } from "../../generated/graphql";
import CalendarIcon from "../../icons/CalendarIcon";
import DirectionsIcon from "../../icons/DirectionsIcon";
import InfoIcon from "../../icons/InfoIcon";
import LanguageIcon from "../../icons/LanguageIcon";
import TicketIcon from "../../icons/TicketIcon";
import { formatDate } from "../../util/dateUtils";
import getDateArray from "../../util/getDateArray";
import getDateRangeStr from "../../util/getDateRangeStr";
import getDomain from "../../util/getDomain";
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
import OrganizationInfo from "./OrganizationInfo";

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
  const eventLocation = eventData.eventDetails.location;
  const addressLocality = getLocalisedString(
    (eventLocation && eventLocation.addressLocality) || {},
    locale
  );
  const locationName = getLocalisedString(
    (eventLocation && eventLocation.name) || {},
    locale
  );
  const streetAddress = getLocalisedString(
    (eventLocation && eventLocation.streetAddress) || {},
    locale
  );
  const district = getEventDistrict(eventData.eventDetails, locale);

  const languages = eventData.eventDetails.inLanguage
    .map(item => capitalize(getLocalisedString(item.name || {}, locale)))
    .filter(e => e);
  const email = eventLocation && eventLocation.email;
  const infoUrl = eventData.eventDetails.infoUrl
    ? getLocalisedString(eventData.eventDetails.infoUrl, locale)
    : null;
  const telephone =
    eventLocation && eventLocation.telephone
      ? getLocalisedString(eventLocation.telephone, locale)
      : null;
  const externalLinks = eventData.eventDetails.externalLinks;

  const moveToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

  const downloadIcsFile = () => {
    if (eventData.eventDetails.startTime) {
      const domain = getDomain();
      const event: EventAttributes = {
        description: t("event.info.textCalendarLinkDescription", {
          description: getLocalisedString(
            eventData.eventDetails.shortDescription || {},
            locale
          ),
          link: `${domain}/${locale}/event/${eventData.eventDetails.id}`
        }),
        end: eventData.eventDetails.endTime
          ? getDateArray(eventData.eventDetails.endTime)
          : getDateArray(eventData.eventDetails.startTime),
        location: [locationName, streetAddress, district, addressLocality]
          .filter(e => e)
          .join(", "),
        productId: domain,
        start: getDateArray(eventData.eventDetails.startTime),
        startOutputType: "local",
        title: getLocalisedString(eventData.eventDetails.name || {}, locale)
      };
      createEvent(event, (error: Error | undefined, value: string) => {
        if (error) {
          console.error(error);
        } else {
          const blob = new Blob([value], { type: "text/calendar" });
          saveAs(
            blob,
            `event_${eventData.eventDetails.id.replace(/:/g, "")}.ics`
          );
        }
      });
    }
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
          {eventData.eventDetails.startTime && (
            <button className={styles.link} onClick={downloadIcsFile}>
              {t("event.info.buttonAddToCalendar")}
              <IconAngleRight />
            </button>
          )}
        </div>
      </div>

      {/* Location info */}
      <div className={styles.infoWithIcon}>
        <div className={styles.iconWrapper}>
          <IconLocation className={styles.icon} />
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
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("event.info.openMap")}
            <IconAngleRight />
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
              <a
                className={styles.link}
                href={infoUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {t("event.info.linkWebPage")}
                <IconAngleRight />
              </a>
            )}

            {externalLinks.map((externalLink, index) => {
              return (
                !!externalLink.link && (
                  <a
                    key={index}
                    className={styles.link}
                    href={externalLink.link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {translateValue("event.info.", externalLink.name || "", t)}
                    <IconAngleRight />
                  </a>
                )
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
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("event.info.directionsGoogle")}
            <IconAngleRight />
          </a>
          <a
            className={styles.link}
            href={getHslDirectionsLink(eventData, locale)}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("event.info.directionsHSL")}
            <IconAngleRight />
          </a>
        </div>
      </div>
      {/* Organization info */}
      <OrganizationInfo eventData={eventData} />

      {/* Price info */}
      <div className={classNames(styles.infoWithIcon, styles.mobileOnly)}>
        <div className={styles.iconWrapper}>
          <TicketIcon className={styles.icon} />
        </div>
        <div className={styles.iconTextWrapper}>
          <p>{t("event.info.labelPrice")}</p>
          {getEventPrice(
            eventData.eventDetails,
            locale,
            t("event.info.offers.isFree")
          ) || "-"}
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
