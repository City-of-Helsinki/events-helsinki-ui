import React from "react";

import { usePlaceDetailsQuery } from "../../generated/graphql";
import useLocale from "../../hooks/useLocale";
import getLocalisedString from "../../util/getLocalisedString";

interface Props {
  id: string;
}

const PlaceText: React.FC<Props> = ({ id }) => {
  const locale = useLocale();
  const { data } = usePlaceDetailsQuery({
    variables: { id }
  });

  return (
    <>{getLocalisedString((data && data.placeDetails.name) || {}, locale)}</>
  );
};

export default PlaceText;
