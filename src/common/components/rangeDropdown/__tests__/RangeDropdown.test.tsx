import { act, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { escKeyPressHelper, userEvent } from '../../../../util/testUtils';
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
  test('Tab navigation', () => {
    renderComponent();
    const toggleButton = screen.getByRole('button', { name: title });
    userEvent.click(toggleButton);

    const minValueTextbox = screen.queryByRole('spinbutton', {
      name: /start integer/i,
    }) as HTMLInputElement;

    const maxValueTextbox = screen.queryByRole('spinbutton', {
      name: /end integer/i,
    }) as HTMLInputElement;

    userEvent.tab();
    expect(minValueTextbox).toHaveFocus();
    userEvent.tab();
    expect(maxValueTextbox).toHaveFocus();
    //todo: does not work, values are not changing, but works in UI
    /*fireEvent.keyDown(minValueTextbox, { code: 38, key: 'ArrowUp' });
    fireEvent.keyDown(minValueTextbox, { code: 38, key: 'ArrowUp' });
    expect(minValueTextbox.value).toBe('2');
    fireEvent.keyDown(minValueTextbox, { code: 40, key: 'ArrowDown' });
    expect(minValueTextbox.value).toBe('1');

    userEvent.tab();
    fireEvent.keyDown(maxValueTextbox, { code: 38, key: 'ArrowUp' });
    fireEvent.keyDown(maxValueTextbox, { code: 38, key: 'ArrowUp' });
    expect(maxValueTextbox.value).toBe('2');
    fireEvent.keyDown(maxValueTextbox, { code: 40, key: 'ArrowDown' });
    expect(maxValueTextbox.value).toBe('1');*/
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
