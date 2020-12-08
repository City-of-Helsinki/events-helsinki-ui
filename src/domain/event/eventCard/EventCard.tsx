import classNames from 'classnames';
import { IconArrowRight } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import IconButton from '../../../common/components/iconButton/IconButton';
import useLocale from '../../../hooks/useLocale';
import getDateRangeStr from '../../../util/getDateRangeStr';
import testImage from '../../../util/testImage';
import EventKeywords from '../eventKeywords/EventKeywords';
import LocationText from '../eventLocation/EventLocationText';
import EventName from '../eventName/EventName';
import {
  getEventCardId,
  getEventFields,
  getEventPrice,
  isEventClosed,
} from '../EventUtils';
import { EventFields } from '../types';
import styles from './eventCard.module.scss';
import { EVENT_ROUTE_MAPPER, EVENTS_ROUTE_MAPPER, EventType } from './types';
import { addPlaceFromPathToQueryString } from './utils';

interface Props {
  event: EventFields;
  eventType?: EventType;
}

const EventCard: React.FC<Props> = ({ event, eventType = EventType.EVENT }) => {
  const history = useHistory();
  const { search } = useLocation();
  const { t } = useTranslation();
  // place comes from place param in clean url on events search page
  // see ROUTES.EVENT_PLACE (routes/constants.ts)
  const params = useParams<{ place?: string }>();
  const [showBackupImage, setShowBackupImage] = React.useState(false);
  const locale = useLocale();
  const button = React.useRef<HTMLDivElement>(null);
  const eventRoute = EVENT_ROUTE_MAPPER[eventType];
  const eventsRoute = EVENTS_ROUTE_MAPPER[eventType];

  const {
    endTime,
    id,
    imageUrl,
    name,
    placeholderImage,
    startTime,
  } = getEventFields(event, locale);
  const modifiedSearch = addPlaceFromPathToQueryString(search, params.place);
  const eventUrl = `/${locale}${eventRoute.replace(
    ':id',
    id
  )}${modifiedSearch}`;
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
              eventsRoute={eventsRoute}
            />
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <div ref={button}>
            <IconButton
              ariaLabel={t('event.eventCard.ariaLabelLink', {
                name,
              })}
              icon={<IconArrowRight aria-hidden />}
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
          <EventKeywords
            event={event}
            showIsFree={true}
            showKeywords={false}
            eventsRoute={eventsRoute}
          />
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
