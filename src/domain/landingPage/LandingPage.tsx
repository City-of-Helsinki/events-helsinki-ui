import orderBy from 'lodash/orderBy';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import {
  useCollectionListQuery,
  useLandingPagesQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { useMobile } from '../../hooks/useMobile';
import Container from '../app/layout/Container';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import BannerHero from '../banner/bannerHero/BannerHero';
import CollectionCards from '../collection/collectionCard/CollectionCards';
import { isCollectionVisible } from '../collection/CollectionUtils';
import { COURSE_HOBBY_TYPES } from '../eventSearch/constants';
import { CategoryExtendedOption } from '../eventSearch/types';
import {
  getCourseCategoryOptions,
  getCourseHobbyTypeOptions,
  getEventCategoryOptions,
} from '../eventSearch/utils';
import styles from './landingPage.module.scss';
import LandingPageMeta from './landingPageMeta/LandingPageMeta';
import LandingPageSearch from './landingPageSearchSection/LandingPageSearchSection';
import { isLanguageSupported as isLanguagePageLanguageSupported } from './utils';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const isMobile = useMobile();

  const { data: landingPageData, loading } = useLandingPagesQuery({
    variables: { visibleOnFrontpage: true },
  });

  const { data: collectionsData } = useCollectionListQuery({
    variables: { visibleOnFrontpage: true },
  });

  const landingPage = landingPageData?.landingPages.data.find((page) =>
    isLanguagePageLanguageSupported(page, locale)
  );
  const collections = collectionsData
    ? collectionsData.collectionList.data.filter((collection) =>
        isCollectionVisible(collection, locale)
      )
    : [];

  const getCourseCategoryOptionsExtended = () => {
    const hobbyTypes = getCourseHobbyTypeOptions(t) as CategoryExtendedOption[];
    const hobbyTypesToAdd = [
      COURSE_HOBBY_TYPES.CAMPS,
      COURSE_HOBBY_TYPES.CLUBS,
    ];
    const includedHobbyTypes = hobbyTypes.filter((hobbyType) =>
      hobbyTypesToAdd.some((h) => h === hobbyType.value)
    );
    const courseCategories = getCourseCategoryOptions(
      t
    ) as CategoryExtendedOption[];

    return orderBy([...courseCategories, ...includedHobbyTypes], 'text');
  };

  const lgCollections = collections.slice(0, 1);
  const mdAndSmCollections = collections.slice(1);

  const eventCategories = getEventCategoryOptions(
    t
  ) as CategoryExtendedOption[];
  const courseCategories = getCourseCategoryOptionsExtended();

  return (
    <PageWrapper>
      <LoadingSpinner isLoading={loading}>
        {!!landingPage && (
          <>
            <LandingPageMeta landingPage={landingPage} />
            {landingPage.topBanner && (
              <BannerHero banner={landingPage.topBanner} location="top" />
            )}
          </>
        )}

        <MainContent offset={-150}>
          <div className={styles.searchContainer}>
            <div className={styles.searchInnerContainer}>
              <LandingPageSearch
                type="event"
                title={t('home.eventSearch.title')}
                searchHelperText={
                  isMobile
                    ? t('home.search.helperText')
                    : t('home.eventSearch.helperText')
                }
                popularCategories={eventCategories}
              />
              {/* Background helper used to get the wave-effect without
                    course search panel being on top of event search panel */}
              <div className={styles.backgroundHelper} />
              <LandingPageSearch
                type="course"
                title={t('home.courseSearch.title')}
                searchHelperText={
                  isMobile
                    ? t('home.search.helperText')
                    : t('home.courseSearch.helperText')
                }
                popularCategories={courseCategories}
              />
            </div>
          </div>
          {!!collectionsData && (
            <div className={styles.collectionCardContainer}>
              <Container>
                <div>
                  <h2>{t('home.collections.title')}</h2>
                  <CollectionCards collections={lgCollections} layout="lg" />
                  <CollectionCards
                    collections={mdAndSmCollections}
                    layout="mdAndSm"
                  />
                </div>
              </Container>
            </div>
          )}
        </MainContent>
        {landingPage?.bottomBanner && (
          <BannerHero banner={landingPage.bottomBanner} location="bottom" />
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default LandingPage;
