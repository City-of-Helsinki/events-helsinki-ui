import React from "react";
import { Helmet } from "react-helmet";

import { LandingPageQuery } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import { LANDING_PAGE_SOME_IMAGE } from "../constants";

interface Props {
  landingPageData: LandingPageQuery;
}

const EventPageMeta: React.FC<Props> = ({ landingPageData }) => {
  const locale = useLocale();

  const title = getLocalisedString(
    landingPageData.landingPage.pageTitle || {},
    locale
  );
  const description = getLocalisedString(
    landingPageData.landingPage.metaInformation || {},
    locale
  );

  // TODO: Get some image from CMS when implemented on CMS side
  const image = LANDING_PAGE_SOME_IMAGE;

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
