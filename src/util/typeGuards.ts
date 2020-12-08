import { EventFields } from '../domain/event/types';
import { CourseFieldsFragment } from '../generated/graphql';

export const isCourseEvent = (
  event: EventFields
): event is CourseFieldsFragment => {
  return (event as CourseFieldsFragment).extensionCourse !== undefined;
};
