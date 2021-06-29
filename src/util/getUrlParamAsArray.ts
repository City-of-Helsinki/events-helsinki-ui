import intersection from 'lodash/intersection';

const getUrlParamAsArray = (
  params: URLSearchParams,
  key: string,
  unique = true
): string[] => {
  const typeValues = params
    .getAll(key)
    .reduce(
      (types: string[], value: string) =>
        types.concat(...value.split(',').map((val) => val.trim())),
      []
    );
  return unique ? intersection(typeValues) : typeValues;
};

export default getUrlParamAsArray;
