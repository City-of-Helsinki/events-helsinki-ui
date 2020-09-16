import classNames from 'classnames';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../domain/app/constants';
import EventKeywords from '../../../domain/event/eventKeywords/EventKeywords';
import LocationText from '../../../domain/event/eventLocation/EventLocationText';
import EventName from '../../../domain/event/eventName/EventName';
import {
  getEventImageUrl,
  getEventPlaceholderImageUrl,
  getEventPrice,
  isEventClosed,
  isEventFree,
} from '../../../domain/event/EventUtils';
import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getDateRangeStr from '../../../util/getDateRangeStr';
import getLocalisedString from '../../../util/getLocalisedString';
import testImage from '../../../util/testImage';
import buttonStyles from '../button/button.module.scss';
import styles from './largeEventCard.module.scss';
import { getLargeEventCardId } from './utils';

interface Props {
  event: EventFieldsFragment;
}

const LargeEventCard: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const [showBackupImage, setShowBackupImage] = React.useState(false);
  const { search } = useLocation();
  const locale = useLocale();
  const eventClosed = isEventClosed(event);

  const offerInfoUrl = React.useMemo(() => {
    const offer = event.offers.find((item) =>
      getLocalisedString(item.infoUrl || {}, locale)
    );

    return offer ? getLocalisedString(offer.infoUrl || {}, locale) : '';
  }, [event.offers, locale]);

  const moveToBuyTicketsPage = React.useCallback(() => {
    window.open(offerInfoUrl);
  }, [offerInfoUrl]);

  const eventUrl = React.useMemo(() => {
    return `/${locale}${ROUTES.EVENT.replace(':id', event.id)}${search}`;
  }, [event.id, locale, search]);

  const moveToEventPage = () => {
    push(eventUrl);
  };

  const imageUrl = getEventImageUrl(event);
  const placeholderImage = getEventPlaceholderImageUrl(event);
  const startTime = event.startTime;
  const endTime = event.endTime;

  const showBuyButton = !eventClosed && !!offerInfoUrl && !isEventFree(event);

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
    <Link
      className={classNames(styles.eventCard, {
        [styles.eventClosed]: eventClosed,
      })}
      id={getLargeEventCardId(event.id)}
      to={eventUrl}
    >
      {/* INFO WRAPPER. Re-order info wrapper and text wrapper on css */}
      <div className={styles.infoWrapper}>
        <div className={styles.eventName}>
          <EventName event={event} />
        </div>
        <div className={styles.eventDateAndTime}>
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
        <div className={styles.eventLocation}>
          <LocationText
            event={event}
            showDistrict={false}
            showLocationName={true}
          />
        </div>
        <div className={styles.eventPrice}>
          {getEventPrice(event, locale, t('eventSearch.event.offers.isFree'))}
        </div>
        <div className={styles.keywordWrapperDesktop}>
          <EventKeywords
            event={event}
            hideKeywordsOnMobile={true}
            showIsFree={true}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <div>
            {showBuyButton && (
              <Button
                aria-label={t('eventSearch.event.ariaLabelBuyTickets')}
                fullWidth
                onClick={moveToBuyTicketsPage}
                size="small"
                variant="success"
              >
                {t('eventSearch.event.buttonBuyTickets')}
              </Button>
            )}
          </div>
          <div>
            <Button
              className={buttonStyles.buttonGray}
              fullWidth
              onClick={moveToEventPage}
              size="small"
            >
              {t('eventSearch.event.buttonReadMore')}
            </Button>
          </div>
        </div>
      </div>

      {/* IMAGE WRAPPER */}
      <div
        className={styles.imageWrapper}
        style={{
          backgroundImage: `url(${
            showBackupImage ? placeholderImage : imageUrl
          })`,
        }}
      >
        <div className={styles.keywordWrapper}>
          <EventKeywords
            event={event}
            hideKeywordsOnMobile={true}
            showIsFree={true}
          />
        </div>
      </div>
    </Link>
  );
};

export default LargeEventCard;
