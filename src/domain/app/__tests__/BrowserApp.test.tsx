import React from 'react';

import { render } from '../../../test/testUtils';
import BrowserApp from '../BrowserApp';

it('renders without crashing', () => {
  render(<BrowserApp />);
});
