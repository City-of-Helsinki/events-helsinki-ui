import toCamelCase from "./toCamelCase";
import toPascalCase from "./toPascalCase";

/**
 * Translate a single value
 */
export const translateValue = (prefix: string, value: string, t: Function) => {
  return t(
    prefix
      ? `${prefix}${
          prefix.endsWith(".") ? toCamelCase(value) : toPascalCase(value)
        }`
      : toCamelCase(value)
  );
};

/**
 * Translate a list
 */
export const translateList = (prefix: string, list: string[], t: Function) => {
  return list.map(value => translateValue(prefix, value, t)).join(", ");
};
