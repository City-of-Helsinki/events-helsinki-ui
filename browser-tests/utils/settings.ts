const LOCAL_ENV_URL = 'http://localhost:3000';
const LOCAL_GRAPHQL_URL = 'http://localhost:4000/proxy/graphql';
export const getEnvUrl = (path = ''): string => {
  const baseUrl = process.env.BROWSER_TESTS_LOCAL_ENV_URL ?? LOCAL_ENV_URL;
  return `${baseUrl}${path?.startsWith('/') ? path : `/${path ?? ''}`}`;
};

export const getGraphQLUrl = (path = ''): string => {
  return process.env.REACT_APP_GRAPHQL_BASE_URL ?? LOCAL_GRAPHQL_URL;
};
