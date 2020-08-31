import classNames from 'classnames';
import { IconAngleDown, IconArrowRight } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import IconButton from '../../../common/components/iconButton/IconButton';
import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import {
  EventFieldsFragment,
  useEventListQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getDateRangeStr from '../../../util/getDateRangeStr';
import { ROUTES } from '../../app/constants';
import { EVENT_SORT_OPTIONS } from '../../eventSearch/constants';
import { getCurrentHour, getNextPage } from '../../eventSearch/utils';
import { getEventIdFromUrl } from '../EventUtils';
import styles from './otherEventTimes.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const OtherEventTimes: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const { search } = useLocation();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const [isListOpen, setIsListOpen] = React.useState(false);

  const superEventId = React.useMemo(() => {
    return getEventIdFromUrl(
      (event.superEvent && event.superEvent.internalId) || ''
    );
  }, [event.superEvent]);

  const filters = React.useMemo(() => {
    return {
      include: ['keywords', 'location'],
      sort: EVENT_SORT_OPTIONS.START_TIME,
      startDate: getCurrentHour(),
      superEvent: superEventId,
    };
  }, [superEventId]);

  const { data: subEventsData, fetchMore, loading } = useEventListQuery({
    skip: !superEventId,
    ssr: false,
    variables: filters,
  });

  const handleLoadMore = React.useCallback(async () => {
    const page = getNextPage(subEventsData);
    setIsFetchingMore(true);
    if (page) {
      await fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const events = [
            ...prev.eventList.data,
            ...fetchMoreResult.eventList.data,
          ];
          fetchMoreResult.eventList.data = events;
          return fetchMoreResult;
        },
        variables: {
          ...filters,
          page: page,
        },
      });
    }
    setIsFetchingMore(false);
  }, [fetchMore, filters, subEventsData]);

  React.useEffect(() => {
    if (subEventsData && subEventsData.eventList.meta.next) {
      handleLoadMore();
    }
  }, [handleLoadMore, subEventsData]);

  if (!superEventId) return null;

  const subEvents = subEventsData
    ? subEventsData.eventList.data.filter(
        (subEvent) => subEvent.id !== event.id
      )
    : [];

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <div className={styles.otherEventTimes}>
      <button
        className={classNames(styles.toggleButton, {
          [styles.isListOpen]: isListOpen,
        })}
        onClick={toggleList}
      >
        <span>{t('event.otherTimes.title')}</span>
        <IconAngleDown />
      </button>
      {isListOpen && (
        <>
          <ul className={styles.timeList}>
            {subEvents.map((subEvent) => {
              const moveToEventPage = () => {
                const eventUrl = `/${locale}${ROUTES.EVENT.replace(
                  ':id',
                  subEvent.id
                )}${search}`;
                history.push(eventUrl);
              };
              return (
                <li key={subEvent.id}>
                  <span>
                    {!!subEvent.startTime &&
                      getDateRangeStr(
                        subEvent.startTime,
                        subEvent.endTime,
                        locale,
                        true,
                        true,
                        t('commons.timeAbbreviation')
                      )}
                  </span>
                  <IconButton
                    ariaLabel={t('event.otherTimes.buttonReadMore')}
                    icon={<IconArrowRight />}
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
