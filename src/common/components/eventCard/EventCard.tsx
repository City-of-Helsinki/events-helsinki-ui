import classNames from 'classnames';
import { IconArrowRight } from 'hds-react';
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
} from '../../../domain/event/EventUtils';
import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getDateRangeStr from '../../../util/getDateRangeStr';
import getLocalisedString from '../../../util/getLocalisedString';
import testImage from '../../../util/testImage';
import IconButton from '../iconButton/IconButton';
import styles from './eventCard.module.scss';
import { getEventCardId } from './utils';

interface Props {
  event: EventFieldsFragment;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const history = useHistory();
  const { search } = useLocation();
  const { t } = useTranslation();
  const [showBackupImage, setShowBackupImage] = React.useState(false);
  const locale = useLocale();

  const imageUrl = getEventImageUrl(event);
  const placeholderImage = getEventPlaceholderImageUrl(event);
  const name = event.name;
  const startTime = event.startTime;
  const endTime = event.endTime;

  const eventUrl = React.useMemo(() => {
    return `/${locale}${ROUTES.EVENT.replace(':id', event.id)}${search}`;
  }, [event.id, locale, search]);

  const eventClosed = isEventClosed(event);

  const goToEventPage = () => {
    history.push(eventUrl);
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
    <Link
      aria-label={t('commons.eventCard.ariaLabelLink', {
        name: getLocalisedString(name, locale),
      })}
      className={classNames(styles.eventCard, {
        [styles.eventClosed]: eventClosed,
      })}
      id={getEventCardId(event.id)}
      to={eventUrl}
    >
      {/* INFO WRAPPER. Re-order info wrapper and text wrapper on css */}
      <div className={styles.infoWrapper}>
        <div className={styles.textWrapper}>
          <div className={styles.eventName}>
            <EventName event={event} />
          </div>
          <div className={styles.eventDateAndTime}>
            {!!startTime &&
              getDateRangeStr(
                startTime,
                endTime,
                locale,
                false,
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

          <div className={styles.keywordWrapperMobile}>
            <EventKeywords
              event={event}
              showIsFree={true}
              showKeywords={false}
            />
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <IconButton
            ariaLabel={t('commons.eventCard.ariaLabelLink', {
              name: getLocalisedString(name, locale),
            })}
            icon={<IconArrowRight />}
            onClick={goToEventPage}
            size="default"
          />
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
        <div className={styles.keywordWrapperDesktop}>
          <EventKeywords event={event} showIsFree={true} showKeywords={false} />
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
