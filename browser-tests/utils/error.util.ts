import pretty from 'pretty';
import TestController, { ClientFunction } from 'testcafe';

export const getHtml = ClientFunction(
  () => document.querySelector('body').outerHTML
);

export const getErrorMessage = async (t: TestController): Promise<string> => {
  const html = pretty(await getHtml(), { odc: true });
  return `Expectation failed on test context: ${JSON.stringify(
    t.ctx,
    null,
    '\t'
  )}
  Html at the time of failure:
  ${html}`;
};
