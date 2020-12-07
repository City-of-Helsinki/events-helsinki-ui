import { ROUTES } from '../../app/constants';

export enum EventType {
  EVENT = 'event',
  COURSE = 'course',
}

export const EVENT_ROUTE_MAPPER = {
  [EventType.EVENT]: ROUTES.EVENT,
  [EventType.COURSE]: ROUTES.COURSE,
};

export const EVENTS_ROUTE_MAPPER = {
  [EventType.EVENT]: ROUTES.EVENTS,
  [EventType.COURSE]: ROUTES.COURSES,
};
