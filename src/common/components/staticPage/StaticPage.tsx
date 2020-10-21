import React from 'react';

import Container from '../../../domain/app/layout/Container';
import { StaticPageFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import sanitizeHtml from '../../../util/sanitizeHtml';
import Hero from '../staticPageHero/StaticPageHero';
import StaticPageMeta from '../staticPageMeta/StaticPageMeta';
import styles from './staticPage.module.scss';

interface Props {
  staticPage: StaticPageFieldsFragment;
}

const StaticPage: React.FC<Props> = ({ staticPage }) => {
  const locale = useLocale();
  const headingSection = staticPage.headingSection?.[locale];
  const contentSection = staticPage.contentSection?.[locale];

  return (
    <div className={styles.staticPage}>
      <StaticPageMeta staticPage={staticPage} />
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
    </div>
  );
};

export default StaticPage;
