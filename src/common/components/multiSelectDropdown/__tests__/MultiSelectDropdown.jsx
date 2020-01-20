import { act, fireEvent, render, wait } from "@testing-library/react";
import React from "react";

import MultiSelectDropdown from "../MultiSelectDropdown";

const onChange = jest.fn();
const options = [
  {
    text: "Squirrel",
    value: "value1"
  },
  {
    text: "Elephant",
    value: "value2"
  },
  {
    text: "Dog",
    value: "value3"
  }
];
const title = "test title";
const defaultProps = {
  icon: <div />,
  name: "test MultiSelectDropdown",
  onChange,
  options,
  title,
  value: []
};
const getWrapper = props =>
  render(<MultiSelectDropdown {...defaultProps} {...props} />);
const arrowUpKeyPressHelper = domNode =>
  fireEvent.keyDown(domNode, { code: 38, key: "ArrowUp" });
const arrowDownKeyPressHelper = domNode =>
  fireEvent.keyDown(domNode, { code: 40, key: "ArrowDown" });
const enterKeyPressHelper = domNode =>
  fireEvent.keyDown(domNode, { code: 13, key: "Enter" });

test("should filter results based on user search and options[].text field", async () => {
  const { getByPlaceholderText, queryByLabelText } = getWrapper();
  const searchInput = getByPlaceholderText(title);

  fireEvent.click(searchInput);
  fireEvent.change(searchInput, { target: { value: "Ele" } });

  await wait();

  expect(queryByLabelText("Elephant")).not.toEqual(null);
  expect(queryByLabelText("Dog")).toEqual(null);
  expect(queryByLabelText("Squirrel")).toEqual(null);
});

test("should reset keyboard navigation position after a new search", async () => {
  const { getByPlaceholderText, getByLabelText } = getWrapper();
  const searchInput = getByPlaceholderText(title);

  fireEvent.click(searchInput);
  act(() => searchInput.focus());
  arrowDownKeyPressHelper(searchInput);

  expect(
    getByLabelText(options[0].text).parentElement.parentElement
  ).toHaveClass("checkbox--isFocused");

  // Find something, then reset the search to ensure that all results are listed
  fireEvent.change(searchInput, { target: { value: "Ele" } });
  fireEvent.change(searchInput, { target: { value: "" } });

  const allOptions = options.map(({ text }) => text);

  // No element should have focus
  allOptions.forEach(text => {
    expect(getByLabelText(text).parentElement.parentElement).not.toHaveClass(
      "checkbox--isFocused"
    );
  });
});
describe("ArrowUp, ArrowDown", () => {
  test("should allow navigation with up and down arrows", async () => {
    const { getByPlaceholderText, getByLabelText } = getWrapper();
    const searchInput = getByPlaceholderText(title);

    fireEvent.click(searchInput);
    act(() => searchInput.focus());

    arrowDownKeyPressHelper(searchInput);
    arrowDownKeyPressHelper(searchInput);

    expect(
      getByLabelText(options[1].text).parentElement.parentElement
    ).toHaveClass("checkbox--isFocused");

    arrowUpKeyPressHelper(searchInput);

    expect(
      getByLabelText(options[0].text).parentElement.parentElement
    ).toHaveClass("checkbox--isFocused");
  });

test("should select last item if the first keyboard navigation is button up", () => {
  const { getByPlaceholderText, getByLabelText } = getWrapper();
  const searchInput = getByPlaceholderText(title);

  fireEvent.click(searchInput);
  act(() => searchInput.focus());

  arrowUpKeyPressHelper(searchInput);

  expect(
    getByLabelText(options[options.length - 1].text).parentElement.parentElement
  ).toHaveClass("checkbox--isFocused");
});

  test("should reset to start position when user goes up in the first member of the list", () => {
    const { getByPlaceholderText, getByLabelText } = getWrapper();
    const searchInput = getByPlaceholderText(title);

    fireEvent.click(searchInput);
    act(() => searchInput.focus());

    arrowDownKeyPressHelper(searchInput);
    arrowUpKeyPressHelper(searchInput);

    const allOptions = options.map(({ text }) => text);

    // No element should have focus
    allOptions.forEach(text => {
      expect(getByLabelText(text).parentElement).not.toHaveClass(
        "checkbox--isFocused"
      );
    });
  });

  test("should reset to start position when user goes down from the last member of the list", () => {
    const { getByPlaceholderText, getByLabelText } = getWrapper();
    const searchInput = getByPlaceholderText(title);

    fireEvent.click(searchInput);
    act(() => searchInput.focus());

    options.forEach(() => {
      arrowDownKeyPressHelper(searchInput);
    });
    // After we have selected the last item, press down once more to reset the
    // selection.
    arrowDownKeyPressHelper(searchInput);

    const allOptions = options.map(({ text }) => text);

    // No element should have focus
    allOptions.forEach(text => {
      expect(getByLabelText(text).parentElement).not.toHaveClass(
        "checkbox--isFocused"
      );
    });
  });
})

