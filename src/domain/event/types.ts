import { EventFieldsFragment, EventTypeId } from '../../generated/graphql';
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

export type EventType = 'event';

export type EventRouteProp = typeof ROUTES.EVENTS;

export const EVENT_TYPE_TO_ID: Record<EventType, EventTypeId> = {
  event: EventTypeId.General,
};

export const EVENT_ROUTE_MAPPER: Record<EventType, string> = {
  event: ROUTES.EVENT,
};

export const EVENTS_ROUTE_MAPPER = {
  event: ROUTES.EVENTS,
};
