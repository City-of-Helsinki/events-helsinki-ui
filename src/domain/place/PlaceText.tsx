import React from 'react';

import {
  LinkedEventsSource,
  usePlaceDetailsQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import getLocalisedString from '../../util/getLocalisedString';

interface Props {
  id: string;
  source?: LinkedEventsSource;
}

const PlaceText: React.FC<Props> = ({
  id,
  source = LinkedEventsSource.Linkedevents,
}) => {
  const locale = useLocale();
  const { data } = usePlaceDetailsQuery({
    variables: { id, source },
  });

  return (
    <>{getLocalisedString((data && data.placeDetails.name) || {}, locale)}</>
  );
};

export default PlaceText;
