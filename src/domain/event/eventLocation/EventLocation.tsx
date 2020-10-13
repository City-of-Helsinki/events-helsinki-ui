import { IconAngleRight, IconLinkExternal, IconLocation } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getEventFields, getServiceMapUrl } from '../EventUtils';
import styles from './eventLocation.module.scss';
import LocationText from './EventLocationText';

interface Props {
  event: EventFieldsFragment;
}

const EventLocation: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { googleDirectionsLink, hslDirectionsLink, name } = getEventFields(
    event,
    locale
  );

  return (
    <div className={styles.eventLocationContainer}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <IconLocation />
          <h2>{t('event.location.title')}</h2>
        </div>
        <a
          className={styles.mapLink}
          href={getServiceMapUrl(event, locale, false)}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t('event.location.openMap')}
          <IconLinkExternal size="xs" />
        </a>
      </div>

      <iframe
        title={t('event.location.mapTitle')}
        className={styles.mapContainer}
        src={getServiceMapUrl(event, locale, true)}
      ></iframe>

      <div className={styles.eventName}>{name}</div>
      <div className={styles.location}>
        <LocationText
          event={event}
          showDistrict={true}
          showLocationName={false}
        />
      </div>
      <a
        className={styles.directionsLink}
        href={googleDirectionsLink}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('event.location.directionsGoogle')}
        <IconAngleRight />
      </a>
      <a
        className={styles.directionsLink}
        href={hslDirectionsLink}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('event.location.directionsHSL')}
        <IconAngleRight />
      </a>
    </div>
  );
};

export default EventLocation;
