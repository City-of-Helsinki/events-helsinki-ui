import { act, fireEvent, render } from "@testing-library/react";
import React from "react";

import { DATE_TYPES } from "../../../../constants";
import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  escKeyPressHelper
} from "../../../../util/testUtils";
import MobileDateSelector from "../MobileDateSelector";

const dateTypeOptions = [
  "Tänään",
  "Huomenna",
  "Viikonloppuna",
  "Tällä viikolla",
  "Valitse päivät"
];

const defaultProps = {
  dateTypes: [DATE_TYPES.TODAY, DATE_TYPES.WEEKEND],
  endDate: null,
  onChangeDateTypes: () => {},
  onChangeEndDate: () => {},
  onChangeStartDate: () => {},
  startDate: null
};

const openMenuButtonTestId = "open-date-selector-button";
const dateSelectorMenuTestId = "mobile-date-selector-menu";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getWrapper = props =>
  render(<MobileDateSelector {...defaultProps} {...props} />);

describe("MobileDateSelector component", () => {
  test("should have correct date types selected", async () => {
    const { getByText } = getWrapper();

    expect(
      getByText(dateTypeOptions[0]).parentElement.parentElement
    ).toHaveClass("isSelected");
    expect(
      getByText(dateTypeOptions[1]).parentElement.parentElement
    ).not.toHaveClass("isSelected");
    expect(
      getByText(dateTypeOptions[2]).parentElement.parentElement
    ).toHaveClass("isSelected");
    expect(
      getByText(dateTypeOptions[3]).parentElement.parentElement
    ).not.toHaveClass("isSelected");
    expect(
      getByText(dateTypeOptions[4]).parentElement.parentElement
    ).not.toHaveClass("isSelected");
  });

  test("custom date type should be selected when endDate is selected", async () => {
    const { getByText } = getWrapper({ endDate: new Date("2018-12-12") });

    expect(
      getByText(dateTypeOptions[4]).parentElement.parentElement
    ).toHaveClass("isSelected");
  });

  test("custom date type should be selected when endDate is selected", async () => {
    const { getByText } = getWrapper({ startDate: new Date("2018-12-12") });

    expect(
      getByText(dateTypeOptions[4]).parentElement.parentElement
    ).toHaveClass("isSelected");
  });
});

describe("Escape", () => {
  test("should close date selector menu with escape", () => {
    const { getByTestId } = getWrapper();
    const button = getByTestId(openMenuButtonTestId);

    fireEvent.click(button);
    act(() => button.focus());
    // Check that menu is open
    expect(getByTestId(dateSelectorMenuTestId)).toHaveClass("isOpen");
    escKeyPressHelper();
    // Check that menu is closed
    expect(getByTestId(dateSelectorMenuTestId)).not.toHaveClass("isOpen");
  });
});

describe("when menu has been closed, it should reopen with", () => {
  const getClosedInput = () => {
    const helpers = getWrapper();
    const { getByTestId } = helpers;
    const button = getByTestId(openMenuButtonTestId);

    fireEvent.click(button);
    act(() => button.focus());

    escKeyPressHelper();

    expect(getByTestId(dateSelectorMenuTestId)).not.toHaveClass("isOpen");
    expect(button).toHaveFocus();

    return helpers;
  };

  test("ArrowDown", () => {
    const { getByTestId } = getClosedInput();

    arrowDownKeyPressHelper();

    expect(getByTestId(dateSelectorMenuTestId)).toHaveClass("isOpen");
  });

  test("ArrowUp", () => {
    const { getByTestId } = getClosedInput();

    arrowUpKeyPressHelper();

    expect(getByTestId(dateSelectorMenuTestId)).toHaveClass("isOpen");
  });
});
