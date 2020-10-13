import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ShareLinks from '../../../common/components/shareLinks/ShareLinks';
import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import sanitizeHtml from '../../../util/sanitizeHtml';
import Container from '../../app/layout/Container';
import EventInfo from '../eventInfo/EventInfo';
import EventLocation from '../eventLocation/EventLocation';
import { getEventFields } from '../EventUtils';
import styles from './eventContent.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const EventContent: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { description } = getEventFields(event, locale);

  return (
    <div className={styles.eventContent}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.infoColumn}>
            <EventInfo event={event} />
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
              </>
            )}
            <ShareLinks title={t('event.shareLinks.title')} />
            <div
              className={classNames(
                styles.horizontalDivider,
                styles.largeWhiteSpace
              )}
            />
            <EventLocation event={event} />
          </div>
          {/* Dummy div to keep layout consistent with EventHero */}
          <div></div>
        </div>
      </Container>
    </div>
  );
};

export default EventContent;
