import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";

import EventKeywords from "../../../domain/event/eventKeywords/EventKeywords";
import LocationText from "../../../domain/event/eventLocation/EventLocationText";
import EventName from "../../../domain/event/eventName/EventName";
import {
  getEventImageUrl,
  getEventPrice,
  isEventFree
} from "../../../domain/event/EventUtils";
import { EventInList } from "../../../domain/event/types";
import useLocale from "../../../hooks/useLocale";
import getDateRangeStr from "../../../util/getDateRangeStr";
import getLocalisedString from "../../../util/getLocalisedString";
import getTimeRangeStr from "../../../util/getTimeRangeStr";
import Button from "../button/Button";
import SrOnly from "../srOnly/SrOnly";
import styles from "./largeEventCard.module.scss";

interface Props {
  event: EventInList;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const { search } = useLocation();
  const locale = useLocale();

  const offerInfoUrl = React.useMemo(() => {
    const offer = event.offers.find(item =>
      getLocalisedString(item.infoUrl || {}, locale)
    );

    return offer ? getLocalisedString(offer.infoUrl || {}, locale) : "";
  }, [event.offers, locale]);

  const moveToBuyTicketsPage = React.useCallback(() => {
    window.open(offerInfoUrl);
  }, [offerInfoUrl]);

  const moveToEventPage = React.useCallback(() => {
    push({ pathname: `/${locale}/event/${event.id}`, search });
  }, [event.id, locale, push, search]);

  const imageUrl = getEventImageUrl(event);
  const startTime = event.startTime;
  const endTime = event.endTime;
  const eventUrl = React.useMemo(() => {
    return `/${locale}/event/${event.id}${search}`;
  }, [event.id, locale, search]);

  const showBuyButton = !!offerInfoUrl && !isEventFree(event);

  return (
    <div className={styles.eventCard}>
      <Link
        aria-hidden={true}
        className={styles.imageWrapper}
        style={{ backgroundImage: `url(${imageUrl})` }}
        tabIndex={-1}
        to={eventUrl}
      >
        <div className={styles.tagWrapper}>
          <div className={styles.priceWrapper}></div>

          <div className={styles.categoryWrapper}>
            <EventKeywords
              event={event}
              hideKeywordsOnMobile={true}
              showIsFree={true}
            />
          </div>
        </div>
      </Link>
      <div className={styles.infoWrapper}>
        <div className={styles.categoryWrapperDesktop}>
          <EventKeywords
            event={event}
            hideKeywordsOnMobile={true}
            showIsFree={true}
          />
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.eventDateAndTime}>
            {!!startTime &&
              t("eventSearch.event.dateAndTime", {
                date: getDateRangeStr(startTime, endTime, locale),
                time: getTimeRangeStr(startTime, endTime, locale)
              })}
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
            {getEventPrice(event, locale, t("eventSearch.event.offers.isFree"))}
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <>
            <div className={classNames(styles.buyButtonWrapper)}>
              {showBuyButton && (
                <Button
                  color="primary"
                  fullWidth
                  onClick={moveToBuyTicketsPage}
                  size="small"
                >
                  {t("eventSearch.event.buttonBuyTickets")}
                </Button>
              )}
            </div>
            <div className={classNames(styles.readMoreButtonWrapper)}>
              <Button
                color="secondary"
                fullWidth
                onClick={moveToEventPage}
                size="small"
              >
                {t("eventSearch.event.buttonReadMore")}
              </Button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
