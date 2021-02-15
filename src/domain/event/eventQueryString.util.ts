import { ROUTES } from '../app/routes/constants';

export type ReturnParams = {
  returnPath: string;
  remainingQueryString?: string;
};

/**
 * Extracts latest return path from queryString. For example on:
 * http://localhost:3000/fi/event/kulke:53397?returnPath=%2Fevents&returnPath=%2Fevent%2Fhelsinki%3Aaf3pnza3zi
 * latest return path is in the last returnPath param on queryString : %2Fevent%2Fhelsinki%3Aaf3pnza3zi
 * @param queryString
 */
export const extractLatestReturnPath = (queryString: string): ReturnParams => {
  const searchParams = new URLSearchParams(queryString);
  const returnPaths = searchParams.getAll('returnPath');
  // latest path is the last item, it can be popped. If empty, defaults to /events
  const extractedPath = returnPaths.pop() ?? ROUTES.EVENTS;
  // there is no support to delete all but extracted item from same parameter list. This is a workaround to it:
  // 1) delete all first
  searchParams.delete('returnPath');
  // 2) then append all except latest
  returnPaths.forEach((returnPath) =>
    searchParams.append('returnPath', returnPath)
  );
  return {
    returnPath: extractedPath,
    remainingQueryString: searchParams.toString(),
  };
};
