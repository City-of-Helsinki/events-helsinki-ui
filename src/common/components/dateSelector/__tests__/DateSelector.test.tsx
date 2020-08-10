import * as React from 'react';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';

import DateSelector from '../DateSelector';

test('DateSelector matches snapshot', () => {
  const component = renderer.create(
    <MemoryRouter>
      <DateSelector
        dateTypes={['type1', 'type2']}
        endDate={new Date('2019-12-01')}
        isCustomDate={false}
        name="date"
        onChangeDateTypes={() => {}}
        onChangeEndDate={() => {}}
        onChangeStartDate={() => {}}
        startDate={new Date('2019-11-01')}
        toggleIsCustomDate={() => {}}
      />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
