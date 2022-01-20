import { IconArrowRight } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { EventFieldsFragment } from '../../../../generated/graphql';
import useLocale from '../../../../hooks/useLocale';
import getDateRangeStr from '../../../../util/getDateRangeStr';
import { ROUTES } from '../../../app/routes/constants';
import { getEventFields } from '../../EventUtils';
import { EventFields } from '../../types';
import styles from './eventList.module.scss';

const EventList: React.FC<{
  events: EventFields[];
  showDate?: Boolean;
  showName?: Boolean;
  id: string;
}> = ({ events, showDate = false, showName = false, id }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { search } = useLocation();

  const getLinkUrl = (event: EventFieldsFragment) => {
    return `/${locale}${ROUTES.EVENT.replace(':id', event.id)}${search}`;
  };

  return (
    <ul className={styles.timeList} data-testid={id}>
      {events.map((event) => {
        const { name } = getEventFields(event, locale);
        const date = event.startTime
          ? getDateRangeStr({
              start: event.startTime,
              end: event.endTime,
              includeTime: true,
              locale,
              timeAbbreviation: t('commons.timeAbbreviation'),
            })
          : '';
        return (
          <li key={event.id}>
            <Link
              to={getLinkUrl(event)}
              className={styles.listButton}
              aria-label={
                showDate
                  ? t('event.otherTimes.buttonReadMore', {
                      date,
                    })
                  : t('event.relatedEvents.buttonReadMore')
              }
            >
              <span>{`${showName ? name : ''} ${showDate ? date : ''}`}</span>
              <div className={styles.arrowContainer}>
                <IconArrowRight aria-hidden />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;
