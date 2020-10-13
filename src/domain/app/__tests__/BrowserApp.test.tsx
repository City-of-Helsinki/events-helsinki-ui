import React from 'react';

import { render } from '../../../util/testUtils';
import BrowserApp from '../BrowserApp';

it('renders without crashing', () => {
  render(<BrowserApp />);
});
