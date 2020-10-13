import { render } from '@testing-library/react';
import * as React from 'react';

import NoResultsInfo from '../NoResultsInfo';

test('matches snapshot', () => {
  const { container } = render(<NoResultsInfo />);

  expect(container.firstChild).toMatchSnapshot();
});
