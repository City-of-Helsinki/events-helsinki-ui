import * as React from 'react';
import renderer from 'react-test-renderer';

import ToggleButton from '../ToggleButton';

test('ToggleButton matches snapshot', () => {
  const component = renderer.create(
    <ToggleButton
      isSelected={true}
      onClick={() => {}}
      text={'Test button'}
      value={'test'}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
