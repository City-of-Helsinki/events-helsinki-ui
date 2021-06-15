import './test/test18nInit';
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom/extend-expect';

import { cache } from './domain/app/apollo/apolloClient';

// Mock scrollTo function
window.scrollTo = jest.fn();

afterEach(() => {
  cache.reset();
});

jest.setTimeout(30000);
