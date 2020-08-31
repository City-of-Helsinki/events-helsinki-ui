import * as React from 'react';

import { render } from '../../../../util/testUtils';
import BottomFooter from '../BottomFooter';

test('matches snapshot', () => {
  const { container } = render(<BottomFooter />);

  expect(container.firstChild).toMatchSnapshot();
});
