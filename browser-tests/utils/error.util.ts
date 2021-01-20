import TestController from 'testcafe';
export const getErrorMessage = (t: TestController): string =>
  `Expectation failed on test context: ${JSON.stringify(t.ctx, null, '\t')}`;
