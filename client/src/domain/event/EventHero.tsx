import classNames from "classnames";
import { isThisWeek, isToday } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router";

import Button from "../../common/components/button/Button";
import Keyword from "../../common/components/keyword/Keyword";
import { EventDetailsQuery } from "../../generated/graphql";
import AngleRightIcon from "../../icons/AngleRightIcon";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import CalendarIcon from "../../icons/CalendarIcon";
import LocationIcon from "../../icons/LocationIcon";
import ShareIcon from "../../icons/ShareIcon";
import TicketIcon from "../../icons/TicketIcon";
import getDateRangeStr from "../../util/getDateRangeStr";
import getLocale from "../../util/getLocale";
import getLocalisedString from "../../util/getLocalisedString";
import getTimeRangeStr from "../../util/getTimeRangeStr";
import Container from "../app/layout/Container";
import styles from "./eventHero.module.scss";

interface Props extends RouteComponentProps {
  eventData: EventDetailsQuery;
}

const EventHero: React.FC<Props> = ({
  eventData,
  history: { push },
  location: { search }
}) => {
  const { t } = useTranslation();
  const locale = getLocale();

  const offerInfoUrl = React.useMemo(() => {
    const offer = eventData.linkedEventsEventDetails.offers.find(item =>
      getLocalisedString(item.infoUrl || {}, locale)
    );

    return offer ? getLocalisedString(offer.infoUrl || {}, locale) : "";
  }, [eventData.linkedEventsEventDetails.offers, locale]);

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

    return [locationName, streetAddress, addressLocality]
      .filter(e => e)
      .join(", ");
  };

  const handleBack = () => {
    push({ pathname: `/${locale}/search`, search });
  };

  const moveToTicketProvider = () => {
    window.open(offerInfoUrl);
  };

  const handleShare = () => {
    alert("TODO: Share event");
  };

  const isFree = React.useMemo(() => {
    const offer = eventData.linkedEventsEventDetails.offers.find(
      item => item.isFree
    );

    return !offer || offer.isFree;
  }, [eventData.linkedEventsEventDetails.offers]);

  const getPriceStr = () => {
    return isFree
      ? t("event.hero.offers.isFree")
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
  const endTime = eventData.linkedEventsEventDetails.endTime;
  const name = eventData.linkedEventsEventDetails.name;
  const today = isToday(new Date(startTime));
  const thisWeek = isThisWeek(new Date(startTime));

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
              {(today || thisWeek || (!!keywords && !!keywords.length)) && (
                <div className={styles.categoryWrapper}>
                  {keywords &&
                    keywords.map(keyword => {
                      return (
                        <Keyword
                          key={keyword.id}
                          keyword={getLocalisedString(keyword.name, locale)}
                        />
                      );
                    })}
                  {!today && !thisWeek && (
                    <Keyword
                      color="lightEngel50"
                      keyword={t("event.categories.labelToday")}
                    />
                  )}
                  {!today && thisWeek && (
                    <Keyword
                      color="lightEngel50"
                      keyword={t("event.categories.labelThisWeek")}
                    />
                  )}
                </div>
              )}
              <div className={classNames(styles.date, styles.desktopOnly)}>
                {getDateRangeStr(startTime, endTime, locale)}
              </div>
              <div className={styles.title}>
                {getLocalisedString(name, locale)}
              </div>
              <div className={styles.description}>
                {getLocalisedString(description, locale)}
              </div>
              <div className={styles.infoWithIcon}>
                <div className={styles.iconWrapper}>
                  <LocationIcon className={styles.icon} />
                </div>
                <div className={styles.iconTextWrapper}>
                  <p className={styles.mobileOnly}>
                    {t("event.hero.labelLocation")}
                  </p>
                  {getLocationStr() || "-"}
                </div>
              </div>

              <div
                className={classNames(styles.infoWithIcon, styles.mobileOnly)}
              >
                <div className={styles.iconWrapper}>
                  <CalendarIcon className={styles.icon} />
                </div>
                <div className={styles.iconTextWrapper}>
                  <p className={styles.mobileOnly}>
                    {t("event.hero.labelDateAndTime")}
                  </p>
                  <div>{getDateRangeStr(startTime, endTime, locale)}</div>
                  <div>{getTimeRangeStr(startTime, endTime, locale)}</div>
                </div>
              </div>

              <div className={styles.infoWithIcon}>
                <div className={styles.iconWrapper}>
                  <TicketIcon className={styles.icon} />
                </div>
                <div className={styles.iconTextWrapper}>
                  <p className={styles.mobileOnly}>
                    {t("event.hero.labelPrice")}
                  </p>
                  {getPriceStr() || "-"}
                </div>
              </div>
              {!!offerInfoUrl && (
                <>
                  <div className={styles.buttonWrapper}>
                    <Button
                      color="primary"
                      iconAtEnd={<AngleRightIcon />}
                      onClick={moveToTicketProvider}
                      size="sm"
                    >
                      {t("event.hero.buttonBuyTickets")}
                    </Button>
                  </div>
                  <div className={styles.buttonWrapperMobile}>
                    <Button
                      color="primary"
                      fullWidth={true}
                      iconAtStart={<TicketIcon />}
                      onClick={moveToTicketProvider}
                      size="sm"
                    >
                      {t("event.hero.buttonBuyTickets")}
                    </Button>
                  </div>
                </>
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

export default withRouter(EventHero);
