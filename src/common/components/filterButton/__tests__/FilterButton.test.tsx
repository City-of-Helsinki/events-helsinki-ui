import * as React from 'react';
import renderer from 'react-test-renderer';

import FilterButton from '../FilterButton';

test('FilterButton matches snapshot', () => {
  const component = renderer.create(
    <FilterButton
      onRemove={() => {}}
      text="text"
      type="publisher"
      value="value"
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
