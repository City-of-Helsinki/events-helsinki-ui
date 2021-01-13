import { act, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  escKeyPressHelper,
  userEvent,
} from '../../../../util/testUtils';
import RangeDropdown, { RangeDropdownProps } from '../RangeDropdown';

const title = 'test title';

const defaultProps: RangeDropdownProps = {
  checkboxName: 'set_defaults',
  icon: <div />,
  rangeIcon: <div />,
  minInputStartValue: '0',
  minInputValue: '0',
  minInputFixedValue: '18',
  minInputLabel: 'Start integer',
  maxInputEndValue: '100',
  maxInputValue: '100',
  maxInputLabel: 'End integer',
  maxInputFixedValue: '80',
  name: 'range',
  onChange: jest.fn(),
  fixedValuesText: 'Set default values',
  showFixedValuesText: true,
  title: title,
  value: [],
};
const renderComponent = (props?: Partial<RangeDropdownProps>) =>
  render(<RangeDropdown {...defaultProps} {...props} />);

test('test for accessibility violations', async () => {
  const { container } = renderComponent();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

describe('ArrowUp, ArrowDown', () => {
  test('should allow navigation with up and down arrows', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    userEvent.click(toggleButton);

    arrowDownKeyPressHelper();
    arrowDownKeyPressHelper();
    arrowDownKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', {
        name: /set default values/i,
      }).parentElement
    ).toHaveClass('rangeCheckbox--isFocused');

    arrowUpKeyPressHelper();

    expect(
      screen.queryByRole('spinbutton', {
        name: /end integer/i,
      }).parentElement.parentElement
    ).toHaveClass('rangeTextInput--isFocused');
    arrowUpKeyPressHelper();

    expect(
      screen.queryByRole('spinbutton', {
        name: /start integer/i,
      }).parentElement.parentElement
    ).toHaveClass('rangeTextInput--isFocused');
  });
});

test('should select set default values checkbox if the first keyboard navigation is button up', () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  userEvent.click(toggleButton);

  arrowUpKeyPressHelper();

  expect(
    screen.queryByRole('checkbox', {
      name: /set default values/i,
    }).parentElement
  ).toHaveClass('rangeCheckbox--isFocused');
});

test('should reset to min value input when user goes up from set default values checkbox', () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  userEvent.click(toggleButton);

  arrowUpKeyPressHelper();
  arrowDownKeyPressHelper();

  expect(
    screen.queryByRole('spinbutton', {
      name: /start integer/i,
    }).parentElement.parentElement
  ).toHaveClass('rangeTextInput--isFocused');

  expect(
    screen.queryByRole('checkbox', {
      name: /set default values/i,
    }).parentElement
  ).not.toHaveClass('rangeCheckbox--isFocused');
});

describe('Escape', () => {
  test('should close range dropdown with escape', () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    userEvent.click(toggleButton);

    expect(
      screen.queryByRole('spinbutton', {
        name: /start integer/i,
      })
    ).toBeInTheDocument();

    escKeyPressHelper();

    // Assert that we can no longer find the menu content after we have pressed
    // Escape.
    expect(
      screen.queryByRole('spinbutton', {
        name: /start integer/i,
      })
    ).not.toBeInTheDocument();
  });
});

test('should not open dropdown when user focuses toggle button', () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  act(() => toggleButton.focus());

  expect(
    screen.queryByRole('spinbutton', {
      name: /start integer/i,
    })
  ).not.toBeInTheDocument();
});

test('should open dropdown when user clicks on toggle button', () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  userEvent.click(toggleButton);

  expect(
    screen.queryByRole('spinbutton', {
      name: /start integer/i,
    })
  ).toBeInTheDocument();
});

describe('when dropdown has been closed, it should reopen with', () => {
  const getClosedInput = async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    userEvent.click(toggleButton);

    escKeyPressHelper();

    expect(
      screen.queryByRole('spinbutton', {
        name: /start integer/i,
      })
    ).not.toBeInTheDocument();

    expect(toggleButton).toHaveFocus();
  };

  test('ArrowDown', () => {
    getClosedInput();

    arrowDownKeyPressHelper();

    expect(
      screen.queryByRole('spinbutton', {
        name: /start integer/i,
      })
    ).toBeInTheDocument();
  });

  test('ArrowUp', () => {
    getClosedInput();

    arrowDownKeyPressHelper();

    expect(
      screen.queryByRole('spinbutton', {
        name: /start integer/i,
      })
    ).toBeInTheDocument();
  });
});

test('should set default value', () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  userEvent.click(toggleButton);

  const minValueTextbox = screen.queryByRole('spinbutton', {
    name: /start integer/i,
  }) as HTMLInputElement;
  const maxValueTextbox = screen.queryByRole('spinbutton', {
    name: /end integer/i,
  }) as HTMLInputElement;
  const setDefaultsCheckbox = screen.queryByRole('checkbox', {
    name: /set default values/i,
  });

  expect(minValueTextbox).toBeInTheDocument();
  expect(minValueTextbox.value).toBe('0');
  expect(maxValueTextbox).toBeInTheDocument();
  expect(maxValueTextbox.value).toBe('100');
  expect(setDefaultsCheckbox).toBeInTheDocument();

  //click defaults
  userEvent.click(setDefaultsCheckbox);

  expect(minValueTextbox).toHaveAttribute('disabled');
  expect(maxValueTextbox).toHaveAttribute('disabled');

  //todo: for some reason value not changing with disabled attribute
  //expect(minValueTextbox.value).toBe('18');
  //expect(maxValueTextbox.value).toBe('80');
});
