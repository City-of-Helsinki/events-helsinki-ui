import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { userEvent } from '../../../../test/testUtils';
import CopyButton from '../CopyButton';

// `copy-to-clipboard` is not jsdom compatible so we are replacing it with a
// simple function call.
jest.mock('copy-to-clipboard', () => jest.fn());

const testString = 'Test string';
const testLabel = 'Test label';
const testMessage = 'Copied successfully';
const defaultProps = {
  'aria-label': testLabel,
  string: testString,
  successMessage: testMessage,
};
const renderComponent = (props) =>
  render(<CopyButton {...defaultProps} {...props} />);

test('should show success message when copying succeeds that displays for 4 seconds', () => {
  jest.useFakeTimers();

  renderComponent();

  userEvent.click(screen.getByLabelText(testLabel));

  expect(screen.queryByText(testMessage)).toBeInTheDocument();

  // Fast forwards by 4s
  act(() => {
    jest.advanceTimersByTime(4000);
  });

  expect(screen.queryByText(testMessage)).not.toBeInTheDocument();
});

test('should add success class for 4s after a successful copy', () => {
  jest.useFakeTimers();
  const testClass = 'class';
  const testSuccessClass = 'success-class';
  renderComponent({
    className: testClass,
    successClass: testSuccessClass,
  });

  userEvent.click(screen.getByLabelText(testLabel));
  expect(screen.getByLabelText(testLabel)).toHaveClass(
    testClass,
    testSuccessClass
  );

  act(() => {
    jest.advanceTimersByTime(4000);
  });

  expect(screen.getByLabelText(testLabel)).toHaveClass(testClass);
});
