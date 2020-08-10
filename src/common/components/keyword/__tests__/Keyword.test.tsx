import * as React from 'react';
import renderer from 'react-test-renderer';

import Keyword from '../Keyword';

test('Keyword matches snapshot', () => {
  const component = renderer.create(<Keyword keyword="test keyword" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
