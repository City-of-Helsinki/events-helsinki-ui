import { SUPPORT_LANGUAGES } from '../constants';
import { MAPPED_PLACES } from '../domain/eventSearch/constants';
import { assertUnreachable } from './typescript.utils';

// Add more known query parameters here
export type QueryParam = 'places' | 'returnPath';

export type QueryEntry = {
  param: QueryParam;
  value?: string;
};

const langPathRegExp = new RegExp(
  `/(${Object.values(SUPPORT_LANGUAGES).join('|')})`
);

const stripLanguageFromPath = (path: string) =>
  path.replace(langPathRegExp, '');

const getParamValue = ({ param, value }: Required<QueryEntry>) => {
  switch (param) {
    case 'places':
      return MAPPED_PLACES[value];
    case 'returnPath':
      return stripLanguageFromPath(value);
    default:
      return assertUnreachable(param, 'Unknown query parameter');
  }
};

export const addEntriesToQueryString = (
  queryString: string,
  ...entries: Array<QueryEntry>
): string => {
  const searchParams = new URLSearchParams(queryString);
  for (const { param, value } of entries) {
    if (value) {
      searchParams.append(param, getParamValue({ param, value }));
    }
  }
  return '?' + searchParams.toString();
};

export const addEntryToQueryString = (
  queryString: string,
  { param, value }: QueryEntry
): string => addEntriesToQueryString(queryString, { param, value });
