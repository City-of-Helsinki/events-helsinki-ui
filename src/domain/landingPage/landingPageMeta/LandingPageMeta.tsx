import React from 'react';
import { Helmet } from 'react-helmet';

import { LandingPageFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getLandingPageFields } from '../utils';

interface Props {
  landingPage: LandingPageFieldsFragment;
}

const EventPageMeta: React.FC<Props> = ({ landingPage }) => {
  const locale = useLocale();

  const { pageTitle, someImage: image, someDescription } = getLandingPageFields(
    landingPage,
    locale
  );

  const openGraphProperties: { [key: string]: string } = {
    description: someDescription || '',
    image: image,
    title: pageTitle || '',
  };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={openGraphProperties.description} />
      <meta name="twitter:card" content="summary" />
      {Object.entries(openGraphProperties).map(([property, value]) => (
        <meta key={property} property={`og:${property}`} content={value} />
      ))}
    </Helmet>
  );
};

export default EventPageMeta;
