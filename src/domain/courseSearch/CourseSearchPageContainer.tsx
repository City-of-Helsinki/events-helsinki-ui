import React from 'react';
import { useTranslation } from 'react-i18next';

import SrOnly from '../../common/components/srOnly/SrOnly';
import PageWrapper from '../app/layout/PageWrapper';
import styles from './courseSearchPageContainer.module.scss';

const CourseSearchPageContainer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper
      title={t('courseSearch.title')}
      className={styles.courseSearchPageContainer}
    >
      <SrOnly as="h1">{t('courseSearch.title')}</SrOnly>
      <div>Moi</div>
    </PageWrapper>
  );
};

export default CourseSearchPageContainer;
