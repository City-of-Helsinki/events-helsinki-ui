import React from 'react';

import { render } from '../../../../test/testUtils';
import PageWrapper from '../PageWrapper';

it('matched snapshot', () => {
  const { container } = render(<PageWrapper />);

  expect(container.firstChild).toMatchSnapshot();
});
