const TEST_ENV_URL = 'https://tapahtumat.test.kuva.hel.ninja';
const LOCAL_ENV_URL = 'http://localhost:3000';

export const getEnvUrl = (path = ''): string => {
  const baseUrl =
    process.env.BROWSER_TEST_ENV === 'local' ? LOCAL_ENV_URL : TEST_ENV_URL;

  return `${baseUrl}${!path || path.startsWith('/') ? path : `/${path}`}`;
};
