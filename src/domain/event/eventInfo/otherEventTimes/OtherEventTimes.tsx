import classNames from 'classnames';
import { IconAngleDown, IconArrowRight } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import IconButton from '../../../../common/components/iconButton/IconButton';
import LoadingSpinner from '../../../../common/components/spinner/LoadingSpinner';
import useLocale from '../../../../hooks/useLocale';
import getDateRangeStr from '../../../../util/getDateRangeStr';
import { EVENT_ROUTE_MAPPER, EventFields, EventType } from '../../types';
import styles from './otherEventTimes.module.scss';

interface Props {
  isFetchingMore: boolean;
  superEventId: string;
  loading: boolean;
  events: EventFields[];
  eventType: EventType;
}

const OtherEventTimes: React.FC<Props> = ({
  events,
  loading,
  isFetchingMore,
  superEventId,
  eventType,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const { search } = useLocation();
  const [isListOpen, setIsListOpen] = React.useState(false);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  if (!superEventId || events.length === 0) return null;

  return (
    <div className={styles.otherEventTimes}>
      <button
        className={classNames(styles.toggleButton, {
          [styles.isListOpen]: isListOpen,
        })}
        onClick={toggleList}
        aria-label={
          isListOpen
            ? t('event.otherTimes.buttonHide')
            : t('event.otherTimes.buttonShow')
        }
      >
        <span>{t('event.otherTimes.title')}</span>
        <IconAngleDown aria-hidden />
      </button>
      {isListOpen && (
        <>
          <ul className={styles.timeList}>
            {events.map((event) => {
              const moveToEventPage = () => {
                const eventUrl = `/${locale}${EVENT_ROUTE_MAPPER[
                  eventType
                ].replace(':id', event.id)}${search}`;
                history.push(eventUrl);
              };
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
                  <span>{date}</span>
                  <IconButton
                    ariaLabel={t('event.otherTimes.buttonReadMore', {
                      date,
                    })}
                    icon={<IconArrowRight aria-hidden />}
                    onClick={moveToEventPage}
                    size="small"
                  />
                </li>
              );
            })}
          </ul>
          <LoadingSpinner
            hasPadding={false}
            isLoading={loading || isFetchingMore}
          />
        </>
      )}
    </div>
  );
};

export default OtherEventTimes;
