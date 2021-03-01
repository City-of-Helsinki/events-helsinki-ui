import * as React from 'react';

import { MAIN_CONTENT_ID } from '../../../../constants';
import { render } from '../../../../test/testUtils';
import MainContent from '../MainContent';

test('matches snapshot', () => {
  const { container } = render(<MainContent>Main content</MainContent>, {
    routes: [`/fi/test#${MAIN_CONTENT_ID}`],
  });

  expect(container.innerHTML).toMatchSnapshot();
});

test('onScrollFn should be called', () => {
  const onScrollFn = jest.fn();
  render(
    <MainContent onScrollFn={onScrollFn} duration={0}>
      Main content
    </MainContent>,
    {
      routes: [`/fi/test#${MAIN_CONTENT_ID}`],
    }
  );

  expect(onScrollFn).toBeCalledTimes(1);
});

test('onScrollFn should not be called', () => {
  const onScrollFn = jest.fn();
  render(<MainContent onScrollFn={onScrollFn}>Main content</MainContent>, {
    routes: [`/fi/test`],
  });

  expect(onScrollFn).toBeCalledTimes(0);
});
