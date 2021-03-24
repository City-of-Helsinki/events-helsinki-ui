import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { LandingPageFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { ROUTES } from '../../app/routes/constants';
import { getBannerFields } from '../../banner/bannerUtils';
import { getLandingPageFields } from '../utils';

interface Props {
  landingPage: LandingPageFieldsFragment;
}

const LandingPageMeta: React.FC<Props> = ({ landingPage }) => {
  const locale = useLocale();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const { keywords, pageTitle, metaInformation } = getLandingPageFields(
    landingPage,
    locale
  );

  const { someImage: topBannerSoMeImage } = getBannerFields(
    locale,
    landingPage.topBanner
  );

  const { someImage: bottomBannerSoMeImage } = getBannerFields(
    locale,
    landingPage.bottomBanner
  );

  const openGraphProperties = {
    description: metaInformation,
    image: [topBannerSoMeImage, bottomBannerSoMeImage],
    title: pageTitle,
  };

  const getDescription = () => {
    const route = [
      ROUTES.COURSES,
      ROUTES.EVENTS,
      ROUTES.COLLECTIONS,
    ].find((route) => pathname.startsWith(`/${locale}${route}`));
    return t(`meta.${route?.substring(1) || 'default'}.description`);
  };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={getDescription()} />
      <meta
        name="keywords"
        content={keywords?.map((keyword) => keyword?.toLowerCase()).join(', ')}
      />
      <meta name="twitter:card" content="summary" />
      {Object.entries(openGraphProperties).flatMap(([property, value]) => {
        const valueList = (Array.isArray(value) ? value : [value]) as string[];
        return valueList.map((value: string) => (
          <meta key={property} property={`og:${property}`} content={value} />
        ));
      })}
    </Helmet>
  );
};

export default LandingPageMeta;
