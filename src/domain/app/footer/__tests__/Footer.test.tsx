import * as React from 'react';

import { render } from '../../../../util/testUtils';
import Footer from '../Footer';

test('matches snapshot', () => {
  const { container } = render(<Footer />);

  expect(container.firstChild).toMatchSnapshot();
});
