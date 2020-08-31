import * as React from 'react';
import renderer from 'react-test-renderer';

import DateRangeInputs from '../DateRangeInputs';

test('DateRangeInputs matches snapshot', () => {
  const component = renderer.create(
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
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
