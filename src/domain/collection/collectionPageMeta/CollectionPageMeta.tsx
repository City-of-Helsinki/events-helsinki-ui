import React from 'react';
import { Helmet } from 'react-helmet';

import { CollectionFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getCollectionFields } from '../CollectionUtils';

export interface CollectionPageMetaProps {
  collection: CollectionFieldsFragment;
}

const CollectionPageMeta: React.FC<CollectionPageMetaProps> = ({
  collection,
}) => {
  const locale = useLocale();
  const {
    heroBackgroundImage: image = '',
    socialMediadescription: description = '',
    title = '',
  } = getCollectionFields(collection, locale);

  // TODO: Get collection image from data instead of using placeholder image

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
