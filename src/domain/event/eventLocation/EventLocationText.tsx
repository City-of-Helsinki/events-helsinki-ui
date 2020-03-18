import React from "react";

import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import { getEventDistrict } from "../EventUtils";
import { EventInList } from "../types";

interface Props {
  event: EventInList;
  showDistrict: boolean;
  showLocationName: boolean;
}

const EventLocationText: React.FC<Props> = ({
  event,
  showDistrict,
  showLocationName
}) => {
  const locale = useLocale();

  const getLocationStr = () => {
    const location = event.location;

    const locationName = getLocalisedString(
      (location && location.name) || {},
      locale
    );

    const district = getEventDistrict(event, locale);

    const addressLocality = getLocalisedString(
      (location && location.addressLocality) || {},
      locale
    );

    const streetAddress = getLocalisedString(
      (location && location.streetAddress) || {},
      locale
    );

    return [
      showLocationName ? locationName : null,
      streetAddress,
      showDistrict ? district : null,
      addressLocality
    ]
      .filter(e => e)
      .join(", ");
  };
  return <>{getLocationStr()}</>;
};

export default EventLocationText;
