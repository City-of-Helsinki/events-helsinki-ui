import * as React from 'react';

import { render } from '../../../../util/testUtils';
import TopFooter from '../TopFooter';

test('matches snapshot', () => {
  const { container } = render(<TopFooter />);

  expect(container.firstChild).toMatchSnapshot();
});
