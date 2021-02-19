/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TestController from 'testcafe';

import { getErrorMessage, screenContext } from './utils/testcafe.utils';

export const getCommonComponents = (t: TestController) => {
  const screen = screenContext(t);
  const loadingSpinner = () => {
    const selectors = {
      spinner() {
        return screen.findByTestId('loading-spinner');
      },
    };
    const expectations = {
      async isNotPresent({ timeout = 10000 }) {
        await t
          .expect(selectors.spinner().exists)
          .notOk(await getErrorMessage(t), { timeout });
      },
    };
    return {
      expectations,
    };
  };
  return {
    loadingSpinner,
  };
};
