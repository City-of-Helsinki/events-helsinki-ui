import userEvent from '@testing-library/user-event';
import { utcToZonedTime } from 'date-fns-tz';
import { advanceTo } from 'jest-date-mock';
import React from 'react';

import {
  act,
  actWait,
  configure,
  render,
  screen,
  waitFor,
} from '../../../../test/testUtils';
import DateRangePicker, { DateRangePickerProps } from '../DateRangePicker';

configure({ defaultHidden: true });

const defaultProps: DateRangePickerProps = {
  endDate: null,
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
    screen.getAllByRole('button', { name: /valitse päivämäärä/i })[1]
  );
  userEvent.click(
    screen.getByRole('button', {
      name: /lokakuu 15/i,
    })
  );
  // need to wait one useEffect cycle for date go take effect
  await actWait();

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
    screen.getAllByRole('button', { name: /valitse päivämäärä/i })[0]
  );
  userEvent.click(
    screen.getByRole('button', {
      name: /lokakuu 15/i,
    })
  );
  // need to wait one useEffect cycle for date go take effect
  await actWait();

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
