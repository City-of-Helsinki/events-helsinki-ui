import TestController from 'testcafe';
export const getErrorMessage = (t: TestController): string =>
  `Expectation failed for ${JSON.stringify(t.ctx, null, '\t')}`;
