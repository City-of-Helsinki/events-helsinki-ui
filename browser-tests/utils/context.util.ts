import { WithinSelectors } from '@testing-library/testcafe';
import TestController from 'testcafe';
export const withinContext = (
  t: TestController,
  within: WithinSelectors
): WithinSelectors =>
  Object.keys(within).reduce((acc, key: keyof WithinSelectors) => {
    return {
      ...acc,
      [key]: (...params) => {
        t.ctx[key] = params;
        return within[key](...params);
      },
    };
  }, {}) as WithinSelectors;
