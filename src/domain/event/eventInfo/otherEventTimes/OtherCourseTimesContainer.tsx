import React from 'react';

import { useOtherCourseTimes } from '../../queryUtils';
import { EventFields, EventType } from '../../types';
import OtherEventTimes from './OtherEventTimes';

const OtherCourseTimesContainer: React.FC<{ event: EventFields }> = ({
  event,
}) => {
  const { superEventId, ...props } = useOtherCourseTimes(event);

  return superEventId ? (
    <OtherEventTimes
      {...props}
      superEventId={superEventId}
      eventType={EventType.COURSE}
    />
  ) : null;
};

export default OtherCourseTimesContainer;
