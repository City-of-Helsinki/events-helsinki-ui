import * as React from 'react';
import renderer from 'react-test-renderer';

import NoResultsInfo from '../NoResultsInfo';

test('NoResultsInfo matches snapshot', () => {
  const component = renderer.create(<NoResultsInfo />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
