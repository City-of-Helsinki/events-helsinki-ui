import {
  CourseFieldsFragment,
  EventFieldsFragment,
} from '../../generated/graphql';

export type KeywordOption = {
  id: string;
  name: string;
};

export type EventType = 'course' | 'event';

export type EventFields = EventFieldsFragment | CourseFieldsFragment;
