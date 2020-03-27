import classNames from "classnames";
import { IconArrowRight } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import EventKeywords from "../../../domain/event/eventKeywords/EventKeywords";
import LocationText from "../../../domain/event/eventLocation/EventLocationText";
import EventName from "../../../domain/event/eventName/EventName";
import {
  getEventImageUrl,
  getEventPrice,
  isEventClosed
} from "../../../domain/event/EventUtils";
import { EventInList } from "../../../domain/event/types";
import useLocale from "../../../hooks/useLocale";
import getDateRangeStr from "../../../util/getDateRangeStr";
import getLocalisedString from "../../../util/getLocalisedString";
import IconLink from "../link/IconLink";
import SrOnly from "../srOnly/SrOnly";
import styles from "./eventCard.module.scss";

interface Props {
  event: EventInList;
}

const SimilarEventCard: React.FC<Props> = ({ event }) => {
  const { search } = useLocation();
  const { t } = useTranslation();
  const locale = useLocale();

  const imageUrl = getEventImageUrl(event);
  const name = event.name;
  const startTime = event.startTime;
  const endTime = event.endTime;

  const eventUrl = React.useMemo(() => {
    return `/${locale}/event/${event.id}${search}`;
  }, [event.id, locale, search]);

  const eventClosed = isEventClosed(event);

  return (
    <div
      className={classNames(styles.eventCard, {
        [styles.eventClosed]: eventClosed
      })}
    >
      <Link
        aria-hidden={true}
        aria-label={t("commons.eventCard.ariaLabelLink", {
          name: getLocalisedString(name, locale)
        })}
        className={styles.imageWrapper}
        style={{ backgroundImage: `url(${imageUrl})` }}
        tabIndex={-1}
        to={eventUrl}
      >
        <div className={styles.tagWrapperDesktop}>
          <div className={styles.priceWrapper}></div>

          <div className={styles.categoryWrapper}>
            <EventKeywords
              event={event}
              showIsFree={true}
              showKeywords={false}
            />
          </div>
        </div>
      </Link>
      <div className={styles.infoWrapper}>
        <div>
          <div className={styles.categoryWrapperMobile}>
            <EventKeywords
              event={event}
              showIsFree={true}
              showKeywords={false}
            />
          </div>
          <div className={styles.textWrapper}>
            <div className={styles.eventDateAndTime}>
              {!!startTime &&
                getDateRangeStr(
                  startTime,
                  endTime,
                  locale,
                  false,
                  true,
                  t("commons.timeAbbreviation")
                )}
            </div>
            <Link
              aria-hidden="true"
              className={styles.eventName}
              tabIndex={-1}
              to={eventUrl}
            >
              <EventName event={event} />
            </Link>
            {/* Event name for screen readers  */}
            <SrOnly>
              <EventName event={event} />
            </SrOnly>
            <div className={styles.eventLocation}>
              <LocationText
                event={event}
                showDistrict={false}
                showLocationName={true}
              />
            </div>
            <div className={styles.eventPrice}>
              {getEventPrice(
                event,
                locale,
                t("eventSearch.event.offers.isFree")
              )}
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <IconLink
            aria-label={t("commons.eventCard.ariaLabelLink", {
              name: getLocalisedString(name, locale)
            })}
            icon={<IconArrowRight />}
            to={eventUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default SimilarEventCard;
