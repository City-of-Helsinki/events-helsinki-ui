import * as React from 'react';

import { render } from '../../../../util/testUtils';
import DateSelector from '../DateSelector';

test('matches snapshot', () => {
  const { container } = render(
    <DateSelector
      dateTypes={['type1', 'type2']}
      endDate={new Date('2019-12-01')}
      isCustomDate={false}
      name="date"
      onChangeDateTypes={jest.fn()}
      onChangeEndDate={jest.fn()}
      onChangeStartDate={jest.fn()}
      startDate={new Date('2019-11-01')}
      toggleIsCustomDate={jest.fn()}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});
