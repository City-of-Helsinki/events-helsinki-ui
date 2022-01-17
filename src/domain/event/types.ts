import { EventFieldsFragment } from '../../generated/graphql';

export type KeywordOption = {
  id: string;
  name: string;
};

export type EventFields = EventFieldsFragment;

export type SuperEventResponse = {
  data: EventFields | null;
  status: 'pending' | 'resolved';
};
