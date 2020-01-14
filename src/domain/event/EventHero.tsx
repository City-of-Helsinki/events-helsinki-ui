import classNames from "classnames";
import { isThisWeek, isToday } from "date-fns";
import {
  IconAngleRight,
  IconArrowLeft,
  IconLocation,
  IconTicket
} from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router";

import Button from "../../common/components/button/Button";
import { EventDetailsQuery } from "../../generated/graphql";
import getDateRangeStr from "../../util/getDateRangeStr";
import getLocale from "../../util/getLocale";
import getLocalisedString from "../../util/getLocalisedString";
import Container from "../app/layout/Container";
import styles from "./eventHero.module.scss";
import EventKeywords from "./EventKeywords";
import LocationText from "./EventLocationText";
import { getEventPrice } from "./EventUtils";

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
    const offer = eventData.eventDetails.offers.find(item =>
      getLocalisedString(item.infoUrl || {}, locale)
    );

    return offer ? getLocalisedString(offer.infoUrl || {}, locale) : "";
  }, [eventData.eventDetails.offers, locale]);

  const handleBack = () => {
    push({ pathname: `/${locale}/events`, search });
  };

  const moveToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

  const image = eventData.eventDetails.images.length
    ? eventData.eventDetails.images[0]
    : null;
  const description = eventData.eventDetails.shortDescription || {};
  const keywords = eventData.eventDetails.keywords;
  const startTime = eventData.eventDetails.startTime;
  const endTime = eventData.eventDetails.endTime;
  const name = eventData.eventDetails.name;
  const today = startTime ? isToday(new Date(startTime)) : false;
  const thisWeek = startTime ? isThisWeek(new Date(startTime)) : false;

  return (
    <div className={styles.heroWrapper}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.backButtonWrapper}>
            <button className={styles.backButton} onClick={handleBack}>
              <IconArrowLeft />
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
                  <EventKeywords
                    blackOnMobile={true}
                    event={eventData.eventDetails}
                    showIsFree={false}
                  />
                </div>
              )}
              <div className={classNames(styles.date, styles.desktopOnly)}>
                {!!startTime && getDateRangeStr(startTime, endTime, locale)}
              </div>
              <div className={styles.title}>
                {getLocalisedString(name, locale)}
              </div>
              <div className={styles.description}>
                {getLocalisedString(description, locale)}
              </div>

              <div
                className={classNames(styles.infoWithIcon, styles.desktopOnly)}
              >
                <div className={styles.iconWrapper}>
                  <IconLocation className={styles.icon} />
                </div>
                <div className={styles.iconTextWrapper}>
                  <LocationText
                    event={eventData.eventDetails}
                    showDistrict={false}
                    showLocationName={true}
                  />
                </div>
              </div>

              <div
                className={classNames(styles.infoWithIcon, styles.desktopOnly)}
              >
                <div className={styles.iconWrapper}>
                  <IconTicket className={styles.icon} />
                </div>
                <div className={styles.iconTextWrapper}>
                  {getEventPrice(
                    eventData.eventDetails,
                    locale,
                    t("event.hero.offers.isFree")
                  ) || "-"}
                </div>
              </div>
              {!!offerInfoUrl && (
                <>
                  <div
                    className={classNames(
                      styles.buyButtonWrapper,
                      styles.desktopOnly
                    )}
                  >
                    <Button
                      color="primary"
                      iconRight={<IconAngleRight />}
                      onClick={moveToBuyTicketsPage}
                      size="default"
                    >
                      {t("event.hero.buttonBuyTickets")}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default withRouter(EventHero);
