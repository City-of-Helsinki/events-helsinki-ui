import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { MAIN_CONTENT_ID } from '../../../constants';
import styles from './skipLink.module.scss';

const SkipLink: React.FC = () => {
  const { t } = useTranslation();
  const { search, pathname } = useLocation();

  return (
    <Link
      className={styles.skipLink}
      to={{
        pathname,
        hash: `#${MAIN_CONTENT_ID}`,
        search,
        state: { toMainContent: true },
      }}
    >
      {t('commons.linkSkipToContent')}
    </Link>
  );
};

export default SkipLink;
