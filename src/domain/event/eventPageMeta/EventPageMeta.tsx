import React from 'react';
import { Helmet } from 'react-helmet';

import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getEventFields } from '../EventUtils';

interface Props {
  event: EventFieldsFragment;
}

const EventPageMeta: React.FC<Props> = ({ event }) => {
  const locale = useLocale();

  const {
    keywords,
    name,
    someImageUrl: image,
    shortDescription: description,
  } = getEventFields(event, locale);

  const openGraphProperties: { [key: string]: string } = {
    description: description,
    image: image,
    title: name,
  };

  return (
    <Helmet>
      <title>{name}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={keywords
          .map((keyword) => keyword.name.toLocaleLowerCase())
          .join(', ')}
      />
      <meta name="twitter:card" content="summary" />
      {Object.entries(openGraphProperties).map(([property, value]) => (
        <meta key={property} property={`og:${property}`} content={value} />
      ))}
    </Helmet>
  );
};

export default EventPageMeta;
