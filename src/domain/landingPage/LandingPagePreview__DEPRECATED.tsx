import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';

import ErrorHero from '../../common/components/error/ErrorHero';
import PreviewBanner from '../../common/components/previewBanner/PreviewBanner';
import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import { useLandingPageQuery } from '../../generated/graphql';
import Container from '../app/layout/Container';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import BannerHero from '../banner/bannerHero/BannerHero';
import LandingPageMeta from './landingPageMeta/LandingPageMeta';
import Search from './landingPageSearch/LandingPageSearch__DEPRECATED';

interface RouteParams {
  id: string;
}

const LandingPagePreview: React.FC = () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const params = useParams<RouteParams>();
  const urlSearchParams = new URLSearchParams(search);
  const draft = urlSearchParams.get('draft') === 'true';

  const { data: landingPageData, loading } = useLandingPageQuery({
    variables: { draft, id: params.id },
  });
  const landingPage = landingPageData?.landingPage;
  return (
    <PageWrapper>
      <LoadingSpinner isLoading={loading}>
        {!!landingPage ? (
          <>
            <LandingPageMeta landingPage={landingPage} />
            <PreviewBanner />
            {landingPage.topBanner && (
              <BannerHero banner={landingPage.topBanner} location="top" />
            )}
            <MainContent offset={-150}>
              <Container>
                <Search />
              </Container>
            </MainContent>
            {landingPage.bottomBanner && (
              <BannerHero banner={landingPage.bottomBanner} location="bottom" />
            )}
          </>
        ) : (
          <ErrorHero
            text={t('home.notFound.text')}
            title={t('home.notFound.title')}
          />
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default LandingPagePreview;
