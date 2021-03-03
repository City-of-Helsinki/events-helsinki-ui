import classNames from 'classnames';
import { IconAngleDown, IconArrowRight } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import IconButton from '../../../common/components/iconButton/IconButton';
import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import {
  EventFieldsFragment,
  EventListQueryVariables,
  useEventListQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getDateRangeStr from '../../../util/getDateRangeStr';
import { ROUTES } from '../../app/routes/constants';
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

  const superEventId = React.useMemo(
    () => getEventIdFromUrl(event.superEvent?.internalId || ''),
    [event.superEvent]
  );

  const variables = React.useMemo(() => {
    const vars: EventListQueryVariables = {
      include: ['keywords', 'location'],
      sort: EVENT_SORT_OPTIONS.START_TIME,
      start: getCurrentHour(),
      superEvent: superEventId,
    };
    return vars;
  }, [superEventId]);

  const { data: subEventsData, fetchMore, loading } = useEventListQuery({
    skip: !superEventId,
    ssr: false,
    variables,
  });

  const handleLoadMore = React.useCallback(
    async (page: number) => {
      setIsFetchingMore(true);

      try {
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
            ...variables,
            page: page,
          },
        });
      } catch (e) {
        toast.error(t('event.info.errorLoadMode'));
      }
      setIsFetchingMore(false);
    },
    [fetchMore, t, variables]
  );

  React.useEffect(() => {
    const page = subEventsData?.eventList.meta
      ? getNextPage(subEventsData.eventList.meta)
      : null;

    if (page) {
      handleLoadMore(page);
    }
  }, [handleLoadMore, subEventsData]);

  const subEvents =
    subEventsData?.eventList.data.filter(
      (subEvent) => subEvent.id !== event.id
    ) || [];

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  if (!superEventId) return null;

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
              const date = subEvent.startTime
                ? getDateRangeStr({
                    start: subEvent.startTime,
                    end: subEvent.endTime,
                    includeTime: true,
                    locale,
                    timeAbbreviation: t('commons.timeAbbreviation'),
                  })
                : '';
              return (
                <li key={subEvent.id}>
                  <span>{date}</span>
                  <IconButton
                    ariaLabel={t('event.otherTimes.buttonReadMore', {
                      date,
                    })}
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
