import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import wait from 'waait';

import { AUTOSUGGEST_TYPES } from '../../../../constants';
import keywordListResponse from '../../../../domain/keyword/__mocks__/keywordListResponse';
import { KeywordListDocument } from '../../../../generated/graphql';
import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  enterKeyPressHelper,
  escKeyPressHelper,
} from '../../../../util/testUtils';
import SearchAutosuggest, {
  SearchAutosuggestProps,
} from '../SearchAutosuggest';

const searchValue = 'jazz';
const placeholder = 'Placeholder text';

const mocks = [
  {
    request: {
      query: KeywordListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 5,
        text: searchValue,
      },
    },
    result: keywordListResponse,
  },
];

const defaultProps = {
  name: 'search',
  onChangeSearchValue: jest.fn(),
  onOptionClick: jest.fn(),
  placeholder,
  searchValue,
};
const getWrapper = (props?: Partial<SearchAutosuggestProps>) =>
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <SearchAutosuggest {...defaultProps} {...props} />
    </MockedProvider>
  );

test('matches snapshot', async () => {
  const { container } = getWrapper();

  await wait();

  expect(container.innerHTML).toMatchSnapshot();
});

test('should open menu after typing search value', async () => {
  const { getByPlaceholderText } = getWrapper({ searchValue: '' });
  const searchInput = getByPlaceholderText(placeholder);

  await wait();
  userEvent.click(searchInput);

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  userEvent.type(searchInput, searchValue);

  expect(screen.queryByRole('listbox')).toBeInTheDocument();
});

test('should close menu with esc key', async () => {
  const { getByPlaceholderText } = getWrapper();
  const searchInput = getByPlaceholderText(placeholder);

  await wait();
  userEvent.click(searchInput);

  expect(screen.queryByRole('listbox')).toBeInTheDocument();

  escKeyPressHelper();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

test('should allow navigation with down arrows', async () => {
  const { getByPlaceholderText } = getWrapper();
  const searchInput = getByPlaceholderText(placeholder);

  await wait();
  userEvent.click(searchInput);

  const options = screen.getAllByRole('option');

  arrowDownKeyPressHelper();
  expect(options[0]).toHaveClass('autosuggestOption--isFocused');
  expect(options[0]).toHaveTextContent(searchValue);

  keywordListResponse.data.keywordList.data.forEach((keyword, index) => {
    arrowDownKeyPressHelper();
    expect(options[index + 1]).toHaveClass('autosuggestOption--isFocused');
    expect(options[index + 1]).toHaveTextContent(keyword.name.fi);
  });
});

test('should allow navigation with up arrows', async () => {
  const { getByPlaceholderText } = getWrapper();
  const searchInput = getByPlaceholderText(placeholder);

  await wait();
  userEvent.click(searchInput);

  const options = screen.getAllByRole('option');

  const keywords = [...keywordListResponse.data.keywordList.data].reverse();

  keywords.forEach((keyword, index) => {
    arrowUpKeyPressHelper();
    expect(options[keywords.length - index]).toHaveTextContent(keyword.name.fi);
    expect(options[keywords.length - index]).toHaveClass(
      'autosuggestOption--isFocused'
    );
  });

  arrowUpKeyPressHelper();
  expect(options[0]).toHaveClass('autosuggestOption--isFocused');
  expect(options[0]).toHaveTextContent(searchValue);
});

test('first item should be focused when opening menu by down arrow', async () => {
  const { getByPlaceholderText } = getWrapper();
  const searchInput = getByPlaceholderText(placeholder);

  await wait();
  userEvent.click(searchInput);

  escKeyPressHelper();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  arrowDownKeyPressHelper();

  const options = screen.getAllByRole('option');

  expect(options[0]).toHaveClass('autosuggestOption--isFocused');
  expect(options[0]).toHaveTextContent(searchValue);
});

test('last item should be focused when opening menu by up arrow', async () => {
  const { getByPlaceholderText } = getWrapper();
  const searchInput = getByPlaceholderText(placeholder);

  await wait();
  userEvent.click(searchInput);

  escKeyPressHelper();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  arrowUpKeyPressHelper();

  const options = screen.getAllByRole('option');
  const lastIndex = keywordListResponse.data.keywordList.data.length;

  expect(options[lastIndex]).toHaveTextContent(
    keywordListResponse.data.keywordList.data[lastIndex - 1].name.fi
  );
  expect(options[lastIndex]).toHaveClass('autosuggestOption--isFocused');
});

test('should call onOptionClick by pressing enter', async () => {
  const onEnter = jest.fn();
  const { getByPlaceholderText } = getWrapper({ onOptionClick: onEnter });
  const searchInput = getByPlaceholderText(placeholder);

  await wait();
  userEvent.click(searchInput);

  arrowDownKeyPressHelper();
  enterKeyPressHelper();

  expect(onEnter).toBeCalledTimes(1);
  expect(onEnter).toBeCalledWith({
    text: searchValue,
    type: AUTOSUGGEST_TYPES.SEARCH,
    value: searchValue,
  });

  arrowDownKeyPressHelper();
  arrowDownKeyPressHelper();
  enterKeyPressHelper();

  expect(onEnter).toBeCalledTimes(2);
  expect(onEnter).toBeCalledWith({
    text: keywordListResponse.data.keywordList.data[0].name.fi,
    type: AUTOSUGGEST_TYPES.KEYWORD,
    value: keywordListResponse.data.keywordList.data[0].id,
  });
});
