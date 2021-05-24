import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../../app/layout/Container';
import { EventType } from '../../event/types';
import ResultsInfoContainer from './ResultsInfo';
import styles from './searchResultList.module.scss';

interface Props {
  loading: boolean;
  eventsCount: number;
  eventList: React.ReactElement;
  eventType: EventType;
}

const SearchResultsContainer: React.FC<Props> = ({
  loading,
  eventsCount,
  eventList,
  eventType,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.searchResultListContainer}>
      <Container>
        <div className={classNames(styles.searchResultWrapper)}>
          <h2 className={styles.count}>
            {t('eventSearch.textFoundEvents', {
              count: eventsCount,
            })}
          </h2>
          {!!eventsCount && eventList}
          {!loading && (
            <ResultsInfoContainer
              resultsCount={eventsCount}
              eventType={eventType}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default SearchResultsContainer;
