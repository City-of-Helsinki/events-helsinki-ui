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
