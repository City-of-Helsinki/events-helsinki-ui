import React from 'react';

import { render } from '../../../../../util/testUtils';
import Navbar from '../Navbar';

it('matches snapshot', () => {
  const { container } = render(<Navbar />);

  expect(container.firstChild).toMatchSnapshot();
});
