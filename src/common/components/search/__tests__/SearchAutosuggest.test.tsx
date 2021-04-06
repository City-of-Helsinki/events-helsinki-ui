import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { getKeywordListMock } from '../../../../test/apollo-mocks/keywordListMocks';
import { render, waitFor } from '../../../../test/testUtils';
import SearchAutosuggest, {
  SearchAutosuggestProps,
} from '../SearchAutosuggest';

const searchValue = 'musiikk';

const keywordNames = [
  'musiikki',
  'taidemusiikki',
  'populaarimusiikki',
  'musiikkiklubit',
  'elävä musiikki',
];

const mocks = getKeywordListMock(searchValue, keywordNames);

const defaultProps: SearchAutosuggestProps = {
  label: 'search',
  helperText: 'helperText',
  onSubmit: jest.fn(),
};
const renderComponent = (props?: Partial<SearchAutosuggestProps>) =>
  render(<SearchAutosuggest {...defaultProps} {...props} />, { mocks });

test('should show search suggestions', async () => {
  renderComponent();
  const searchInput = await screen.findByRole('combobox', {
    name: defaultProps.label,
  });
  userEvent.type(searchInput, searchValue);

  const options = await screen.findAllByRole('option', {
    name: new RegExp(searchValue, 'i'),
  });
  expect(options.length).toEqual(keywordNames.length);
});

test('should call onSubmit by text', async () => {
  const onEnter = jest.fn();
  renderComponent({ onSubmit: onEnter });
  const searchInput = await screen.findByRole('combobox', {
    name: defaultProps.label,
  });
  userEvent.type(searchInput, searchValue);
  userEvent.click(screen.getByRole('button', { name: /search/i }));
  await waitFor(() => expect(onEnter).toBeCalledWith(searchValue));
});
