import { render } from '@testing-library/react';
import React from 'react';

import AboutPageSv from '../AboutPageSv';

it('matches snapshot', () => {
  const { container } = render(<AboutPageSv />);

  expect(container.firstChild).toMatchSnapshot();
});
