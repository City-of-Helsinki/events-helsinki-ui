import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import Button from "../../common/components/button/Button";
import Keyword from "../../common/components/keyword/Keyword";
import AngleRightIcon from "../../icons/TicketIcon";
import getDateRangeStr from "../../util/getDateRangeStr";
import getLocale from "../../util/getLocale";
import getLocalisedString from "../../util/getLocalisedString";
import getTimeRangeStr from "../../util/getTimeRangeStr";
import EventKeywords from "../event/EventKeywords";
import LocationText from "../event/EventLocationText";
import { getEventPrice, isEventFree } from "../event/EventUtils";
import { EventInList } from "../event/types";
import styles from "./eventCard.module.scss";

interface Props {
  event: EventInList;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const { search } = useLocation();
  const locale = getLocale();

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

  const image = event.images.length ? event.images[0] : null;
  const name = event.name;
  const startTime = event.startTime;
  const endTime = event.endTime;

  return (
    <div className={styles.eventCard}>
      <div
        className={styles.imageWrapper}
        style={{ backgroundImage: image ? `url(${image.url})` : undefined }}
      >
        <div className={styles.tagWrapper}>
          <div className={styles.priceWrapper}>
            {isEventFree(event) && (
              <Keyword
                color="tramLight20"
                keyword={t("eventSearch.event.offers.isFree")}
              />
            )}
          </div>

          <div className={styles.categoryWrapper}>
            <EventKeywords event={event} showIsFree={false} />
          </div>
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.categoryWrapperDesktop}>
          <EventKeywords event={event} showIsFree={true} />
        </div>
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
              {!!offerInfoUrl && (
                <Button
                  color="primary"
                  iconAtStart={<AngleRightIcon />}
                  onClick={moveToBuyTicketsPage}
                  size="sm"
                >
                  {t("eventSearch.event.buttonBuyTickets")}
                </Button>
              )}
            </div>
            <div className={classNames(styles.readMoreButtonWrapper)}>
              <Button color="secondary" onClick={moveToEventPage} size="sm">
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
