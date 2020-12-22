/* eslint-disable @typescript-eslint/no-explicit-any */
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const buildQueryFromObject = (obj: { [key: string]: any }) => {
  const query: string[] = [];

  forEach(obj, (filter, key) => {
    if (!isEmpty(filter) || isNumber(filter) || typeof filter === 'boolean') {
      if (isArray(filter)) {
        const items: Array<string | number> = [];

        forEach(filter, (item: string | number) => {
          items.push(encodeURIComponent(item));
        });

        query.push(`${key}=${items.join(',')}`);
      } else if (!isNil(filter)) {
        query.push(`${key}=${encodeURIComponent(filter)}`);
      }
    }
  });

  return query.length ? `?${query.join('&')}` : '';
};

export default buildQueryFromObject;
