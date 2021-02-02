import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../../app/layout/Container';
import NoResultsInfo from './NoResultsInfo';
import styles from './searchResultList.module.scss';

interface Props {
  loading: boolean;
  count: number;
  eventList: React.ReactElement;
}

const SearchResultsContainer: React.FC<Props> = ({
  loading,
  count,
  eventList,
}) => {
  const { t } = useTranslation();

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
          {eventList}
        </div>
      </Container>
    </div>
  );
};

export default SearchResultsContainer;
