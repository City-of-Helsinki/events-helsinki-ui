import React from "react";
import { Helmet } from "react-helmet";

import { EventDetailsQuery, LocalizedObject } from "../../generated/graphql";
import useLocale from "../../hooks/useLocale";
import getLocalisedString from "../../util/getLocalisedString";

interface Props {
  eventData: EventDetailsQuery;
}

const EventPageMeta: React.FC<Props> = ({ eventData }) => {
  const locale = useLocale();

  const getLocal = (localizedObject: LocalizedObject) =>
    getLocalisedString(localizedObject, locale);

  const name = getLocal(eventData.eventDetails.name);
  const description = getLocal(eventData.eventDetails.shortDescription || {});
  const image = eventData.eventDetails.images.length
    ? eventData.eventDetails.images[0].url
    : null;

  const openGraphProperties: { [key: string]: string } = {
    description: description,
    image: image || "",
    title: name
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
