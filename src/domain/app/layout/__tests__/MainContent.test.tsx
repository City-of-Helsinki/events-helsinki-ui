import * as React from 'react';

import { render } from '../../../../util/testUtils';
import MainContent from '../MainContent';

test('matches snapshot', () => {
  const { container } = render(<MainContent>Main content</MainContent>);

  expect(container.innerHTML).toMatchSnapshot();
});
