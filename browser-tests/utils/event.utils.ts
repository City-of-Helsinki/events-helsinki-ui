import { EventFieldsFragment } from './generated/graphql';

export const errorMessageForEvent = (event: EventFieldsFragment): string =>
  `Expectation failed for event: ${JSON.stringify(event, null, '\t')}`;

export const getExpectedEventContext = (
  event: EventFieldsFragment,
  ...fieldsToPick: Array<keyof EventFieldsFragment>
): Partial<EventFieldsFragment> => ({
  id: event.id,
  name: event.name,
  ...fieldsToPick.map((field) => ({ [field]: event[field] })),
});
