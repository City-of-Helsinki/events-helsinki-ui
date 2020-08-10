import React from 'react';
import { Helmet } from 'react-helmet';

import {
  EventFieldsFragment,
  LocalizedObject,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getLocalisedString from '../../../util/getLocalisedString';
import { getEventSomeImageUrl } from '../EventUtils';

interface Props {
  event: EventFieldsFragment;
}

const EventPageMeta: React.FC<Props> = ({ event }) => {
  const locale = useLocale();

  const getLocal = (localizedObject: LocalizedObject) =>
    getLocalisedString(localizedObject, locale);

  const name = getLocal(event.name);
  const description = getLocal(event.shortDescription || {});
  const image = getEventSomeImageUrl(event);

  const openGraphProperties: { [key: string]: string } = {
    description: description,
    image: image,
    title: name,
  };

  return (
    <Helmet>
      <title>{name}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      {Object.entries(openGraphProperties).map(([property, value]) => (
        <meta key={property} property={`og:${property}`} content={value} />
      ))}
    </Helmet>
  );
};

export default EventPageMeta;
