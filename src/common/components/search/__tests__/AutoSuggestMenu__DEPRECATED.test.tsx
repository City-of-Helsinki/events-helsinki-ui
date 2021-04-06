import { render } from '@testing-library/react';
import * as React from 'react';

import { AUTOSUGGEST_TYPES__DEPRECATED } from '../../../../constants';
import AutosuggestMenu from '../AutosuggestMenu__DEPRECATED';

test('AutosuggestMenu matches snapshot', () => {
  const { container } = render(
    <AutosuggestMenu
      focusedOption={0}
      options={[
        { text: 'foo', type: AUTOSUGGEST_TYPES__DEPRECATED.TEXT, value: 'foo' },
      ]}
      isOpen={true}
      onClose={jest.fn()}
      onOptionClick={jest.fn()}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});
