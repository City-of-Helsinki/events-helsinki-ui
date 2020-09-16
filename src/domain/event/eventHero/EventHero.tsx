import classNames from 'classnames';
import { isThisWeek, isToday } from 'date-fns';
import { Button, IconArrowLeft, IconLocation, IconTicket } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import IconButton from '../../../common/components/iconButton/IconButton';
import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getDateRangeStr from '../../../util/getDateRangeStr';
import getLocalisedString from '../../../util/getLocalisedString';
import testImage from '../../../util/testImage';
import { ROUTES } from '../../app/constants';
import Container from '../../app/layout/Container';
import EventKeywords from '../eventKeywords/EventKeywords';
import LocationText from '../eventLocation/EventLocationText';
import EventName from '../eventName/EventName';
import {
  getEventImageUrl,
  getEventPlaceholderImageUrl,
  getEventPrice,
  isEventFree,
} from '../EventUtils';
import styles from './eventHero.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const EventHero: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const [showBackupImage, setShowBackupImage] = React.useState(false);
  const locale = useLocale();
  const history = useHistory();
  const { search } = useLocation();

  const offerInfoUrl = React.useMemo(() => {
    const offer = event.offers.find((item) =>
      getLocalisedString(item.infoUrl || {}, locale)
    );

    return offer ? getLocalisedString(offer.infoUrl || {}, locale) : '';
  }, [event.offers, locale]);

  const goToEventList = () => {
    history.push({
      pathname: `/${locale}${ROUTES.EVENTS}`,
      search,
      state: { eventId: event.id },
    });
  };
  const moveToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

  const imageUrl = getEventImageUrl(event);
  const placeholderImage = getEventPlaceholderImageUrl(event);
  const description = event.shortDescription || {};
  const keywords = event.keywords;
  const startTime = event.startTime;
  const endTime = event.endTime;
  const today = startTime ? isToday(new Date(startTime)) : false;
  const thisWeek = startTime ? isThisWeek(new Date(startTime)) : false;

  const showBuyButton = !!offerInfoUrl && !isEventFree(event);

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
            <IconButton
              ariaLabel={t('event.hero.ariaLabelBackButton')}
              backgroundColor="white"
              icon={<IconArrowLeft />}
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
              <div className={styles.title}>
                <EventName event={event} />
              </div>
              <div className={styles.description}>
                {getLocalisedString(description, locale)}
              </div>
              <div className={classNames(styles.date, styles.desktopOnly)}>
                {!!startTime &&
                  getDateRangeStr(
                    startTime,
                    endTime,
                    locale,
                    true,
                    true,
                    t('commons.timeAbbreviation')
                  )}
              </div>

              <div
                className={classNames(
                  styles.location,
                  styles.infoWithIcon,
                  styles.desktopOnly
                )}
              >
                <div className={styles.iconWrapper}>
                  <IconLocation className={styles.icon} />
                </div>
                <div className={styles.iconTextWrapper}>
                  <LocationText
                    event={event}
                    showDistrict={false}
                    showLocationName={true}
                  />
                </div>
              </div>

              <div
                className={classNames(
                  styles.price,
                  styles.infoWithIcon,
                  styles.desktopOnly
                )}
              >
                <div className={styles.iconWrapper}>
                  <IconTicket className={styles.icon} />
                </div>
                <div className={styles.iconTextWrapper}>
                  {getEventPrice(
                    event,
                    locale,
                    t('event.hero.offers.isFree')
                  ) || '-'}
                </div>
              </div>
              {(today || thisWeek || (!!keywords && !!keywords.length)) && (
                <div className={styles.categoryWrapper}>
                  <EventKeywords
                    blackOnMobile={true}
                    event={event}
                    showIsFree={true}
                  />
                </div>
              )}
              {showBuyButton && (
                <div
                  className={classNames(
                    styles.buyButtonWrapper,
                    styles.desktopOnly
                  )}
                >
                  <Button
                    aria-label={t('event.hero.ariaLabelBuyTickets')}
                    onClick={moveToBuyTicketsPage}
                    variant="success"
                  >
                    {t('event.hero.buttonBuyTickets')}
                  </Button>
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
