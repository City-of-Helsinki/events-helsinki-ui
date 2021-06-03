import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import wait from 'waait';

import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  enterKeyPressHelper,
  escKeyPressHelper,
  userEvent,
} from '../../../../test/testUtils';
import translations from '../../../translation/i18n/fi.json';
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
const renderComponent = (props?: Partial<MultiselectDropdownProps>) =>
  render(<MultiSelectDropdown {...defaultProps} {...props} />);

test('for accessibility violations', async () => {
  const { container } = renderComponent();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('should set focus to input after clicking toggle button', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  userEvent.click(toggleButton);

  const searchInput = screen.getByPlaceholderText(inputPlaceholder);

  await waitFor(() => {
    expect(searchInput).toHaveFocus();
  });
});

test('should filter results based on user search and options[].text field', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  userEvent.click(toggleButton);

  const searchInput = screen.getByPlaceholderText(inputPlaceholder);
  userEvent.type(searchInput, 'Ele');

  await wait();

  expect(
    screen.queryByRole('checkbox', { name: 'Elephant' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('checkbox', { name: 'Dox' })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('checkbox', { name: 'Squirrel' })
  ).not.toBeInTheDocument();
});

test('should reset keyboard navigation position after a new search', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  fireEvent.click(toggleButton);

  const searchInput = screen.getByPlaceholderText(inputPlaceholder);
  act(() => searchInput.focus());

  arrowDownKeyPressHelper();

  expect(
    (screen.getByRole('checkbox', { name: options[0].text })
      .parentElement as HTMLElement).parentElement
  ).toHaveClass('dropdownItem--isFocused');

  // Find something, then reset the search to ensure that all results are listed
  fireEvent.change(searchInput, { target: { value: 'Ele' } });
  fireEvent.change(searchInput, { target: { value: '' } });

  const allOptions = options.map(({ text }) => text);

  // No element should have focus
  allOptions.forEach((text) => {
    expect(
      (screen.getByRole('checkbox', { name: text })
        .parentElement as HTMLElement).parentElement
    ).not.toHaveClass('dropdownItem--isFocused');
  });
});

describe('ArrowUp, ArrowDown', () => {
  test('should allow navigation with up and down arrows', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    userEvent.click(toggleButton);

    arrowDownKeyPressHelper();
    arrowDownKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[1].text }).parentElement
        .parentElement
    ).toHaveClass('dropdownItem--isFocused');

    arrowUpKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[0].text }).parentElement
        .parentElement
    ).toHaveClass('dropdownItem--isFocused');
  });

  test('should select last item if the first keyboard navigation is button up', () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    userEvent.click(toggleButton);

    arrowUpKeyPressHelper();

    expect(
      screen.getByRole('checkbox', { name: options[options.length - 1].text })
        .parentElement.parentElement
    ).toHaveClass('dropdownItem--isFocused');
  });

  test('should reset to start position when user goes up in the first member of the list', () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    userEvent.click(toggleButton);

    arrowDownKeyPressHelper();
    arrowUpKeyPressHelper();

    // No element should have focus
    options.forEach((option) => {
      expect(
        screen.getByRole('checkbox', { name: option.text }).parentElement
      ).not.toHaveClass('dropdownItem--isFocused');
    });
  });

  test('should reset to start position when user goes down from the last member of the list', () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    userEvent.click(toggleButton);

    // After we have selected the last item, press down once more to reset the
    // selection.
    arrowDownKeyPressHelper();

    // No element should have focus
    options.forEach((option) => {
      expect(
        screen.getByRole('checkbox', { name: option.text }).parentElement
      ).not.toHaveClass('dropdownItem--isFocused');
    });
  });
});

describe('Escape', () => {
  test('should close suggestions with escape', () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    userEvent.click(toggleButton);

    // Check that we can find some of the content of the MultiSelectDropdown: this suggests
    // that it is open.
    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).toBeInTheDocument();

    escKeyPressHelper();

    // Assert that we can no longer find the menu content after we have pressed
    // Escape.
    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).not.toBeInTheDocument();
  });
});

test('should not open dropdown when user focuses toggle button', () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  act(() => toggleButton.focus());

  expect(
    screen.queryByRole('checkbox', { name: options[0].text })
  ).not.toBeInTheDocument();
});

test('should open dropdown when user clicks on toggle button', () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  userEvent.click(toggleButton);

  expect(
    screen.queryByRole('checkbox', { name: options[0].text })
  ).toBeInTheDocument();
});

test('should call onChange when clicking checkbox', () => {
  const onChange = jest.fn();
  renderComponent({ onChange });

  const toggleButton = screen.getByRole('button', { name: title });
  userEvent.click(toggleButton);

  userEvent.click(screen.queryByRole('checkbox', { name: options[0].text }));
  expect(onChange).toBeCalledWith([options[0].value]);
});

test('should uncheck option', () => {
  const onChange = jest.fn();
  renderComponent({ onChange, value: [options[0].value] });

  const toggleButton = screen.getByRole('button', { name: title });
  userEvent.click(toggleButton);

  userEvent.click(screen.queryByRole('checkbox', { name: options[0].text }));
  expect(onChange).toBeCalledWith([]);
});

test('should call onChange with empty array when clicking select all checkbox', () => {
  const onChange = jest.fn();
  renderComponent({
    onChange,
    selectAllText: '',
    showSelectAll: true,
    value: [options[0].value],
  });

  const toggleButton = screen.getByRole('button', { name: title });
  userEvent.click(toggleButton);

  userEvent.click(
    screen.queryByRole('checkbox', {
      name: translations.commons.multiSelectDropdown.selectAll,
    })
  );
  expect(onChange).toBeCalledWith([]);
});

test('should show selected text for single value', () => {
  renderComponent({ value: [options[0].value] });

  expect(screen.queryByText(options[0].text)).toBeInTheDocument();
});

test('should show selected text for single value 2', () => {
  renderComponent({ value: [options[0].value, options[1].value] });

  expect(screen.queryByText(`${options[1].text} + 1`)).toBeInTheDocument();
});

describe('when dropdown has been closed, it should reopen with', () => {
  const getClosedInput = async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    userEvent.click(toggleButton);

    escKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).not.toBeInTheDocument();

    expect(toggleButton).toHaveFocus();
  };

  test('Enter', () => {
    getClosedInput();

    enterKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).toBeInTheDocument();
  });

  test('ArrowDown', () => {
    getClosedInput();

    arrowDownKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).toBeInTheDocument();
  });

  test('ArrowUp', () => {
    getClosedInput();

    arrowDownKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).toBeInTheDocument();
  });
});
