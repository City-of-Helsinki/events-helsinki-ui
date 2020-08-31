import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './previewBanner.module.scss';

const PreviewBanner: React.FC = () => {
  const { t } = useTranslation();
  return <div className={styles.previewBanner}>{t('commons.preview')}</div>;
};

export default PreviewBanner;
