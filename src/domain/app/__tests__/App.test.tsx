import React from 'react';

import { actWait, render } from '../../../test/testUtils';
import App from '../App';

it('renders without crashing', async () => {
  render(<App />);
  await actWait();
});
