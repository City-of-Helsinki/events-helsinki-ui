import userEvent from '@testing-library/user-event';
import { utcToZonedTime } from 'date-fns-tz';
import { advanceTo } from 'jest-date-mock';
import React from 'react';

import {
  act,
  configure,
  render,
  screen,
  waitFor,
} from '../../../../test/testUtils';
import DateRangePicker, { DateRangePickerProps } from '../DateRangePicker';

configure({ defaultHidden: true });

const defaultProps: DateRangePickerProps = {
  endDate: null,
  isMenuOpen: true,
  name: 'date-range-picker',
  onChangeEndDate: jest.fn(),
  onChangeStartDate: jest.fn(),
  startDate: null,
};

const renderComponent = (props?: Partial<DateRangePickerProps>) =>
  render(<DateRangePicker {...defaultProps} {...props} />);

test('should call onChangeEndDate', async () => {
  advanceTo('2020-10-10');
  const endDate = new Date('2020-10-10');
  const onChangeEndDate = jest.fn();
  renderComponent({ endDate, onChangeEndDate });

  const endDateInput = screen.getByRole('textbox', {
    name: /loppumispäivä/i,
  });

  const endDateStr = '12.10.2020';
  userEvent.click(endDateInput);
  userEvent.clear(endDateInput);
  userEvent.type(endDateInput, endDateStr);

  const startDateInput = screen.getByRole('textbox', {
    name: /alkamispäivä/i,
  });
  act(() => userEvent.click(startDateInput));

  await waitFor(() => {
    expect(onChangeEndDate).toBeCalledWith(
      utcToZonedTime(new Date('2020-10-12'), 'UTC')
    );
  });
});

test('should call onChangeEndDate with old end date when starting to select past date', async () => {
  advanceTo('2020-10-10');
  const endDate = new Date('2020-10-10');
  const onChangeEndDate = jest.fn();
  renderComponent({ endDate, onChangeEndDate });

  const endDateInput = screen.getByRole('textbox', {
    name: /loppumispäivä/i,
  });

  const endDateStr = '12.12.2019';
  userEvent.click(endDateInput);
  userEvent.clear(endDateInput);
  userEvent.type(endDateInput, endDateStr);

  const startDateInput = screen.getByRole('textbox', {
    name: /alkamispäivä/i,
  });
  act(() => userEvent.click(startDateInput));

  await waitFor(() => {
    expect(onChangeEndDate).toBeCalledWith(endDate);
    expect(startDateInput).toHaveFocus();
  });
});

test('should call onChangeEndDate with clicking date', async () => {
  advanceTo('2020-10-10');
  const endDate = new Date('2020-10-10');
  const onChangeEndDate = jest.fn();
  renderComponent({ endDate, onChangeEndDate });

  const endDateInput = screen.getByRole('textbox', {
    name: /loppumispäivä/i,
  });

  userEvent.click(endDateInput);
  userEvent.click(
    screen.getByRole('button', {
      name: /Valitse torstaina 15\. lokakuuta 2020/i,
    })
  );

  const startDateInput = screen.getByRole('textbox', {
    name: /alkamispäivä/i,
  });
  act(() => userEvent.click(startDateInput));

  await waitFor(() =>
    expect(onChangeEndDate).toBeCalledWith(
      utcToZonedTime(new Date('2020-10-15'), 'UTC')
    )
  );
});

test('should call onChangeStartDate', async () => {
  advanceTo('2020-10-10');
  const startDate = new Date('2020-10-10');
  const onChangeStartDate = jest.fn();
  renderComponent({ startDate, onChangeStartDate });

  const startDateInput = screen.getByRole('textbox', {
    name: /alkamispäivä/i,
  });

  const startDateStr = '12.10.2020';
  userEvent.click(startDateInput);
  userEvent.clear(startDateInput);
  userEvent.type(startDateInput, startDateStr);

  const endDateInput = screen.getByRole('textbox', {
    name: /loppumispäivä/i,
  });
  act(() => userEvent.click(endDateInput));

  await waitFor(() =>
    expect(onChangeStartDate).toBeCalledWith(
      utcToZonedTime(new Date('2020-10-12'), 'UTC')
    )
  );
});

test('should call onChangeStartDate with old end date when starting to select past date', async () => {
  advanceTo('2020-10-10');
  const startDate = new Date('2020-10-10');
  const onChangeStartDate = jest.fn();
  renderComponent({ startDate, onChangeStartDate });

  const startDateInput = screen.getByRole('textbox', {
    name: /alkamispäivä/i,
  });

  const startDateStr = '12.12.2019';
  userEvent.click(startDateInput);
  userEvent.clear(startDateInput);
  userEvent.type(startDateInput, startDateStr);

  const endDateInput = screen.getByRole('textbox', {
    name: /loppumispäivä/i,
  });
  act(() => userEvent.click(endDateInput));

  await waitFor(() => expect(onChangeStartDate).toBeCalledWith(startDate));
});

test('should call onChangeStartDate with clicking date', async () => {
  advanceTo('2020-10-10');
  const startDate = new Date('2020-10-10');
  const onChangeStartDate = jest.fn();
  renderComponent({ startDate, onChangeStartDate });

  const startDateInput = screen.getByRole('textbox', {
    name: /alkamispäivä/i,
  });
  userEvent.click(startDateInput);

  userEvent.click(
    screen.getByRole('button', {
      name: /Valitse torstaina 15\. lokakuuta 2020/i,
    })
  );

  const endDateInput = screen.getByRole('textbox', {
    name: /loppumispäivä/i,
  });
  act(() => userEvent.click(endDateInput));

  await waitFor(() =>
    expect(onChangeStartDate).toBeCalledWith(
      utcToZonedTime(new Date('2020-10-15'), 'UTC')
    )
  );
});
