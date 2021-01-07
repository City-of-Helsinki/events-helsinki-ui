import {
  CourseFieldsFragment,
  EventFieldsFragment,
} from '../../generated/graphql';
import { ROUTES } from '../app/routes/constants';

export type KeywordOption = {
  id: string;
  name: string;
};

export type EventFields = EventFieldsFragment | CourseFieldsFragment;

export type EventType = 'event' | 'course';

export const EVENT_ROUTE_MAPPER: Record<EventType, string> = {
  event: ROUTES.EVENT,
  course: ROUTES.COURSE,
};

export const EVENTS_ROUTE_MAPPER = {
  event: ROUTES.EVENTS,
  course: ROUTES.COURSES,
};
