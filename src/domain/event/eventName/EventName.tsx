import React from 'react';
import { useTranslation } from 'react-i18next';

import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getEventFields, isEventCancelled } from '../EventUtils';
import styles from './eventName.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const EventName: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { name } = getEventFields(event, locale);
  const isCancelled = isEventCancelled(event);

  return (
    <>
      {isCancelled && (
        <span className={styles.eventCancelled}>
          {t('event.eventCancelled')}
          {': '}
        </span>
      )}
      {name}
    </>
  );
};

export default EventName;
