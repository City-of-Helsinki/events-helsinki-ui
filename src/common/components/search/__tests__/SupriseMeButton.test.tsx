import * as React from 'react';
import renderer from 'react-test-renderer';

import SupriseMeButton from '../SupriseMeButton';

test('SupriseMeButton matches snapshot', () => {
  const component = renderer.create(<SupriseMeButton onClick={jest.fn()} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
