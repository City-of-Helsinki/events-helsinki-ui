import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { EventListQuery } from '../../../generated/graphql';
import Container from '../../app/layout/Container';
import EventList from './EventList';
import NoResultsInfo from './NoResultsInfo';
import styles from './searchResultList.module.scss';

interface Props {
  eventsData: EventListQuery;
  loading: boolean;
  onLoadMore: () => void;
  showCount?: boolean;
}

const SearchResultList: React.FC<Props> = ({
  eventsData,
  loading,
  onLoadMore,
}) => {
  const { t } = useTranslation();
  const count = eventsData.eventList.meta.count;

  return (
    <div className={styles.searchResultListContainer}>
      <Container>
        <div className={classNames(styles.searchResultWrapper)}>
          <h2 className={styles.count}>
            {t('eventSearch.textFoundEvents', {
              count,
            })}
          </h2>
          {!count && !loading && <NoResultsInfo />}
          <EventList
            cardSize="large"
            eventsData={eventsData}
            loading={loading}
            onLoadMore={onLoadMore}
          />
        </div>
      </Container>
    </div>
  );
};

export default SearchResultList;
