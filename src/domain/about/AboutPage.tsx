import React from 'react';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import StaticPage from '../../common/components/staticPage/StaticPage';
import { useAboutPagesQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';

const AboutPage: React.FC = () => {
  const locale = useLocale();
  const { data, loading } = useAboutPagesQuery();

  const aboutPage = data?.aboutPages.data.find(
    (page) =>
      !page.expired &&
      (page.contentSection?.[locale] || page.headingSection?.[locale])
  );

  return (
    <PageWrapper title="about.title">
      <MainContent offset={-70}>
        <LoadingSpinner isLoading={loading}>
          {aboutPage && <StaticPage staticPage={aboutPage} />}
        </LoadingSpinner>
      </MainContent>
    </PageWrapper>
  );
};

export default AboutPage;
