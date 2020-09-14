import React from 'react';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import Hero from '../../common/components/staticPageHero/StaticPageHero';
import { useAccessibilityPagesQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import sanitizeHtml from '../../util/sanitizeHtml';
import Container from '../app/layout/Container';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import styles from './accessibilityPage.module.scss';

const AboutPage: React.FC = () => {
  const locale = useLocale();
  const { data, loading } = useAccessibilityPagesQuery();

  const accessibilityPage = data?.accessibilityPages.data.find(
    (page) =>
      !page.expired &&
      (page.contentSection?.[locale] || page.headingSection?.[locale])
  );
  const headingSection = accessibilityPage?.headingSection?.[locale];
  const contentSection = accessibilityPage?.contentSection?.[locale];

  return (
    <PageWrapper
      className={styles.accessibilityPage}
      title="accessibility.title"
    >
      <MainContent offset={-70}>
        <LoadingSpinner isLoading={loading}>
          {headingSection && (
            <Hero>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(headingSection),
                }}
              />
            </Hero>
          )}
          {contentSection && (
            <Container>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(contentSection),
                }}
              />
            </Container>
          )}
        </LoadingSpinner>
      </MainContent>
    </PageWrapper>
  );
};

export default AboutPage;
