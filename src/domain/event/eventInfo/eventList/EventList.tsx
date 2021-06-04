import { IconArrowRight } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import useLocale from '../../../../hooks/useLocale';
import getDateRangeStr from '../../../../util/getDateRangeStr';
import { getEventTypeByEventTypeId } from '../../EventUtils';
import { EVENT_ROUTE_MAPPER, EventFields, EventType } from '../../types';
import styles from './eventList.module.scss';

export const Eventlist: React.FC<{
  events: EventFields[];
  eventType: EventType;
  id: string;
}> = ({ events, eventType, id }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const { search } = useLocation();

  const moveToEventPage = (eventId: string) => {
    const eventUrl = `/${locale}${EVENT_ROUTE_MAPPER[eventType].replace(
      ':id',
      eventId
    )}${search}`;
    history.push(eventUrl);
  };
  return (
    <ul className={styles.timeList} data-testid={id}>
      {events.map((event) => {
        return (
          <li key={event.id}>
            <button
              className={styles.listButton}
              onClick={() => moveToEventPage(event.id)}
              aria-label={t('event.relatedEvents.buttonReadMore')}
            >
              <span>{event.name.fi}</span>
              <div className={styles.arrowContainer}>
                <IconArrowRight aria-hidden />
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export const EventTimeList: React.FC<{
  events: EventFields[];
  id: string;
}> = ({ events, id }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const { search } = useLocation();

  const moveToEventPage = (eventId: string, eventType: EventType) => {
    const eventUrl = `/${locale}${EVENT_ROUTE_MAPPER[eventType].replace(
      ':id',
      eventId
    )}${search}`;
    history.push(eventUrl);
  };
  return (
    <ul className={styles.timeList} data-testid={id}>
      {events.map((event) => {
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
            <button
              className={styles.listButton}
              // Events can have different event type id than it's super event or sibling has - purposely or accidentally.
              onClick={() =>
                moveToEventPage(
                  event.id,
                  event?.typeId
                    ? getEventTypeByEventTypeId(event.typeId)
                    : 'event'
                )
              }
              aria-label={t('event.otherTimes.buttonReadMore', {
                date,
              })}
            >
              <span>{date}</span>
              <div className={styles.arrowContainer}>
                <IconArrowRight aria-hidden />
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
