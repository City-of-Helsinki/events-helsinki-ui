import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';

import ErrorHero from '../../common/components/error/ErrorHero';
import PreviewBanner from '../../common/components/previewBanner/PreviewBanner';
import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import WaveClipPath from '../../common/components/waveClipPath/WaveClipPath';
import { useLandingPageQuery } from '../../generated/graphql';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import BannerHero from '../banner/bannerHero/BannerHero';
import {
  getCourseCategoryOptions,
  getEventCategoryOptions,
} from '../eventSearch/utils';
import styles from './landingPage.module.scss';
import LandingPageMeta from './landingPageMeta/LandingPageMeta';
import LandingPageSearch from './landingPageSearchSection/LandingPageSearchSection';

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
              <div className={styles.searchContainer}>
                <div className={styles.searchInnerContainer}>
                  <LandingPageSearch
                    type="event"
                    title={t('home.eventSearch.title')}
                    searchPlaceholder={t('home.eventSearch.placeholder')}
                    popularCategories={getEventCategoryOptions(t)}
                  />
                  {/* Background helper used to get the wave-effect without 
                    course search panel being on top of event search panel */}
                  <div className={styles.backgroundHelper} />
                  <LandingPageSearch
                    type="course"
                    title={t('home.courseSearch.title')}
                    searchPlaceholder={t('home.courseSearch.placeholder')}
                    popularCategories={getCourseCategoryOptions(t)}
                  />
                </div>
              </div>
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
      <WaveClipPath />
    </PageWrapper>
  );
};

export default LandingPagePreview;
