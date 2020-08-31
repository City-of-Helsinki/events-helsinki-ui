import * as React from 'react';
import renderer from 'react-test-renderer';

import { AUTOSUGGEST_TYPES } from '../../../../constants';
import AutosuggestMenu from '../AutosuggestMenu';

test('AutosuggestMenu matches snapshot', () => {
  const component = renderer.create(
    <AutosuggestMenu
      focusedOption={0}
      options={[{ text: 'foo', type: AUTOSUGGEST_TYPES.TEXT, value: 'foo' }]}
      isOpen={true}
      onClose={() => {}}
      onOptionClick={() => {}}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
