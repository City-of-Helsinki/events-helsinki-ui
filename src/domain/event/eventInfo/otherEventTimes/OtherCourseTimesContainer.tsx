import React from 'react';

import { useOtherCourseTimes } from '../../queryUtils';
import { EventFields } from '../../types';
import OtherEventTimes from './OtherEventTimes';

const OtherCourseTimesContainer: React.FC<{ event: EventFields }> = ({
  event,
}) => {
  const { superEventId, ...props } = useOtherCourseTimes(event);

  return superEventId ? (
    <OtherEventTimes {...props} eventType="course" />
  ) : null;
};

export default OtherCourseTimesContainer;
