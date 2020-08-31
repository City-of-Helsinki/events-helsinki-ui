import { render } from '@testing-library/react';
import * as React from 'react';

import SupriseMeButton from '../SupriseMeButton';

test('SupriseMeButton matches snapshot', () => {
  const { container } = render(<SupriseMeButton onClick={jest.fn()} />);

  expect(container.firstChild).toMatchSnapshot();
});
