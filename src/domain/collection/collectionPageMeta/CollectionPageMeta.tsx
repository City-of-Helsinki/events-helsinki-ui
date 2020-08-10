import React from 'react';
import { Helmet } from 'react-helmet';

import { CollectionFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getLocalisedString from '../../../util/getLocalisedString';
import { getHeroBackgroundImage } from '../CollectionUtils';

export interface CollectionPageMetaProps {
  collection: CollectionFieldsFragment;
}

const CollectionPageMeta: React.FC<CollectionPageMetaProps> = ({
  collection,
}) => {
  const locale = useLocale();

  const title = getLocalisedString(collection.title, locale);
  const description = getLocalisedString(
    collection.socialMediaDescription || {},
    locale
  );

  // TODO: Get collection image from data instead of using placeholder image
  const image = getHeroBackgroundImage(collection);

  const openGraphProperties: { [key: string]: string } = {
    description: description,
    image: image || '',
    title: title,
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
