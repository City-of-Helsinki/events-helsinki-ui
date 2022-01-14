import classNames from 'classnames';
import {
  Button,
  IconArrowLeft,
  IconCalendarClock,
  IconLinkExternal,
  IconLocation,
  IconTicket,
} from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import buttonStyles from '../../../common/components/button/button.module.scss';
import IconButton from '../../../common/components/iconButton/IconButton';
import InfoWithIcon from '../../../common/components/infoWithIcon/InfoWithIcon';
import SkeletonLoader from '../../../common/components/skeletonLoader/SkeletonLoader';
import Visible from '../../../common/components/visible/Visible';
import useLocale from '../../../hooks/useLocale';
import getDateRangeStr from '../../../util/getDateRangeStr';
import testImage from '../../../util/testImage';
import Container from '../../app/layout/Container';
import EventKeywords from '../eventKeywords/EventKeywords';
import LocationText from '../eventLocation/EventLocationText';
import EventName from '../eventName/EventName';
import {
  extractLatestReturnPath,
  ReturnParams,
} from '../eventQueryString.util';
import { getEventFields, getEventPrice } from '../EventUtils';
import { EventFields, SuperEventResponse } from '../types';
import styles from './eventHero.module.scss';

export interface Props {
  event: EventFields;
  superEvent?: SuperEventResponse;
}

const EventHero: React.FC<Props> = ({ event, superEvent }) => {
  const { t } = useTranslation();
  const [showBackupImage, setShowBackupImage] = React.useState(false);
  const locale = useLocale();
  const history = useHistory();
  const { search } = useLocation();

  const {
    endTime: eventEndTime,
    imageUrl,
    keywords,
    offerInfoUrl,
    placeholderImage,
    shortDescription,
    startTime: eventStartTime,
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
  const returnParam = extractLatestReturnPath(search);

  const goBack = ({ returnPath, remainingQueryString }: ReturnParams) => {
    history.push({
      pathname: `/${locale}${returnPath}`,
      search: remainingQueryString,
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

  const startTime =
    superEvent?.status === 'pending'
      ? ''
      : superEvent?.data?.startTime || eventStartTime;
  const endTime =
    superEvent?.status === 'pending'
      ? ''
      : superEvent?.data?.endTime || eventEndTime;

  return (
    <div className={classNames(styles.heroWrapper)}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.backButtonWrapper}>
            <IconButton
              role="link"
              ariaLabel={t('event.hero.ariaLabelBackButton')}
              backgroundColor="white"
              icon={<IconArrowLeft aria-hidden />}
              onClick={() => goBack(returnParam)}
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
                <Visible above="sm" className={styles.start}>
                  {superEvent?.status === 'pending' ? (
                    <SkeletonLoader />
                  ) : (
                    (startTime !== eventStartTime ||
                      endTime !== eventEndTime) && (
                      <InfoWithIcon
                        icon={<IconCalendarClock aria-hidden />}
                        title={''}
                      >
                        {getDateRangeStr({
                          start: eventStartTime || '',
                          end: eventEndTime,
                          locale,
                          includeTime: true,
                          timeAbbreviation: t('commons.timeAbbreviation'),
                        })}
                      </InfoWithIcon>
                    )
                  )}
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
                      iconRight={<IconLinkExternal aria-hidden />}
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
