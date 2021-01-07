import React from 'react';

import { useOtherEventTimes } from '../../queryUtils';
import { EventFields } from '../../types';
import OtherEventTimes from './OtherEventTimes';

const OtherEventTimesContainer: React.FC<{ event: EventFields }> = ({
  event,
}) => {
  const { superEventId, ...props } = useOtherEventTimes(event);

  return superEventId ? (
    <OtherEventTimes {...props} superEventId={superEventId} eventType="event" />
  ) : null;
};

export default OtherEventTimesContainer;
