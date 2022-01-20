import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../../app/layout/Container';
import ResultsInfoContainer from './ResultsInfo';
import styles from './searchResultList.module.scss';

interface Props {
  loading: boolean;
  eventsCount: number;
  eventList: React.ReactElement;
}

const SearchResultsContainer: React.FC<Props> = ({
  loading,
  eventsCount,
  eventList,
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
          {!loading && <ResultsInfoContainer resultsCount={eventsCount} />}
        </div>
      </Container>
    </div>
  );
};

export default SearchResultsContainer;
