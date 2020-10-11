import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DateRangeInputs, { DateRangeInputsProps } from '../DateRangeInputs';

const defaultProps = {
  endDateRaw: '',
  inputName: 'test',
  onBlurInput: jest.fn(),
  endDate: null,
  setDatePickerInput: jest.fn(),
  setEndDateRaw: jest.fn(),
  setStartDateRaw: jest.fn(),
  startDate: null,
  startDateRaw: '',
};

const renderComponent = (props?: Partial<DateRangeInputsProps>) =>
  render(<DateRangeInputs {...defaultProps} {...props} />);

test('should call setStartDateRaw', () => {
  const setStartDateRaw = jest.fn();
  renderComponent({ setStartDateRaw });

  const startDateInput = screen.getByRole('textbox', { name: /alkamispäivä/i });
  const startDate = '12.12.2020';
  userEvent.type(startDateInput, startDate);

  expect(setStartDateRaw).toBeCalled();
});

test('should call setEndDateRaw', () => {
  const setEndDateRaw = jest.fn();
  renderComponent({ setEndDateRaw });

  const endDateInput = screen.getByRole('textbox', {
    name: /loppumispäivä/i,
  });

  const endDate = '12.12.2020';
  userEvent.type(endDateInput, endDate);

  expect(setEndDateRaw).toBeCalled();
});
