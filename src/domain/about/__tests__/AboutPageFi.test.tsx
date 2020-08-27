import { render } from '@testing-library/react';
import React from 'react';

import AboutPageFi from '../AboutPageFi';

it('matches snapshot', () => {
  const { container } = render(<AboutPageFi />);

  expect(container.firstChild).toMatchSnapshot();
});
