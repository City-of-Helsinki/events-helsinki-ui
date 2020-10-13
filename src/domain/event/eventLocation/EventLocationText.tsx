import React from 'react';

import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getEventFields } from '../EventUtils';

interface Props {
  event: EventFieldsFragment;
  showDistrict: boolean;
  showLocationName: boolean;
}

const EventLocationText: React.FC<Props> = ({
  event,
  showDistrict,
  showLocationName,
}) => {
  const locale = useLocale();

  const getLocationStr = () => {
    const {
      addressLocality,
      district,
      locationName,
      streetAddress,
    } = getEventFields(event, locale);

    return [
      showLocationName ? locationName : null,
      streetAddress,
      showDistrict ? district : null,
      addressLocality,
    ]
      .filter((e) => e)
      .join(', ');
  };
  return <>{getLocationStr()}</>;
};

export default EventLocationText;
