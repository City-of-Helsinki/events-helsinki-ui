import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import { AUTOSUGGEST_TYPES } from '../../../../constants';
import { KeywordListDocument } from '../../../../generated/graphql';
import { fakeKeywords } from '../../../../test/mockDataUtils';
import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  enterKeyPressHelper,
  escKeyPressHelper,
  render,
  tabKeyPressHelper,
} from '../../../../test/testUtils';
import SearchAutosuggest, {
  SearchAutosuggestProps,
} from '../SearchAutosuggest';

const searchValue = 'musiikk';
const placeholder = 'Placeholder text';

const keywordNames = [
  'musiikki',
  'taidemusiikki',
  'populaarimusiikki',
  'musiikkiklubit',
  'elävä musiikki',
];

const keywords = fakeKeywords(
  keywordNames.length,
  keywordNames.map((keyword) => ({ name: { fi: keyword } }))
);
const keywordListResponse = { data: { keywordList: keywords } };

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
const renderComponent = (props?: Partial<SearchAutosuggestProps>) =>
  render(<SearchAutosuggest {...defaultProps} {...props} />, { mocks });

test('should close menu with esc key', async () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText(placeholder);

  await act(wait);

  userEvent.click(searchInput);

  expect(screen.queryByRole('listbox')).toBeInTheDocument();

  escKeyPressHelper();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

test('should close menu with tab key', async () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText(placeholder);

  await act(wait);

  userEvent.click(searchInput);

  expect(screen.queryByRole('listbox')).toBeInTheDocument();

  tabKeyPressHelper();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

test('should allow navigation with down arrows', async () => {
  const { getByPlaceholderText } = renderComponent();
  const searchInput = getByPlaceholderText(placeholder);

  await act(wait);

  userEvent.click(searchInput);

  const options = screen.getAllByRole('option');

  arrowDownKeyPressHelper();
  expect(options[0]).toHaveClass('autosuggestOption--isFocused');
  expect(options[0]).toHaveTextContent(searchValue);

  keywords.data.forEach((keyword, index) => {
    arrowDownKeyPressHelper();
    expect(options[index + 1]).toHaveClass('autosuggestOption--isFocused');
    expect(options[index + 1]).toHaveTextContent(keyword.name.fi);
  });
});

test('should allow navigation with up arrows', async () => {
  const { getByPlaceholderText } = renderComponent();
  const searchInput = getByPlaceholderText(placeholder);

  await act(wait);

  userEvent.click(searchInput);

  const options = screen.getAllByRole('option');

  const reversedKeywords = [...keywords.data].reverse();

  reversedKeywords.forEach((keyword, index) => {
    arrowUpKeyPressHelper();
    expect(options[reversedKeywords.length - index]).toHaveTextContent(
      keyword.name.fi
    );
    expect(options[reversedKeywords.length - index]).toHaveClass(
      'autosuggestOption--isFocused'
    );
  });

  arrowUpKeyPressHelper();
  expect(options[0]).toHaveClass('autosuggestOption--isFocused');
  expect(options[0]).toHaveTextContent(searchValue);
});

test('first item should be focused when opening menu by down arrow', async () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText(placeholder);

  await act(wait);

  userEvent.click(searchInput);

  escKeyPressHelper();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  arrowDownKeyPressHelper();

  const options = screen.getAllByRole('option');

  expect(options[0]).toHaveClass('autosuggestOption--isFocused');
  expect(options[0]).toHaveTextContent(searchValue);
});

test('last item should be focused when opening menu by up arrow', async () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText(placeholder);

  await act(wait);

  userEvent.click(searchInput);

  escKeyPressHelper();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  arrowUpKeyPressHelper();

  const options = screen.getAllByRole('option');
  const lastIndex = keywords.data.length;

  expect(options[lastIndex]).toHaveTextContent(
    keywords.data[lastIndex - 1].name.fi
  );
  expect(options[lastIndex]).toHaveClass('autosuggestOption--isFocused');
});

test('should call onOptionClick by text is no option is selected', async () => {
  const onEnter = jest.fn();
  renderComponent({ onOptionClick: onEnter });
  const searchInput = screen.getByPlaceholderText(placeholder);

  await act(wait);

  userEvent.click(searchInput);

  enterKeyPressHelper();

  expect(onEnter).toBeCalledWith({
    text: searchValue,
    type: AUTOSUGGEST_TYPES.TEXT,
    value: searchValue,
  });
});

test('should call onOptionClick by text is first option is selected', async () => {
  const onEnter = jest.fn();
  renderComponent({ onOptionClick: onEnter });
  const searchInput = screen.getByPlaceholderText(placeholder);

  await act(wait);

  userEvent.click(searchInput);

  arrowDownKeyPressHelper();
  enterKeyPressHelper();

  expect(onEnter).toBeCalledWith({
    text: searchValue,
    type: AUTOSUGGEST_TYPES.TEXT,
    value: searchValue,
  });
});

test('should call onOptionClick with option if keyword is selected', async () => {
  const onEnter = jest.fn();
  renderComponent({ onOptionClick: onEnter });
  const searchInput = screen.getByPlaceholderText(placeholder);

  await act(wait);

  userEvent.click(searchInput);

  arrowDownKeyPressHelper();
  arrowDownKeyPressHelper();
  enterKeyPressHelper();

  expect(onEnter).toBeCalledWith({
    text: keywords.data[0].name.fi,
    type: AUTOSUGGEST_TYPES.KEYWORD,
    value: keywords.data[0].id,
  });
});
