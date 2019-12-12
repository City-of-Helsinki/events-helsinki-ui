import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import Keyword from "../../common/components/keyword/Keyword";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import getDateRangeStr from "../../util/getDateRangeStr";
import getLocale from "../../util/getLocale";
import getLocalisedString from "../../util/getLocalisedString";
import getTimeRangeStr from "../../util/getTimeRangeStr";
import EventKeywords from "../event/EventKeywords";
import LocationText from "../event/EventLocationText";
import { getEventPrice, isEventFree } from "../event/EventUtils";
import { EventInList } from "../event/types";
import styles from "./similarEventCard.module.scss";

interface Props {
  event: EventInList;
}

const SimilarEventCard: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const locale = getLocale();

  const image = event.images.length ? event.images[0] : null;
  const name = event.name;
  const startTime = event.startTime;
  const endTime = event.endTime;

  const moveToEventPage = () => {
    push({ pathname: `/${locale}/event/${event.id}` });
  };

  return (
    <div className={styles.similarEventCard}>
      <div
        className={styles.imageWrapper}
        style={{ backgroundImage: image ? `url(${image.url})` : undefined }}
      >
        <div className={styles.tagWrapperDesktop}>
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
        <div>
          <div className={styles.categoryWrapperMobile}>
            <EventKeywords event={event} showIsFree={true} />
          </div>
          <div className={styles.textWrapper}>
            <div className={styles.eventDateAndTime}>
              {!!startTime &&
                `${getDateRangeStr(
                  startTime,
                  endTime,
                  locale,
                  false
                )} ${getTimeRangeStr(startTime, endTime, locale)}`}
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
              {getEventPrice(
                event,
                locale,
                t("eventSearch.event.offers.isFree")
              )}
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={moveToEventPage}>
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarEventCard;
