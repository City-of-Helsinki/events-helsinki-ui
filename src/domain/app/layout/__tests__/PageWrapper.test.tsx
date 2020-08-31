import { render } from '@testing-library/react';
import React from 'react';

import PageWrapper from '../PageWrapper';

it('matched snapshot', () => {
  const { container } = render(<PageWrapper />);

  expect(container.firstChild).toMatchSnapshot();
});
