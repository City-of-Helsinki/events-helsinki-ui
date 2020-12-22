import * as React from 'react';
import { Helmet } from 'react-helmet';

import { LandingPageFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getBannerFields } from '../../banner/bannerUtils';
import { getLandingPageFields } from '../utils';
interface Props {
  landingPage: LandingPageFieldsFragment;
}

const LandingPageMeta: React.FC<Props> = ({ landingPage }) => {
  const locale = useLocale();

  const {
    keywords,
    pageTitle,
    someImage: topBannerSoMeImage,
    metaInformation,
  } = getLandingPageFields(landingPage, locale);
  const { someImage: bottomBannerSoMeImage } = getBannerFields(
    locale,
    landingPage.bottomBanner
  );
  const openGraphProperties = {
    description: metaInformation,
    image: [topBannerSoMeImage, bottomBannerSoMeImage],
    title: pageTitle,
  };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={openGraphProperties.description} />
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
