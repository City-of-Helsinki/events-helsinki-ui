import './test/test18nInit';
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom/extend-expect';

// Mock scrollTo function
window.scrollTo = jest.fn();

jest.setTimeout(30000);
