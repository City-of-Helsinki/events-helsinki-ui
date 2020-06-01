import classNames from "classnames";
import { isThisWeek, isToday } from "date-fns";
import { Button, IconArrowLeft, IconLocation } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import IconLink from "../../../common/components/link/IconLink";
import { EventDetailsQuery } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import IconTicket from "../../../icons/IconTicket";
import getDateRangeStr from "../../../util/getDateRangeStr";
import getLocalisedString from "../../../util/getLocalisedString";
import testImage from "../../../util/testImage";
import { ROUTES } from "../../app/constants";
import Container from "../../app/layout/Container";
import EventKeywords from "../eventKeywords/EventKeywords";
import LocationText from "../eventLocation/EventLocationText";
import EventName from "../eventName/EventName";
import {
  getEventImageUrl,
  getEventPlaceholderImageUrl,
  getEventPrice,
  isEventFree
} from "../EventUtils";
import styles from "./eventHero.module.scss";

interface Props {
  eventData: EventDetailsQuery;
}

const EventHero: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();
  const [showBackupImage, setShowBackupImage] = React.useState(false);
  const locale = useLocale();
  const location = useLocation();

  const offerInfoUrl = React.useMemo(() => {
    const offer = eventData.eventDetails.offers.find(item =>
      getLocalisedString(item.infoUrl || {}, locale)
    );

    return offer ? getLocalisedString(offer.infoUrl || {}, locale) : "";
  }, [eventData.eventDetails.offers, locale]);

  const eventSearchUrl = React.useMemo(() => {
    return `/${locale}${ROUTES.EVENTS}${location.search}`;
  }, [locale, location.search]);

  const moveToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

  const imageUrl = getEventImageUrl(eventData.eventDetails);
  const placeholderImage = getEventPlaceholderImageUrl(eventData.eventDetails);
  const description = eventData.eventDetails.shortDescription || {};
  const keywords = eventData.eventDetails.keywords;
  const startTime = eventData.eventDetails.startTime;
  const endTime = eventData.eventDetails.endTime;
  const today = startTime ? isToday(new Date(startTime)) : false;
  const thisWeek = startTime ? isThisWeek(new Date(startTime)) : false;

  const showBuyButton = !!offerInfoUrl && !isEventFree(eventData.eventDetails);

  React.useEffect(() => {
    if (imageUrl) {
      const testThatImageExist = async () => {
        try {
          await testImage(imageUrl);
        } catch {
          setShowBackupImage(true);
        }
      };

      testThatImageExist();
    }
  }, [imageUrl]);

  return (
    <div className={styles.heroWrapper}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.backButtonWrapper}>
            <IconLink
              aria-label={t("event.hero.ariaLabelBackButton")}
              backgroundColor="white"
              icon={<IconArrowLeft />}
              to={eventSearchUrl}
            />
          </div>
          <div>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${
                  showBackupImage ? placeholderImage : imageUrl
                })`
              }}
            />
          </div>
          <div className={styles.leftPanel}>
            <div className={styles.textWrapper}>
              {(today || thisWeek || (!!keywords && !!keywords.length)) && (
                <div className={styles.categoryWrapper}>
                  <EventKeywords
                    blackOnMobile={true}
                    event={eventData.eventDetails}
                    showIsFree={true}
                  />
                </div>
              )}
              <div className={classNames(styles.date, styles.desktopOnly)}>
                {!!startTime &&
                  getDateRangeStr(
                    startTime,
                    endTime,
                    locale,
                    true,
                    true,
                    t("commons.timeAbbreviation")
                  )}
              </div>
              <div className={styles.title}>
                <EventName event={eventData.eventDetails} />
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
              {showBuyButton && (
                <>
                  <div
                    className={classNames(
                      styles.buyButtonWrapper,
                      styles.desktopOnly
                    )}
                  >
                    <Button
                      aria-label={t("event.hero.ariaLabelBuyTickets")}
                      onClick={moveToBuyTicketsPage}
                      variant="success"
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

export default EventHero;
