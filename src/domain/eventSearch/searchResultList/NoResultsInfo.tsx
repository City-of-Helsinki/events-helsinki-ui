import { IconSearch } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './noResultsInfo.module.scss';

const NoResultsInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.noResultsInfo}>
      <div className={styles.iconWrapper}>
        <IconSearch aria-hidden/>
      </div>
      <div className={styles.bigText}>
        {t('eventSearch.noResultsInfo.bigText')}
      </div>
      <div className={styles.smallText}>
        {t('eventSearch.noResultsInfo.smallText')}
      </div>
    </div>
  );
};

export default NoResultsInfo;
