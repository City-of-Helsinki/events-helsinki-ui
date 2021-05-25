import { EventFieldsFragment } from '../../generated/graphql';
import { ROUTES } from '../app/routes/constants';

export type KeywordOption = {
  id: string;
  name: string;
};

export type EventFields = EventFieldsFragment;

export type SuperEventResponse = {
  data: EventFields | null;
  status: 'pending' | 'resolved';
};

export type EventType = 'event' | 'course';

export type EventRouteProp = typeof ROUTES.EVENTS | typeof ROUTES.COURSES;

export const EVENT_ROUTE_MAPPER: Record<EventType, string> = {
  event: ROUTES.EVENT,
  course: ROUTES.COURSE,
};

export const EVENTS_ROUTE_MAPPER = {
  event: ROUTES.EVENTS,
  course: ROUTES.COURSES,
};
