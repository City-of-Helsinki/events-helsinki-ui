import React from "react";
import { Helmet } from "react-helmet";

import bgImage from "../../../assets/images/png/collection-background.png";
import { CollectionDetailsQuery } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";

export interface CollectionPageMetaProps {
  collectionData: CollectionDetailsQuery;
}

const CollectionPageMeta: React.FC<CollectionPageMetaProps> = ({
  collectionData
}) => {
  const locale = useLocale();

  const title = getLocalisedString(
    collectionData.collectionDetails.title,
    locale
  );
  const description = getLocalisedString(
    collectionData.collectionDetails.shortDescription || {},
    locale
  );

  // TODO: Get collection image from data instead of using placeholder image
  const image = bgImage;

  const openGraphProperties: { [key: string]: string } = {
    description: description,
    image: image || "",
    title: title
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
