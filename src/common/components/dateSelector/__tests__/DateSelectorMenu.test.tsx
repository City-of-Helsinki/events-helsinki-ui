import * as React from 'react';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';

import { DATE_TYPES } from '../../../../constants';
import DateSelectorMenu from '../DateSelectorMenu';

test('DateSelectorMenu matches snapshot', () => {
  const component = renderer.create(
    <MemoryRouter>
      <DateSelectorMenu
        dateTypes={['type1', 'type2']}
        dateTypeOptions={[
          DATE_TYPES.TODAY,
          DATE_TYPES.TOMORROW,
          DATE_TYPES.THIS_WEEK,
          DATE_TYPES.WEEKEND,
        ]}
        endDate={new Date('2019-09-31')}
        isCustomDate={false}
        isOpen={true}
        name="date"
        onChangeDateTypes={() => {}}
        onChangeEndDate={() => {}}
        onChangeStartDate={() => {}}
        onCloseMenu={() => {}}
        startDate={new Date('2019-08-01')}
        toggleIsCustomDate={() => {}}
      />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
