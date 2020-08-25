import React from 'react';

import useLocale from '../../hooks/useLocale';
import PageWrapper from '../app/layout/PageWrapper';
import styles from './aboutPage.module.scss';
import AboutPageEn from './AboutPageEn';
import AboutPageFi from './AboutPageFi';
import AboutPageSv from './AboutPageSv';

const AboutPage: React.FC = () => {
  const locale = useLocale();

  const getLocaleAboutPage = () => {
    switch (locale) {
      case 'en':
        return <AboutPageEn />;
      case 'fi':
        return <AboutPageFi />;
      case 'sv':
        return <AboutPageSv />;
    }
  };
  return (
    <PageWrapper className={styles.aboutPage} title="about.title">
      {getLocaleAboutPage()}
    </PageWrapper>
  );
};

export default AboutPage;
