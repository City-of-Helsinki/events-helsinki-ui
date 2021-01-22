import pretty from 'pretty';
import TestController, { ClientFunction } from 'testcafe';

export const getHtml = ClientFunction(
  (selector: string) => document.querySelector(selector)?.outerHTML
);

export const getErrorMessage = async (t: TestController): Promise<string> => {
  const withinSelector = t.ctx.withinTestId
    ? `[data-testid="${t.ctx.withinTestId}"]`
    : 'body';
  const componentHtml = pretty(await getHtml(withinSelector));
  return `Expectation failed on test context: 
  ------------------------------------------------
  ${JSON.stringify(t.ctx, null, '\t')}
  ------------------------------------------------
  Failure occured within '${withinSelector}' html:
  ------------------------------------------------
  ${componentHtml}
  ------------------------------------------------  
  `;
};
