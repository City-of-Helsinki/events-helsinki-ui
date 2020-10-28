import React from 'react';
import { Helmet } from 'react-helmet';

import { LandingPageFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getLandingPageFields } from '../utils';

interface Props {
  landingPage: LandingPageFieldsFragment;
}

const LandingPageMeta: React.FC<Props> = ({ landingPage }) => {
  const locale = useLocale();

  const {
    keywords,
    pageTitle,
    someImage: image,
    metaInformation,
  } = getLandingPageFields(landingPage, locale);

  const openGraphProperties: { [key: string]: string } = {
    description: metaInformation,
    image: image,
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
      {Object.entries(openGraphProperties).map(([property, value]) => (
        <meta key={property} property={`og:${property}`} content={value} />
      ))}
    </Helmet>
  );
};

export default LandingPageMeta;
