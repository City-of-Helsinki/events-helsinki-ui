import React from "react";
import { Helmet } from "react-helmet";

import { LandingPageFieldsFragment } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import { getLandingPageSomeImageUrl } from "../utils";

interface Props {
  landingPage: LandingPageFieldsFragment;
}

const EventPageMeta: React.FC<Props> = ({ landingPage }) => {
  const locale = useLocale();

  const title = getLocalisedString(landingPage.pageTitle || {}, locale);
  const description = getLocalisedString(
    landingPage.metaInformation || {},
    locale
  );

  const image = getLandingPageSomeImageUrl(landingPage, locale);

  const openGraphProperties: { [key: string]: string } = {
    description,
    image: image,
    title
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

export default EventPageMeta;
