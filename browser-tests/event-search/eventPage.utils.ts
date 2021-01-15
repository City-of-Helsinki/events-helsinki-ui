import { EventFieldsFragment } from '../utils/generated/graphql';

export const errorMessageForEvent = (event: EventFieldsFragment): string =>
  `Expectation failed for event: ${JSON.stringify(event, null, '\t')}`;
