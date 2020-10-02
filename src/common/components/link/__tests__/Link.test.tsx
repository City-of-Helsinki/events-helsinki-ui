import React from 'react';

import { render, screen } from '../../../../util/testUtils';
import Link from '../Link';

it('should be internal link', () => {
  const text = 'Test internal link';

  const { container } = render(
    <Link to="www.test.fi">
      <div>{text}</div>
    </Link>
  );

  expect((container.firstChild as HTMLAnchorElement).rel).toBe('');
  expect(screen.getByText(text)).toBeInTheDocument();
});

it('should be external link', () => {
  const text = 'Test external link';

  const { container } = render(
    <Link isExternal={true} to="www.test.fi">
      <div>{text}</div>
    </Link>
  );
  expect((container.firstChild as HTMLAnchorElement).rel).toBe(
    'noopener noreferrer'
  );
  expect(screen.getByText(text)).toBeInTheDocument();
});
