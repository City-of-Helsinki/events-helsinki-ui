import React from "react";
import { useTranslation } from "react-i18next";

import Button from "../../common/components/button/Button";
import Category from "../../common/components/category/Category";
import { EventDetailsQuery } from "../../generated/graphql";
import AngleRightIcon from "../../icons/AngleRightIcon";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import LocationIcon from "../../icons/LocationIcon";
import ShareIcon from "../../icons/ShareIcon";
import TicketIcon from "../../icons/TicketIcon";
import { formatDate } from "../../util/dateUtils";
import getLocale from "../../util/getLocale";
import getLocalisedString from "../../util/getLocalisedString";
import Container from "../app/layout/Container";
import styles from "./eventHero.module.scss";

interface Props {
  eventData: EventDetailsQuery;
}

const EventHero: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();
  const locale = getLocale();

  const getLocationStr = () => {
    const location = eventData.linkedEventsEventDetails.location;
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

    return [locationName, streetAddress, addressLocality].join(", ");
  };

  const handleBack = () => {
    alert("TODO: Move to search page");
  };

  const moveToTicketProvider = () => {
    alert("TODO: Move to ticket provider page");
  };

  const handleShare = () => {
    alert("TODO: Share event");
  };

  const isFree = React.useMemo(() => {
    const price = eventData.linkedEventsEventDetails.offers.length
      ? eventData.linkedEventsEventDetails.offers[0]
      : null;

    return !price || price.isFree;
  }, [eventData.linkedEventsEventDetails.offers]);

  const getPriceStr = () => {
    return isFree
      ? t("event.offers.isFree")
      : eventData.linkedEventsEventDetails.offers
          .map(offer => getLocalisedString(offer.price || {}, locale))
          .filter(e => e)
          .sort()
          .join(", ");
  };

  const image = eventData.linkedEventsEventDetails.images.length
    ? eventData.linkedEventsEventDetails.images[0]
    : null;
  const description = eventData.linkedEventsEventDetails.shortDescription || {};
  const keywords = eventData.linkedEventsEventDetails.keywords;
  const startTime = eventData.linkedEventsEventDetails.startTime;
  const name = eventData.linkedEventsEventDetails.name;

  return (
    <div className={styles.heroWrapper}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.backButtonWrapper}>
            <button className={styles.backButton} onClick={handleBack}>
              <ArrowLeftIcon />
            </button>
          </div>
          <div>
            {image && (
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${image.url})` }}
              />
            )}
          </div>
          <div className={styles.leftPanel}>
            <div className={styles.textWrapper}>
              <div className={styles.categoryWrapper}>
                {keywords &&
                  keywords.map(keyword => {
                    return (
                      <Category
                        key={keyword.id}
                        category={{
                          text: getLocalisedString(keyword.name, locale),
                          value: keyword.id
                        }}
                      />
                    );
                  })}
              </div>
              <div className={styles.date}>
                {formatDate(new Date(startTime), "d. MMMM yyyy EEEE", locale)}
              </div>
              <div className={styles.title}>
                {getLocalisedString(name, locale)}
              </div>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: getLocalisedString(description, locale)
                }}
              />
              <div className={styles.infoWithIcon}>
                <div className={styles.iconWrapper}>
                  <LocationIcon className={styles.icon} />
                </div>
                <div className={styles.iconTextWrapper}>
                  {getLocationStr() || "-"}
                </div>
              </div>

              <div className={styles.infoWithIcon}>
                <div className={styles.iconWrapper}>
                  <TicketIcon className={styles.icon} />
                </div>
                <div className={styles.iconTextWrapper}>
                  {getPriceStr() || "-"}
                </div>
              </div>
              {!isFree && (
                <div className={styles.buttonWrapper}>
                  <Button
                    color="primary"
                    iconAtEnd={<AngleRightIcon />}
                    onClick={moveToTicketProvider}
                    size="sm"
                  >
                    {t("event.buttonBuyTickets")}
                  </Button>
                </div>
              )}
            </div>
            <div className={styles.shareWrapper}>
              <button className={styles.shareButton} onClick={handleShare}>
                <ShareIcon />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EventHero;
