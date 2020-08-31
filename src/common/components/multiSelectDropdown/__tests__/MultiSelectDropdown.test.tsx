import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import wait from 'waait';

import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  enterKeyPressHelper,
  escKeyPressHelper,
} from '../../../../util/testUtils';
import MultiSelectDropdown, {
  MultiselectDropdownProps,
} from '../MultiSelectDropdown';

const onChange = jest.fn();
const options = [
  {
    text: 'Squirrel',
    value: 'value1',
  },
  {
    text: 'Elephant',
    value: 'value2',
  },
  {
    text: 'Dog',
    value: 'value3',
  },
];
const title = 'test title';
const inputPlaceholder = 'Kirjoita hakusana';

const defaultProps: MultiselectDropdownProps = {
  checkboxName: 'multiselect-dropdown',
  icon: <div />,
  inputPlaceholder,
  name: 'test MultiSelectDropdown',
  onChange,
  options,
  showSearch: true,
  title,
  value: [],
};
const getWrapper = (props?: Partial<MultiselectDropdownProps>) =>
  render(<MultiSelectDropdown {...defaultProps} {...props} />);

test('should set focus to input after clicking toggle button', async () => {
  getWrapper();

  const toggleButton = screen.getByRole('button', { name: title });
  fireEvent.click(toggleButton);

  const searchInput = screen.getByPlaceholderText(inputPlaceholder);

  await waitFor(() => {
    expect(searchInput).toHaveFocus();
  });
});

test('should filter results based on user search and options[].text field', async () => {
  getWrapper();

  const toggleButton = screen.getByRole('button', { name: title });
  fireEvent.click(toggleButton);

  const searchInput = screen.getByPlaceholderText(inputPlaceholder);
  fireEvent.change(searchInput, { target: { value: 'Ele' } });

  await wait();

  expect(screen.queryByLabelText('Elephant')).not.toEqual(null);
  expect(screen.queryByLabelText('Dog')).toEqual(null);
  expect(screen.queryByLabelText('Squirrel')).toEqual(null);
});

test('should reset keyboard navigation position after a new search', async () => {
  getWrapper();

  const toggleButton = screen.getByRole('button', { name: title });
  fireEvent.click(toggleButton);

  const searchInput = screen.getByPlaceholderText(inputPlaceholder);
  act(() => searchInput.focus());

  arrowDownKeyPressHelper();

  expect(
    (screen.getByLabelText(options[0].text).parentElement as HTMLElement)
      .parentElement
  ).toHaveClass('dropdownItem--isFocused');

  // Find something, then reset the search to ensure that all results are listed
  fireEvent.change(searchInput, { target: { value: 'Ele' } });
  fireEvent.change(searchInput, { target: { value: '' } });

  const allOptions = options.map(({ text }) => text);

  // No element should have focus
  allOptions.forEach(text => {
    expect(
      (screen.getByLabelText(text).parentElement as HTMLElement).parentElement
    ).not.toHaveClass('dropdownItem--isFocused');
  });
});

describe('ArrowUp, ArrowDown', () => {
  test('should allow navigation with up and down arrows', async () => {
    getWrapper();

    const toggleButton = screen.getByRole('button', { name: title });
    fireEvent.click(toggleButton);
    act(() => toggleButton.focus());

    arrowDownKeyPressHelper();
    arrowDownKeyPressHelper();

    expect(
      (screen.getByLabelText(options[1].text).parentElement as HTMLElement)
        .parentElement
    ).toHaveClass('dropdownItem--isFocused');

    arrowUpKeyPressHelper();

    expect(
      (screen.getByLabelText(options[0].text).parentElement as HTMLElement)
        .parentElement
    ).toHaveClass('dropdownItem--isFocused');
  });

  test('should select last item if the first keyboard navigation is button up', () => {
    getWrapper();

    const toggleButton = screen.getByRole('button', { name: title });
    fireEvent.click(toggleButton);
    act(() => toggleButton.focus());

    arrowUpKeyPressHelper();

    expect(
      (screen.getByLabelText(options[options.length - 1].text)
        .parentElement as HTMLElement).parentElement
    ).toHaveClass('dropdownItem--isFocused');
  });

  test('should reset to start position when user goes up in the first member of the list', () => {
    getWrapper();

    const toggleButton = screen.getByRole('button', { name: title });
    fireEvent.click(toggleButton);
    act(() => toggleButton.focus());

    arrowDownKeyPressHelper();
    arrowUpKeyPressHelper();

    const allOptions = options.map(({ text }) => text);

    // No element should have focus
    allOptions.forEach(text => {
      expect(screen.getByLabelText(text).parentElement).not.toHaveClass(
        'dropdownItem--isFocused'
      );
    });
  });

  test('should reset to start position when user goes down from the last member of the list', () => {
    getWrapper();

    const toggleButton = screen.getByRole('button', { name: title });
    fireEvent.click(toggleButton);
    act(() => toggleButton.focus());

    options.forEach(() => {
      arrowDownKeyPressHelper();
    });
    // After we have selected the last item, press down once more to reset the
    // selection.
    arrowDownKeyPressHelper();

    const allOptions = options.map(({ text }) => text);

    // No element should have focus
    allOptions.forEach(text => {
      expect(screen.getByLabelText(text).parentElement).not.toHaveClass(
        'dropdownItem--isFocused'
      );
    });
  });
});

describe('Escape', () => {
  test('should close suggestions with escape', () => {
    getWrapper();

    const toggleButton = screen.getByRole('button', { name: title });
    fireEvent.click(toggleButton);
    act(() => toggleButton.focus());

    // Check that we can find some of the content of the MultiSelectDropdown: this suggests
    // that it is open.
    expect(screen.queryByLabelText(options[0].text)).not.toEqual(null);

    escKeyPressHelper();

    // Assert that we can no longer find the menu content after we have pressed
    // Escape.
    expect(screen.queryByLabelText(options[0].text)).toEqual(null);
  });
});

test('should not open dropdown when user focuses toggle button', () => {
  getWrapper();

  const toggleButton = screen.getByRole('button', { name: title });
  act(() => toggleButton.focus());

  expect(screen.queryByLabelText(options[0].text)).toEqual(null);
});

test('should open dropdown when user clicks on toggle button', () => {
  getWrapper();

  const toggleButton = screen.getByRole('button', { name: title });
  fireEvent.click(toggleButton);

  expect(screen.queryByLabelText(options[0].text)).not.toEqual(null);
});

describe('when dropdown has been closed, it should reopen with', () => {
  const getClosedInput = async () => {
    const helpers = getWrapper();

    const toggleButton = screen.getByRole('button', { name: title });
    fireEvent.click(toggleButton);
    act(() => toggleButton.focus());

    escKeyPressHelper();

    expect(screen.queryByLabelText(options[0].text)).toEqual(null);
    expect(toggleButton).toHaveFocus();

    return helpers;
  };

  test('Enter', () => {
    getClosedInput();

    enterKeyPressHelper();

    expect(screen.queryByLabelText(options[0].text)).not.toEqual(null);
  });

  test('ArrowDown', () => {
    getClosedInput();

    arrowDownKeyPressHelper();

    expect(screen.queryByLabelText(options[0].text)).not.toEqual(null);
  });

  test('ArrowUp', () => {
    getClosedInput();

    arrowDownKeyPressHelper();

    expect(screen.queryByLabelText(options[0].text)).not.toEqual(null);
  });
});
