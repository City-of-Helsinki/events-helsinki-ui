import intersection from "lodash/intersection";

/**
 * Get single url param as an array
 * @param params
 * @param key
 * @return {string[]}
 */
export default (params: URLSearchParams, key: string): string[] => {
  return intersection(
    params
      .getAll(key)
      .reduce(
        (types: string[], value: string) =>
          types.concat(...value.split(",").map(val => val.trim())),
        []
      )
  );
};
