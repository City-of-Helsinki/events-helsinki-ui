import { act, fireEvent, render } from "@testing-library/react";
import React from "react";

import { SUPPORT_LANGUAGES } from "../../../../constants";
import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  escKeyPressHelper
} from "../../../../util/testUtils";
import LanguageDropdown from "../LanguageDropdown";

const onChange = jest.fn();

const containerTestId = "language-dropdown";
const buttonTestId = "language-dropdown-button";
const languageOptions = Object.values(SUPPORT_LANGUAGES).map(language => {
  return {
    label: `${language}Label`,
    value: language
  };
});
const defaultProps = {
  languageOptions,
  onChange,
  value: SUPPORT_LANGUAGES.FI
};
const getWrapper = () => render(<LanguageDropdown {...defaultProps} />);

describe("ArrowUp, ArrowDown", () => {
  test("should allow navigation with up and down arrows", async () => {
    const { getByTestId, getByText } = getWrapper();
    const button = getByTestId(buttonTestId);
    fireEvent.click(button);
    act(() => button.focus());

    arrowDownKeyPressHelper();
    arrowDownKeyPressHelper();

    expect(getByText(languageOptions[1].label)).toHaveClass("isFocused");

    arrowUpKeyPressHelper();

    expect(getByText(languageOptions[0].label)).toHaveClass("isFocused");
  });

  test("should select last item if the first keyboard navigation is button up", () => {
    const { getByTestId, getByText } = getWrapper();
    const button = getByTestId(buttonTestId);

    fireEvent.click(button);
    act(() => button.focus());

    arrowUpKeyPressHelper();
    expect(
      getByText(languageOptions[languageOptions.length - 1].label)
    ).toHaveClass("isFocused");
  });

  test("should select first item when user goes down in the last member of the list", () => {
    const { getByTestId, getByText } = getWrapper();
    const button = getByTestId(buttonTestId);

    fireEvent.click(button);
    act(() => button.focus());

    arrowUpKeyPressHelper();
    arrowDownKeyPressHelper();

    // First element should have focus
    expect(getByText(languageOptions[0].label)).toHaveClass("isFocused");
  });
});

describe("Escape", () => {
  test("should close suggestions with escape", () => {
    const { getByTestId } = getWrapper();
    const button = getByTestId(buttonTestId);

    fireEvent.click(button);
    act(() => button.focus());

    // Check that menu is open
    expect(getByTestId(containerTestId)).toHaveClass("isMenuOpen");

    escKeyPressHelper();

    // Check that menu is closed
    expect(getByTestId(containerTestId)).not.toHaveClass("isMenuOpen");
  });
});

describe("when dropdown has been closed, it should reopen with", () => {
  const getClosedInput = () => {
    const helpers = getWrapper();
    const { getByTestId } = helpers;
    const button = getByTestId(buttonTestId);

    fireEvent.click(button);
    act(() => button.focus());

    escKeyPressHelper();

    expect(getByTestId(containerTestId)).not.toHaveClass("isMenuOpen");
    expect(button).toHaveFocus();

    return helpers;
  };

  test("ArrowUp", () => {
    const { getByTestId } = getClosedInput();

    arrowUpKeyPressHelper();

    // Check that menu is open
    expect(getByTestId(containerTestId)).toHaveClass("isMenuOpen");
  });

  test("ArrowDown", () => {
    const { getByTestId } = getClosedInput();

    arrowDownKeyPressHelper();

    // Check that menu is open
    expect(getByTestId(containerTestId)).toHaveClass("isMenuOpen");
  });
});