describe("Enter", () => {
  test("should not select value with enter if user has not navigated with keyboard", () => {
    const { getByPlaceholderText } = getWrapper();
    const searchInput = getByPlaceholderText(title);

    fireEvent.click(searchInput);
    act(() => searchInput.focus());

    // Try with no actions.
    enterKeyPressHelper(searchInput);

    expect(onChange).not.toHaveBeenCalled();

    // Try by navigating, but then resetting the navigation.
    arrowDownKeyPressHelper(searchInput);
    arrowUpKeyPressHelper(searchInput);
    enterKeyPressHelper(searchInput);

    expect(onChange).not.toHaveBeenCalled();
  });

  test("should select value with enter when user has navigated with keyboard", () => {
    const { getByPlaceholderText } = getWrapper();
    const searchInput = getByPlaceholderText(title);

    fireEvent.click(searchInput);
    act(() => searchInput.focus());

    arrowDownKeyPressHelper(searchInput);
    enterKeyPressHelper(searchInput);

    expect(onChange).toHaveBeenCalledWith([options[0].value]);
  });
});

describe("Escape", () => {
  test("should close suggestions with escape", () => {
    const { getByPlaceholderText, queryByLabelText } = getWrapper();
    const searchInput = getByPlaceholderText(title);

    fireEvent.click(searchInput);
    act(() => searchInput.focus());

    // Check that we can find some of the content of the MultiSelectDropdown: this suggests
    // that it is open.
    expect(queryByLabelText(options[0].text)).not.toEqual(null);

    fireEvent.keyDown(searchInput, { code: 27, key: "Escape" });

    // Assert that we can no longer find the menu content after we have pressed
    // Escape.
    expect(queryByLabelText(options[0].text)).toEqual(null);
  });
});

test("should open dropdown when user focuses input", () => {
  const { getByPlaceholderText, queryByLabelText } = getWrapper();

  act(() => getByPlaceholderText(title).focus());

  expect(queryByLabelText(options[0].text)).not.toEqual(null);
})

test("should open dropdown when user clicks on input", () => {
    const { getByPlaceholderText, queryByLabelText } = getWrapper();
    const searchInput = getByPlaceholderText(title);

    act(() => searchInput.focus());
    fireEvent.click(searchInput);

    expect(queryByLabelText(options[0].text)).not.toEqual(null);
})

describe("when dropdown has been closed, it should reopen with", () => {
  const getClosedInput = (props) => {
    const helpers = getWrapper(props);
    const { getByPlaceholderText, queryByLabelText } = helpers;
    const searchInput = getByPlaceholderText(title);

    act(() => searchInput.focus());
    fireEvent.click(searchInput);
    fireEvent.keyDown(searchInput, { code: 27, key: "Escape" });

    expect(queryByLabelText(options[0].text)).toEqual(null);
    expect(searchInput).toHaveFocus()

    return helpers;
  }

  test("ArrowUp", () => {
    const { getByPlaceholderText, queryByLabelText } = getClosedInput();

    arrowUpKeyPressHelper(getByPlaceholderText(title));

    expect(queryByLabelText(options[0].text)).not.toEqual(null);
  });

  test("ArrowDown", () => {
    const { getByPlaceholderText, queryByLabelText } = getClosedInput();

    arrowDownKeyPressHelper(getByPlaceholderText(title));

    expect(queryByLabelText(options[0].text)).not.toEqual(null);
  });

  test("typing into search box", () => {
    const { getByPlaceholderText, queryByLabelText } = getClosedInput();

    fireEvent.change(getByPlaceholderText(title), { target: { value: "S" } });

    expect(queryByLabelText(options[0].text)).not.toEqual(null);
  });
})
