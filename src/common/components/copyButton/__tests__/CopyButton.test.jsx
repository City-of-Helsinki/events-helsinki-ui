import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';

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
const getWrapper = props => render(<CopyButton {...defaultProps} {...props} />);

test('should show success message when copying succeeds that displays for 4 seconds', () => {
  jest.useFakeTimers();

  const { getByLabelText, queryByText } = getWrapper();

  fireEvent.click(getByLabelText(testLabel));

  expect(queryByText(testMessage)).not.toEqual(null);

  // Fast forwards by 4s
  act(() => {
    jest.advanceTimersByTime(4000);
  });

  expect(queryByText(testMessage)).toEqual(null);
});

test('should add success class for 4s after a successful copy', () => {
  jest.useFakeTimers();
  const testClass = 'class';
  const testSuccessClass = 'success-class';
  const { getByLabelText } = getWrapper({
    className: testClass,
    successClass: testSuccessClass,
  });

  fireEvent.click(getByLabelText(testLabel));
  expect(getByLabelText(testLabel)).toHaveClass(testClass, testSuccessClass);

  act(() => {
    jest.advanceTimersByTime(4000);
  });

  expect(getByLabelText(testLabel)).toHaveClass(testClass);
});
