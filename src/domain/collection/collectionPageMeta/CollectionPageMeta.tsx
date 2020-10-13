import React from 'react';
import { Helmet } from 'react-helmet';

import { CollectionFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getCollectionFields } from '../CollectionUtils';

interface Props {
  collection: CollectionFieldsFragment;
}

const CollectionPageMeta: React.FC<Props> = ({ collection }) => {
  const locale = useLocale();
  const {
    heroBackgroundImage: image,
    socialMediadescription: description,
    title,
  } = getCollectionFields(collection, locale);

  const openGraphProperties: { [key: string]: string } = {
    description,
    image,
    title,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      {Object.entries(openGraphProperties).map(([property, value]) => (
        <meta key={property} property={`og:${property}`} content={value} />
      ))}
    </Helmet>
  );
};

export default CollectionPageMeta;
