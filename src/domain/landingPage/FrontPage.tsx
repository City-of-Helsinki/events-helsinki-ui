import * as React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import {
  useCollectionListQuery,
  useLandingPagesQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import BannerHero from '../banner/bannerHero/BannerHero';
import CollectionCards from '../collection/collectionCard/CollectionCards';
import {
  isCollectionExpired,
  isLanguageSupported,
} from '../collection/CollectionUtils';
import {
  getCourseCategoryOptions,
  getEventCategoryOptions,
} from '../eventSearch/utils';
import styles from './frontPage.module.scss';
import LandingPageMeta from './landingPageMeta/LandingPageMeta';
import LandingPageSearch from './landingPageSearchSection/LandingPageSearchSection';
import { isLanguageSupported as isLanguagePageLanguageSupported } from './utils';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();

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
    ? collectionsData.collectionList.data.filter(
        (collection) =>
          isLanguageSupported(collection, locale) &&
          !isCollectionExpired(collection)
      )
    : [];

  const lgCollections = collections.slice(0, 1);
  const mdAndSmCollections = collections.slice(1);

  return (
    <PageWrapper>
      <LoadingSpinner isLoading={loading}>
        {!!landingPage && (
          <>
            <LandingPageMeta landingPage={landingPage} />
            {landingPage.topBanner && (
              <BannerHero banner={landingPage.topBanner} />
            )}
          </>
        )}
        {!!collectionsData && (
          <MainContent offset={-150}>
            <div className={styles.searchContainer}>
              <div className={styles.searchInnerContainer}>
                <LandingPageSearch
                  type="event"
                  title={t('home.eventSearch.title')}
                  searchPlaceholder={t('home.eventSearch.placeholder')}
                  popularCategories={getEventCategoryOptions(t)}
                />
                <LandingPageSearch
                  type="course"
                  title={t('home.courseSearch.title')}
                  searchPlaceholder={t('home.courseSearch.placeholder')}
                  popularCategories={getCourseCategoryOptions(t)}
                />
              </div>
            </div>
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
          </MainContent>
        )}
        {landingPage?.bottomBanner && (
          <BannerHero banner={landingPage.bottomBanner} />
        )}
      </LoadingSpinner>
      <svg width="0" height="0">
        <defs>
          <clipPath id="wave">
            {/* eslint-disable-next-line max-len */}
            <path d="M2589.01985,9 C2636.98201,9 2636.98201,36.1253151 2685,36.1253151 L2684.742,89.999 L2686,90 L2686,2069 L-2,2069 L-2,90 L-1.974,89.999 L-1.62275565,36.1253151 C20.9165393,36.1253151 32.8623657,30.133333 44.1803142,23.781832 L45.6225157,22.969483 L45.6225157,22.969483 L47.0625029,22.1558321 L47.0625029,22.1558321 L48.5048832,21.3434831 C59.8249313,14.9919821 71.7893047,9 94.3635941,9 C116.905805,9 128.853177,14.9919821 140.170012,21.3434831 L141.612057,22.1558321 C153.853376,29.0700206 165.851522,36.1253151 190.337534,36.1253151 C213.842029,36.1253151 225.829321,29.6125269 237.592109,22.969483 L239.032096,22.1558321 C250.795371,15.5127882 262.795067,9 286.323884,9 C334.286036,9 334.286036,36.1253151 382.304029,36.1253151 C404.843324,36.1253151 416.789151,30.133333 428.100657,23.781832 L429.542001,22.969483 C441.777178,16.0552945 453.76447,9 478.228332,9 C500.796789,9 512.758071,14.9919821 524.077125,21.3434831 L525.51939,22.1558321 L525.51939,22.1558321 L526.959284,22.969483 C538.721281,29.6125269 550.707023,36.1253151 574.208477,36.1253151 C597.737294,36.1253151 609.736991,29.6125269 621.498805,22.969483 L622.938606,22.1558321 L622.938606,22.1558321 L624.380636,21.3434831 C635.697296,14.9919821 647.643123,9 670.182417,9 C693.714275,9 705.715522,15.5127882 717.478857,22.1558321 L718.918844,22.969483 C730.681571,29.6125269 742.667313,36.1253151 766.168767,36.1253151 C789.694544,36.1253151 801.69269,29.6125269 813.455173,22.969483 L814.895068,22.1558321 C826.657126,15.5127882 838.644418,9 862.148912,9 C885.680769,9 897.682017,15.5127882 909.445352,22.1558321 L910.885339,22.969483 C922.648066,29.6125269 934.633808,36.1253151 958.135262,36.1253151 C981.664079,36.1253151 993.663775,29.6125269 1005.42559,22.969483 L1006.86539,22.1558321 C1018.6266,15.5127882 1030.61079,9 1054.1092,9 C1077.64106,9 1089.64231,15.5127882 1101.40564,22.1558321 L1102.84563,22.969483 L1102.84563,22.969483 L1104.28785,23.781832 C1115.60597,30.133333 1127.55334,36.1253151 1150.09555,36.1253151 C1198.00186,36.1253151 1198.00186,9 1246.01985,9 C1293.87714,9 1293.98178,36.0068309 1341.68573,36.1249266 L1341.37724,36.1253151 C1363.91654,36.1253151 1375.86237,30.133333 1387.18031,23.781832 L1388.62252,22.969483 L1388.62252,22.969483 L1390.0625,22.1558321 L1390.0625,22.1558321 L1391.50488,21.3434831 C1402.82493,14.9919821 1414.7893,9 1437.36359,9 C1459.90581,9 1471.85318,14.9919821 1483.17001,21.3434831 L1484.61206,22.1558321 C1496.85338,29.0700206 1508.85152,36.1253151 1533.33753,36.1253151 C1556.84203,36.1253151 1568.82932,29.6125269 1580.59211,22.969483 L1582.0321,22.1558321 C1593.79537,15.5127882 1605.79507,9 1629.32388,9 C1677.28604,9 1677.28604,36.1253151 1725.30403,36.1253151 C1747.84332,36.1253151 1759.78915,30.133333 1771.10066,23.781832 L1772.542,22.969483 C1784.77718,16.0552945 1796.76447,9 1821.22833,9 C1843.79679,9 1855.75807,14.9919821 1867.07713,21.3434831 L1868.51939,22.1558321 L1868.51939,22.1558321 L1869.95928,22.969483 C1881.72128,29.6125269 1893.70702,36.1253151 1917.20848,36.1253151 C1940.73729,36.1253151 1952.73699,29.6125269 1964.49881,22.969483 L1965.93861,22.1558321 L1965.93861,22.1558321 L1967.38064,21.3434831 C1978.6973,14.9919821 1990.64312,9 2013.18242,9 C2036.71427,9 2048.71552,15.5127882 2060.47886,22.1558321 L2061.91884,22.969483 C2073.68157,29.6125269 2085.66731,36.1253151 2109.16877,36.1253151 C2132.69454,36.1253151 2144.69269,29.6125269 2156.45517,22.969483 L2157.89507,22.1558321 C2169.65713,15.5127882 2181.64442,9 2205.14891,9 C2228.68077,9 2240.68202,15.5127882 2252.44535,22.1558321 L2253.88534,22.969483 C2265.64807,29.6125269 2277.63381,36.1253151 2301.13526,36.1253151 C2324.66408,36.1253151 2336.66378,29.6125269 2348.42559,22.969483 L2349.86539,22.1558321 C2361.6266,15.5127882 2373.61079,9 2397.1092,9 C2420.64106,9 2432.64231,15.5127882 2444.40564,22.1558321 L2445.84563,22.969483 L2445.84563,22.969483 L2447.28785,23.781832 C2458.60597,30.133333 2470.55334,36.1253151 2493.09555,36.1253151 C2541.00186,36.1253151 2541.00186,9 2589.01985,9 Z" />
          </clipPath>
        </defs>
      </svg>
    </PageWrapper>
  );
};

export default LandingPage;
