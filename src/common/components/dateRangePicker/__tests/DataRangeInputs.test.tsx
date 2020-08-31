import { render } from '@testing-library/react';
import * as React from 'react';

import DateRangeInputs from '../DateRangeInputs';

test('DateRangeInputs matches snapshot', () => {
  const { container } = render(
    <DateRangeInputs
      endDateRaw=""
      inputName="test"
      onBlurInput={jest.fn()}
      endDate={null}
      setDatePickerInput={jest.fn()}
      setEndDateRaw={jest.fn()}
      setStartDateRaw={jest.fn()}
      startDate={null}
      startDateRaw=""
      t={(s) => s}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});
