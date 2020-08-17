import { render, screen } from '@testing-library/react';
import React from 'react';

import TruncatedText from '../TruncatedText';

it('matches snapshot', async () => {
  const text = `Text that should be truncated`;
  const { container } = render(
    <TruncatedText as="div" maxLength={10} text={text} />
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('component type is set correctly', async () => {
  const text = `Text that should be truncated`;
  const { container, rerender } = render(<TruncatedText text={text} />);

  expect((container.firstChild as HTMLElement).tagName).toBe('DIV');

  rerender(<TruncatedText as="p" text={text} />);
  expect((container.firstChild as HTMLElement).tagName).toBe('P');

  rerender(<TruncatedText as="span" text={text} />);
  expect((container.firstChild as HTMLElement).tagName).toBe('SPAN');
});
