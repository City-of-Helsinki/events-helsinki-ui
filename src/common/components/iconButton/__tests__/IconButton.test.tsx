import { IconAngleRight } from 'hds-react';
import * as React from 'react';
import renderer from 'react-test-renderer';

import IconButton from '../IconButton';

test('IconButton matches snapshot', () => {
  const component = renderer.create(
    <IconButton ariaLabel="Aria label" icon={<IconAngleRight />} size="small" />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
