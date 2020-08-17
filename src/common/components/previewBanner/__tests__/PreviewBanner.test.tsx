import { render } from '@testing-library/react';
import React from 'react';

import PreviewBanner from '../PreviewBanner';

it('matches snapshot', () => {
  const { container } = render(<PreviewBanner />);

  expect(container.firstChild).toMatchSnapshot();
});
