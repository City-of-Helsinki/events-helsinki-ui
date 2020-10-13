import './test/test18nInit';
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom/extend-expect';

// Mock scrollTo function
window.scrollTo = jest.fn();

jest.mock(
  'popper.js',
  () =>
    class Popper {
      static placements = [
        'auto',
        'auto-end',
        'auto-start',
        'bottom',
        'bottom-end',
        'bottom-start',
        'left',
        'left-end',
        'left-start',
        'right',
        'right-end',
        'right-start',
        'top',
        'top-end',
        'top-start',
      ];

      constructor() {
        return {
          destroy: () => undefined,
          scheduleUpdate: () => undefined,
        };
      }
    }
);

jest.setTimeout(30000);
