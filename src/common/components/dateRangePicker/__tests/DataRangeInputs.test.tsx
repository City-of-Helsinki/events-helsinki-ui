import * as React from 'react';
import renderer from 'react-test-renderer';

import DateRangeInputs from '../DateRangeInputs';

test('DateRangeInputs matches snapshot', () => {
  const component = renderer.create(
    <DateRangeInputs
      endDateRaw=""
      onBlurInput={(re, value) => {}}
      setCounter={counter => {}}
      endDate={null}
      setEndDateRaw={val => {}}
      setStartDateRaw={val => {}}
      startDate={null}
      startDateRaw=""
      t={s => s}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
