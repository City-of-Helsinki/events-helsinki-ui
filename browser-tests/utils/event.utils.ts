import addDays from 'date-fns/addDays';
import endOfWeek from 'date-fns/endOfWeek';
import subDays from 'date-fns/subDays';

import { DATE_TYPES } from '../../src/constants';
import { EventFieldsFragment } from './generated/graphql';

const removeEmpty = (obj) => {
  Object.keys(obj).forEach(
    (k) =>
      (obj[k] && typeof obj[k] === 'object' && removeEmpty(obj[k])) ||
      (!obj[k] && obj[k] !== undefined && delete obj[k])
  );
  return obj;
};

export const getExpectedEventContext = (
  event: Partial<EventFieldsFragment>,
  ...fieldsToPick: Array<keyof EventFieldsFragment>
): Partial<EventFieldsFragment> =>
  removeEmpty(
    fieldsToPick.reduce(
      (fields, field) => ({ ...fields, [field]: event[field] }),
      {
        id: event.id,
        name: event.name.fi,
        start: event.startTime,
        end: event.endTime,
      }
    )
  );

export const getEventDate = (dateRange: string): Date => {
  const today = new Date();
  const sunday = endOfWeek(today, { weekStartsOn: 1 });
  const saturday = subDays(sunday, 1);
  switch (dateRange) {
    case DATE_TYPES.TODAY:
    case DATE_TYPES.THIS_WEEK:
      return today;
    case DATE_TYPES.TOMORROW:
      return addDays(today, 1);
    case DATE_TYPES.WEEKEND:
      return today && today > saturday ? today : saturday;
  }
};

export const isInternetEvent = (event: EventFieldsFragment): boolean =>
  event.location.id === 'helsinki:internet';
