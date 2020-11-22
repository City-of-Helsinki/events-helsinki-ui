import React from 'react';
import { useTranslation } from 'react-i18next';

import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import styles from './search.module.scss';

const Search: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <div className={styles.searchContainer}>
      <Container></Container>
    </div>
  );
};

export default Search;
