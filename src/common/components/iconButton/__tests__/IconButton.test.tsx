import { render, screen } from '@testing-library/react';
import { IconAngleRight } from 'hds-react';
import * as React from 'react';

import IconButton from '../IconButton';

const ariaLabel = 'aria label';

test('should render icon button', () => {
  render(<IconButton ariaLabel={ariaLabel} icon={<IconAngleRight />} />);

  expect(screen.getByRole('button', { name: ariaLabel })).toBeInTheDocument();
});
