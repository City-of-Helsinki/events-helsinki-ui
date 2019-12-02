import memoize from "lodash/memoize";

import toCamelCase from "./toCamelCase";

const memoizedCamelCase = memoize(toCamelCase);

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
