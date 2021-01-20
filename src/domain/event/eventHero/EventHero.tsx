import classNames from 'classnames';
import { Button, IconArrowLeft, IconLocation, IconTicket } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import buttonStyles from '../../../common/components/button/button.module.scss';
import IconButton from '../../../common/components/iconButton/IconButton';
import InfoWithIcon from '../../../common/components/infoWithIcon/InfoWithIcon';
import Visible from '../../../common/components/visible/Visible';
import useLocale from '../../../hooks/useLocale';
import getDateRangeStr from '../../../util/getDateRangeStr';
import testImage from '../../../util/testImage';
import Container from '../../app/layout/Container';
import EventKeywords from '../eventKeywords/EventKeywords';
import LocationText from '../eventLocation/EventLocationText';
import EventName from '../eventName/EventName';
import { getEventFields, getEventPrice } from '../EventUtils';
import { EventFields, EVENTS_ROUTE_MAPPER, EventType } from '../types';
import styles from './eventHero.module.scss';

export interface Props {
  event: EventFields;
  eventType: EventType;
}

const EventHero: React.FC<Props> = ({ event, eventType }) => {
  const { t } = useTranslation();
  const [showBackupImage, setShowBackupImage] = React.useState(false);
  const locale = useLocale();
  const history = useHistory();
  const { search } = useLocation();

  const {
    endTime,
    imageUrl,
    keywords,
    offerInfoUrl,
    placeholderImage,
    shortDescription,
    startTime,
    today,
    thisWeek,
    showBuyButton,
    registrationUrl,
  } = getEventFields(event, locale);
  const eventPriceText = getEventPrice(
    event,
    locale,
    t('event.hero.offers.isFree')
  );

  const showKeywords = Boolean(today || thisWeek || keywords.length);

  const goToEventList = () => {
    history.push({
      pathname: `/${locale}${EVENTS_ROUTE_MAPPER[eventType]}`,
      search,
      state: { eventId: event.id },
    });
  };

  const goToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

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
    <div className={classNames(styles.heroWrapper)}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.backButtonWrapper}>
            <IconButton
              ariaLabel={t('event.hero.ariaLabelBackButton')}
              backgroundColor="white"
              icon={<IconArrowLeft aria-hidden />}
              onClick={goToEventList}
              size="default"
            />
          </div>
          <div>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${
                  showBackupImage ? placeholderImage : imageUrl
                })`,
              }}
            />
          </div>
          <div className={styles.leftPanel}>
            <div className={styles.textWrapper}>
              <h1 className={styles.title}>
                <EventName event={event} />
              </h1>
              {shortDescription && (
                <div className={styles.description}>{shortDescription}</div>
              )}
              <Visible above="sm" className={styles.date}>
                {!!startTime &&
                  getDateRangeStr({
                    start: startTime,
                    end: endTime,
                    locale,
                    includeTime: true,
                    timeAbbreviation: t('commons.timeAbbreviation'),
                  })}
              </Visible>
              <div className={styles.additionalInfo}>
                <Visible above="sm" className={styles.location}>
                  <InfoWithIcon icon={<IconLocation aria-hidden />} title={''}>
                    <LocationText
                      event={event}
                      showDistrict={false}
                      showLocationName={true}
                    />
                  </InfoWithIcon>
                </Visible>
                {eventPriceText && (
                  <Visible above="sm" className={styles.price}>
                    <InfoWithIcon icon={<IconTicket aria-hidden />} title={''}>
                      {eventPriceText}
                    </InfoWithIcon>
                  </Visible>
                )}
                {showBuyButton && (
                  <Visible above="sm" className={styles.buyButtonWrapper}>
                    <Button
                      aria-label={t('event.hero.ariaLabelBuyTickets')}
                      onClick={goToBuyTicketsPage}
                      variant="success"
                    >
                      {t('event.hero.buttonBuyTickets')}
                    </Button>
                  </Visible>
                )}
                {registrationUrl && (
                  <Visible className={styles.registrationButtonWrapper}>
                    <Button
                      className={buttonStyles.buttonCoatBlue}
                      aria-label={t('event.hero.ariaLabelEnrol')}
                      onClick={() => window.open(registrationUrl)}
                    >
                      {t('event.hero.buttonEnrol')}
                    </Button>
                  </Visible>
                )}
              </div>
              {showKeywords && (
                <div className={styles.categoryWrapper}>
                  <EventKeywords
                    blackOnMobile={true}
                    event={event}
                    showIsFree={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EventHero;
