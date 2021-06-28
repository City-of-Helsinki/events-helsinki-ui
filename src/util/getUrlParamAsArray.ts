import intersection from 'lodash/intersection';

const getUrlParamAsArray = (params: URLSearchParams, key: string): string[] => {
  return intersection(
    params
      .getAll(key)
      .reduce(
        (types: string[], value: string) =>
          types.concat(...value.split(',').map((val) => val.trim())),
        []
      )
  );
};

export default getUrlParamAsArray;
