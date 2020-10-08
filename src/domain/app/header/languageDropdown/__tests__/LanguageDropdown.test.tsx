import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import translations from '../../../../../common/translation/i18n/fi.json';
import { SUPPORT_LANGUAGES } from '../../../../../constants';
import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  enterKeyPressHelper,
  escKeyPressHelper,
  screen,
  tabKeyPressHelper,
  userEvent,
} from '../../../../../util/testUtils';
import LanguageDropdown, { LanguageDropdownProps } from '../LanguageDropdown';

const languageOptions = Object.values(SUPPORT_LANGUAGES).map((language) => {
  return {
    label: `${language}Label`,
    value: language,
  };
});
const defaultProps = {
  languageOptions,
  onChange: jest.fn(),
  value: SUPPORT_LANGUAGES.FI,
};

const getWrapper = (props?: Partial<LanguageDropdownProps>) => {
  return render(<LanguageDropdown {...defaultProps} {...props} />);
};

test('should allow navigation with up and down arrows', async () => {
  getWrapper();
  const button = screen.getByRole('button', {
    name: translations.header.changeLanguage,
  });

  userEvent.click(button);

  arrowDownKeyPressHelper();
  arrowDownKeyPressHelper();

  expect(
    screen.getByRole('button', { name: languageOptions[1].label })
  ).toHaveClass('isFocused');

  arrowUpKeyPressHelper();

  expect(
    screen.getByRole('button', { name: languageOptions[0].label })
  ).toHaveClass('isFocused');
});

test('should select last item if the first keyboard navigation is button up', () => {
  getWrapper();

  const button = screen.getByRole('button', {
    name: translations.header.changeLanguage,
  });

  userEvent.click(button);

  arrowUpKeyPressHelper();

  expect(
    screen.getByRole('button', {
      name: languageOptions[languageOptions.length - 1].label,
    })
  ).toHaveClass('isFocused');
});

test('should select first item when user goes down in the last member of the list', () => {
  getWrapper();

  const button = screen.getByRole('button', {
    name: translations.header.changeLanguage,
  });

  userEvent.click(button);

  arrowUpKeyPressHelper();
  arrowDownKeyPressHelper();

  // First element should have focus
  expect(
    screen.getByRole('button', { name: languageOptions[0].label })
  ).toHaveClass('isFocused');
});

test('should change language by clicking option', () => {
  const onChange = jest.fn();
  getWrapper({ onChange });

  const button = screen.getByRole('button', {
    name: translations.header.changeLanguage,
  });

  userEvent.click(button);

  userEvent.click(
    screen.getByRole('button', {
      name: languageOptions[1].label,
    })
  );

  expect(onChange).toBeCalledWith(languageOptions[1].value);
});

test('should change language with enter', () => {
  const onChange = jest.fn();
  getWrapper({ onChange });

  const button = screen.getByRole('button', {
    name: translations.header.changeLanguage,
  });

  userEvent.click(button);

  arrowDownKeyPressHelper();
  arrowDownKeyPressHelper();
  enterKeyPressHelper();

  expect(onChange).toBeCalledWith(languageOptions[1].value);
});

describe('when dropdown is open closed, it should close with', () => {
  const getOpenDropdown = () => {
    const helpers = getWrapper();
    const button = screen.getByRole('button', {
      name: translations.header.changeLanguage,
    });

    userEvent.click(button);

    expect(screen.queryByRole('listbox')).toBeInTheDocument();

    return helpers;
  };

  test('Esc', () => {
    getOpenDropdown();

    escKeyPressHelper();

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('ArrowDown', () => {
    getOpenDropdown();

    tabKeyPressHelper();

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('Clicking outside', () => {
    const { container } = getOpenDropdown();

    userEvent.click(container);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('Focusin outside', () => {
    const { container } = getOpenDropdown();

    fireEvent.focus(container);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});

describe('when dropdown has been closed, it should reopen with', () => {
  const getClosedInput = () => {
    const helpers = getWrapper();
    const button = screen.getByRole('button', {
      name: translations.header.changeLanguage,
    });

    userEvent.click(button);

    escKeyPressHelper();

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(button).toHaveFocus();

    return helpers;
  };

  test('ArrowUp', () => {
    getClosedInput();

    arrowUpKeyPressHelper();

    expect(screen.queryByRole('listbox')).toBeInTheDocument();
  });

  test('ArrowDown', () => {
    getClosedInput();

    arrowDownKeyPressHelper();

    expect(screen.queryByRole('listbox')).toBeInTheDocument();
  });
});
