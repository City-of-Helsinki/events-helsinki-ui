import { RequestLogger } from 'testcafe';

export const requestLogger = RequestLogger(
  'http://localhost:4000/proxy/graphql',
  {
    logResponseHeaders: true,
  }
);
