import * as Sentry from "@sentry/browser";
import classNames from "classnames";
import { saveAs } from "file-saver";
import {
  Button,
  IconAngleRight,
  IconCalendarClock,
  IconGlobe,
  IconInfoCircle,
  IconLocation,
  IconTicket
} from "hds-react";
import { createEvent, EventAttributes } from "ics";
import capitalize from "lodash/capitalize";
import React from "react";
import { useTranslation } from "react-i18next";

import Link from "../../../common/components/link/Link";
import linkStyles from "../../../common/components/link/link.module.scss";
import { EventFieldsFragment } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import IconDirections from "../../../icons/IconDirections";
import getDateArray from "../../../util/getDateArray";
import getDateRangeStr from "../../../util/getDateRangeStr";
import getDomain from "../../../util/getDomain";
import getLocalisedString from "../../../util/getLocalisedString";
import { translateValue } from "../../../util/translateUtils";
import { ROUTES } from "../../app/constants";
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
  event: EventFieldsFragment;
}

const EventInfo: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const offerInfoUrl = React.useMemo(() => {
    const offer = event.offers.find(item =>
      getLocalisedString(item.infoUrl || {}, locale)
    );

    return offer ? getLocalisedString(offer.infoUrl || {}, locale) : "";
  }, [event.offers, locale]);

  const startTime = event.startTime;
  const endTime = event.endTime;
  const eventLocation = event.location;
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
  const district = getEventDistrict(event, locale);

  const languages = event.inLanguage
    .map(item => capitalize(getLocalisedString(item.name || {}, locale)))
    .filter(e => e);
  const email = eventLocation && eventLocation.email;
  const infoUrl = event.infoUrl
    ? getLocalisedString(event.infoUrl, locale)
    : null;
  const telephone =
    eventLocation && eventLocation.telephone
      ? getLocalisedString(eventLocation.telephone, locale)
      : null;
  const externalLinks = event.externalLinks;

  const moveToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

  const downloadIcsFile = () => {
    if (event.startTime) {
      const domain = getDomain();
      const icsEvent: EventAttributes = {
        description: t("event.info.textCalendarLinkDescription", {
          description: getLocalisedString(event.shortDescription || {}, locale),
          link: `${domain}/${locale}${ROUTES.EVENT.replace(":id", event.id)}`
        }),
        end: event.endTime
          ? getDateArray(event.endTime)
          : getDateArray(event.startTime),
        location: [locationName, streetAddress, district, addressLocality]
          .filter(e => e)
          .join(", "),
        productId: domain,
        start: getDateArray(event.startTime),
        startOutputType: "local",
        title: getLocalisedString(event.name || {}, locale)
      };
      createEvent(icsEvent, (error: Error | undefined, value: string) => {
        if (error) {
          Sentry.captureException(error);
        } else {
          const blob = new Blob([value], { type: "text/calendar" });
          saveAs(blob, `event_${event.id.replace(/:/g, "")}.ics`);
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
            <IconCalendarClock className={styles.icon} />
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
            {event.startTime && (
              <button className={linkStyles.link} onClick={downloadIcsFile}>
                {t("event.info.buttonAddToCalendar")}
                <IconAngleRight />
              </button>
            )}
          </div>
        </div>

        {/* Other event times */}
        <OtherEventTimes event={event} />

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
            <Link isExternal={true} to={getServiceMapUrl(event, locale, false)}>
              {t("event.info.openMap")}
            </Link>
          </div>
        </div>

        {/* Languages */}
        {!!languages.length && (
          <div className={styles.infoWithIcon}>
            <div className={styles.iconWrapper}>
              <IconGlobe className={styles.icon} />
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
              <IconInfoCircle className={styles.icon} />
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
            <Link isExternal={true} to={getGoogleDirectionsLink(event, locale)}>
              {t("event.info.directionsGoogle")}
            </Link>
            <Link isExternal={true} to={getHslDirectionsLink(event, locale)}>
              {t("event.info.directionsHSL")}
            </Link>
          </div>
        </div>
        {/* Organization info */}
        <OrganizationInfo event={event} />

        {/* Price info */}
        <div className={classNames(styles.infoWithIcon, styles.mobileOnly)}>
          <div className={styles.iconWrapper}>
            <IconTicket className={styles.icon} />
          </div>
          <div className={styles.iconTextWrapper}>
            <h2 className={styles.title}>{t("event.info.labelPrice")}</h2>
            {getEventPrice(event, locale, t("event.info.offers.isFree")) || "-"}
          </div>
        </div>

        {offerInfoUrl && (
          <div
            className={classNames(styles.buyButtonWrapper, styles.mobileOnly)}
          >
            <Button
              aria-label={t("event.info.ariaLabelBuyTickets")}
              fullWidth={true}
              onClick={moveToBuyTicketsPage}
              variant="success"
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
