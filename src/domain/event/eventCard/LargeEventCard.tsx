import classNames from 'classnames';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import buttonStyles from '../../../common/components/button/button.module.scss';
import useLocale from '../../../hooks/useLocale';
import getDateRangeStr from '../../../util/getDateRangeStr';
import testImage from '../../../util/testImage';
import EventKeywords from '../eventKeywords/EventKeywords';
import LocationText from '../eventLocation/EventLocationText';
import EventName from '../eventName/EventName';
import {
  getEventFields,
  getEventPrice,
  getLargeEventCardId,
  isEventClosed,
  isEventFree,
} from '../EventUtils';
import {
  EVENT_ROUTE_MAPPER,
  EventFields,
  EVENTS_ROUTE_MAPPER,
  EventType,
} from '../types';
import styles from './largeEventCard.module.scss';
import { addPlaceFromPathToQueryString } from './utils';

interface Props {
  event: EventFields;
  eventType?: EventType;
}

const LargeEventCard: React.FC<Props> = ({ event, eventType = 'event' }) => {
  const { t } = useTranslation();
  const { push } = useHistory();
  // place comes from place param in clean url on events search page
  // see ROUTES.EVENT_PLACE (routes/constants.ts)
  const params = useParams<{ place?: string }>();
  const [showBackupImage, setShowBackupImage] = React.useState(false);
  const { search } = useLocation();
  const locale = useLocale();
  const button = React.useRef<HTMLDivElement>(null);
  const eventRoute = EVENT_ROUTE_MAPPER[eventType];
  const eventsRoute = EVENTS_ROUTE_MAPPER[eventType];

  const {
    endTime,
    imageUrl,
    name,
    offerInfoUrl,
    placeholderImage,
    startTime,
  } = getEventFields(event, locale);
  const eventClosed = isEventClosed(event);
  const modifiedSearch = addPlaceFromPathToQueryString(search, params.place);
  const eventUrl = `/${locale}${eventRoute.replace(
    ':id',
    event.id
  )}${modifiedSearch}`;
  const showBuyButton = !eventClosed && !!offerInfoUrl && !isEventFree(event);

  const goToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

  const handleLinkClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const target = ev.target;
    if (button.current?.contains(target as Node)) {
      ev.preventDefault();
    }
  };

  const goToEventPage = (ev: React.MouseEvent<HTMLButtonElement>) => {
    push(eventUrl);
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
      id={getLargeEventCardId(event.id)}
      onClick={handleLinkClick}
      to={eventUrl}
    >
      {/* INFO WRAPPER. Re-order info wrapper and text wrapper on css */}
      <div className={styles.infoWrapper}>
        <div className={styles.eventName}>
          <EventName event={event} />
        </div>
        <div className={styles.eventDateAndTime}>
          {!!startTime &&
            getDateRangeStr({
              start: startTime,
              end: endTime,
              locale,
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
        <div className={styles.eventPrice}>
          {getEventPrice(event, locale, t('event.eventCard.isFree'))}
        </div>
        <div className={styles.keywordWrapperDesktop}>
          <EventKeywords
            event={event}
            hideKeywordsOnMobile={true}
            showIsFree={true}
            eventsRoute={eventsRoute}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <div>
            {showBuyButton && (
              <Button
                aria-label={t('event.eventCard.ariaLabelBuyTickets')}
                fullWidth
                onClick={goToBuyTicketsPage}
                size="small"
                variant="success"
              >
                {t('event.eventCard.buttonBuyTickets')}
              </Button>
            )}
          </div>
          <div ref={button}>
            <Button
              aria-label={t('event.eventCard.ariaLabelReadMore', { name })}
              className={buttonStyles.buttonGray}
              fullWidth
              onClick={goToEventPage}
              size="small"
              type="button"
            >
              {t('event.eventCard.buttonReadMore')}
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
            eventsRoute={eventsRoute}
          />
        </div>
      </div>
    </Link>
  );
};

export default LargeEventCard;
