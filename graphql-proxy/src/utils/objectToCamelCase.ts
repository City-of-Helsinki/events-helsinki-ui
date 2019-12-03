import memoize from "lodash/memoize";

import toCamelCase from "./toCamelCase";

const memoizedCamelCase = memoize(toCamelCase);

/**
 * Convert complete object from snake case to camel case.
 * This is used to format data got from rest api to desired GraphQL format
 * e.g
 * Before:
 *  {
 *    @id: "123",
 *    event_type: "foo",
 *    event_price: {
 *      is_free: false
 *    }
 *  }
 * After:
 *  {
 *    @id: "123",
 *    eventType: "foo",
 *    eventPrice: {
 *      isFree: false
 *    }
 *  }
 * @event_type => @eventType
 * @event_end_date => @eventEndDate
 */
const objectToCamelCase = value => {
  if (Array.isArray(value)) {
    return value.map(objectToCamelCase);
  }

  if (value && typeof value === "object" && value.constructor === Object) {
    const obj = {};
    const keys = Object.keys(value);
    const len = keys.length;

    for (let i = 0; i < len; i += 1) {
      obj[memoizedCamelCase(keys[i])] = objectToCamelCase(value[keys[i]]);
    }

    return obj;
  }

  return value;
};

export default objectToCamelCase;
