import { render } from '@testing-library/react';
import React from 'react';

import AboutPageEn from '../AboutPageEn';

it('matches snapshot', () => {
  const { container } = render(<AboutPageEn />);

  expect(container.firstChild).toMatchSnapshot();
});
