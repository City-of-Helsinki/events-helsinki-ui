import * as Sentry from "@sentry/browser";
import classNames from "classnames";
import { saveAs } from "file-saver";
import {
  IconAngleRight,
  IconCalendar,
  IconDirections,
  IconInfo,
  IconLanguage,
  IconLocation
} from "hds-react";
import { createEvent, EventAttributes } from "ics";
import capitalize from "lodash/capitalize";
import React from "react";
import { useTranslation } from "react-i18next";

import Button from "../../../common/components/button/Button";
import Link from "../../../common/components/link/Link";
import linkStyles from "../../../common/components/link/link.module.scss";
import { EventDetailsQuery } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import IconTicket from "../../../icons/IconTicket";
import getDateArray from "../../../util/getDateArray";
import getDateRangeStr from "../../../util/getDateRangeStr";
import getDomain from "../../../util/getDomain";
import getLocalisedString from "../../../util/getLocalisedString";
import { translateValue } from "../../../util/translateUtils";
import {
  getEventDistrict,
  getEventPrice,
  getGoogleDirectionsLink,
  getHslDirectionsLink,
  getServiceMapUrl
} from "../EventUtils";
import styles from "./eventInfo.module.scss";
import OrganizationInfo from "./OrganizationInfo";
import OtherEventTimes from "./OtherEventTimes";

interface Props {
  eventData: EventDetailsQuery;
}

const EventInfo: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();
  const locale = useLocale();

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
          Sentry.captureException(error);
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
      <div className={styles.contentWrapper}>
        {/* Date info */}
        <div className={styles.infoWithIcon}>
          <div className={styles.iconWrapper}>
            <IconCalendar className={styles.icon} />
          </div>
          <div className={styles.iconTextWrapper}>
            <h2 className={styles.title}>{t("event.info.labelDateAndTime")}</h2>

            {!!startTime &&
              getDateRangeStr(
                startTime,
                endTime,
                locale,
                true,
                true,
                t("commons.timeAbbreviation")
              )}
            {eventData.eventDetails.startTime && (
              <button className={linkStyles.link} onClick={downloadIcsFile}>
                {t("event.info.buttonAddToCalendar")}
                <IconAngleRight />
              </button>
            )}
          </div>
        </div>

        {/* Other event times */}
        <OtherEventTimes eventData={eventData} />

        {/* Location info */}
        <div className={styles.infoWithIcon}>
          <div className={styles.iconWrapper}>
            <IconLocation className={styles.icon} />
          </div>
          <div className={styles.iconTextWrapper}>
            <h2 className={styles.title}>{t("event.info.labelLocation")}</h2>
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
            <Link
              isExternal={true}
              to={getServiceMapUrl(eventData, locale, false)}
            >
              {t("event.info.openMap")}
            </Link>
          </div>
        </div>

        {/* Languages */}
        {!!languages.length && (
          <div className={styles.infoWithIcon}>
            <div className={styles.iconWrapper}>
              <IconLanguage className={styles.icon} />
            </div>
            <div className={styles.iconTextWrapper}>
              <h2 className={styles.title}>{t("event.info.labelLanguages")}</h2>
              <div>{languages.join(", ")}</div>
            </div>
          </div>
        )}

        {/* Other info */}
        {(!!email || !!externalLinks.length || !!infoUrl || !!telephone) && (
          <div className={styles.infoWithIcon}>
            <div className={styles.iconWrapper}>
              <IconInfo className={styles.icon} />
            </div>
            <div className={styles.iconTextWrapper}>
              <h2 className={styles.title}>{t("event.info.labelOtherInfo")}</h2>
              {email && <div>{email}</div>}
              {telephone && <div>{telephone}</div>}
              {infoUrl && (
                <Link isExternal={true} to={infoUrl}>
                  {t("event.info.linkWebPage")}
                </Link>
              )}

              {externalLinks.map((externalLink, index) => {
                return (
                  !!externalLink.link && (
                    <Link key={index} isExternal={true} to={externalLink.link}>
                      {translateValue(
                        "event.info.",
                        externalLink.name || "",
                        t
                      )}
                    </Link>
                  )
                );
              })}
            </div>
          </div>
        )}

        {/* Directions */}
        <div className={styles.infoWithIcon}>
          <div className={styles.iconWrapper}>
            <IconDirections className={styles.icon} />
          </div>
          <div className={styles.iconTextWrapper}>
            <h2 className={styles.title}>{t("event.info.labelDistricts")}</h2>
            <Link
              isExternal={true}
              to={getGoogleDirectionsLink(eventData, locale)}
            >
              {t("event.info.directionsGoogle")}
            </Link>
            <Link
              isExternal={true}
              to={getHslDirectionsLink(eventData, locale)}
            >
              {t("event.info.directionsHSL")}
            </Link>
          </div>
        </div>
        {/* Organization info */}
        <OrganizationInfo eventData={eventData} />

        {/* Price info */}
        <div className={classNames(styles.infoWithIcon, styles.mobileOnly)}>
          <div className={styles.iconWrapper}>
            <IconTicket className={styles.icon} />
          </div>
          <div className={styles.iconTextWrapper}>
            <h2 className={styles.title}>{t("event.info.labelPrice")}</h2>
            {getEventPrice(
              eventData.eventDetails,
              locale,
              t("event.info.offers.isFree")
            ) || "-"}
          </div>
        </div>

        {offerInfoUrl && (
          <div
            className={classNames(styles.buyButtonWrapper, styles.mobileOnly)}
          >
            <Button
              aria-label={t("event.info.ariaLabelBuyTickets")}
              color="primary"
              fullWidth={true}
              onClick={moveToBuyTicketsPage}
              size="default"
            >
              {t("event.info.buttonBuyTickets")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventInfo;
