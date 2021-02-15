import classNames from 'classnames';
import { IconArrowRight } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import IconButton from '../../../common/components/iconButton/IconButton';
import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getDateRangeStr from '../../../util/getDateRangeStr';
import { addEntryToQueryString } from '../../../util/queryString';
import testImage from '../../../util/testImage';
import { ROUTES } from '../../app/routes/constants';
import EventKeywords from '../eventKeywords/EventKeywords';
import LocationText from '../eventLocation/EventLocationText';
import EventName from '../eventName/EventName';
import {
  getEventCardId,
  getEventFields,
  getEventPrice,
  isEventClosed,
} from '../EventUtils';
import styles from './eventCard.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const history = useHistory();
  const { search, pathname } = useLocation();
  const { t } = useTranslation();
  const [showBackupImage, setShowBackupImage] = React.useState(false);
  const locale = useLocale();
  const button = React.useRef<HTMLDivElement>(null);

  const {
    endTime,
    id,
    imageUrl,
    name,
    placeholderImage,
    startTime,
  } = getEventFields(event, locale);

  const queryString = addEntryToQueryString(search, {
    param: 'returnPath',
    value: pathname,
  });
  const eventUrl = `/${locale}${ROUTES.EVENT.replace(':id', id)}${queryString}`;
  const eventClosed = isEventClosed(event);
  const eventPriceText = getEventPrice(
    event,
    locale,
    t('event.eventCard.isFree')
  );

  const handleLinkClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const target = ev.target;

    if (button.current?.contains(target as Node)) {
      ev.preventDefault();
    }
  };

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
      aria-label={t('event.eventCard.ariaLabelLink', {
        name,
      })}
      className={classNames(styles.eventCard, {
        [styles.eventClosed]: eventClosed,
      })}
      id={getEventCardId(id)}
      data-testid={event.id}
      onClick={handleLinkClick}
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
              getDateRangeStr({
                start: startTime,
                end: endTime,
                locale,
                includeWeekday: false,
                includeTime: true,
                timeAbbreviation: t('commons.timeAbbreviation'),
              })}
          </div>
          <div className={styles.eventLocation}>
            <LocationText
              event={event}
              showDistrict={false}
              showLocationName={true}
            />
          </div>
          <div className={styles.eventPrice}>{eventPriceText}</div>

          <div className={styles.keywordWrapperMobile}>
            <EventKeywords
              event={event}
              showIsFree={true}
              showKeywords={false}
            />
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <div ref={button}>
            <IconButton
              ariaLabel={t('event.eventCard.ariaLabelLink', {
                name,
              })}
              icon={<IconArrowRight />}
              onClick={goToEventPage}
              size="default"
            />
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
        <div className={styles.keywordWrapperDesktop}>
          <EventKeywords event={event} showIsFree={true} showKeywords={false} />
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
