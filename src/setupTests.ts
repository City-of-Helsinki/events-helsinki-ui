import './common/test/test18nInit';
import '@testing-library/jest-dom/extend-expect';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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
          destroy: () => {},
          scheduleUpdate: () => {},
        };
      }
    }
);

configure({ adapter: new Adapter() });
