import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ShareLinks from '../../../common/components/shareLinks/ShareLinks';
import useLocale from '../../../hooks/useLocale';
import sanitizeHtml from '../../../util/sanitizeHtml';
import Container from '../../app/layout/Container';
import { EVENT_LOCATIONS } from '../constants';
import EventInfo from '../eventInfo/EventInfo';
import EventLocation from '../eventLocation/EventLocation';
import { getEventFields } from '../EventUtils';
import { EventFields, SuperEventResponse } from '../types';
import styles from './eventContent.module.scss';

interface Props {
  event: EventFields;
  superEvent?: SuperEventResponse;
}

const EventContent: React.FC<Props> = ({ event, superEvent }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { description, photographerName } = getEventFields(event, locale);

  const isInternetEvent = event?.location?.id === EVENT_LOCATIONS.INTERNET;

  return (
    <div className={styles.eventContent}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.infoColumn}>
            <EventInfo event={event} superEvent={superEvent} />
          </div>
          <div className={styles.descriptionColumn}>
            {description && (
              <>
                <h2 className={styles.descriptionTitle}>
                  {t('event.description.title')}
                </h2>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(description),
                  }}
                />
                {photographerName && (
                  <p>
                    {t('commons.photographerText', {
                      photographer: photographerName,
                    })}
                  </p>
                )}
              </>
            )}
            <ShareLinks title={t('event.shareLinks.title')} />
            <div
              className={classNames(
                styles.horizontalDivider,
                styles.largeWhiteSpace
              )}
            />
            {!isInternetEvent && <EventLocation event={event} />}
          </div>
          {/* Dummy div to keep layout consistent with EventHero */}
          <div />
        </div>
      </Container>
    </div>
  );
};

export default EventContent;
