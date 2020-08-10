import * as React from 'react';
import renderer from 'react-test-renderer';

import TruncatedText from '../TruncatedText';

test('TruncatedText matches snapshot', () => {
  const text = `Text that should be truncated`;
  const component = renderer.create(
    <TruncatedText as="div" maxLength={10} text={text} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
