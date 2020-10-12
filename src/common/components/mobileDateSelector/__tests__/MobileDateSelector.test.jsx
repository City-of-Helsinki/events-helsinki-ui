import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { DATE_TYPES } from '../../../../constants';
import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  escKeyPressHelper,
} from '../../../../util/testUtils';
import MobileDateSelector from '../MobileDateSelector';
import { testIds } from '../MobileDateSelectorMenu';

const dateTypeOptions = [
  'Tänään',
  'Huomenna',
  'Viikonloppuna',
  'Tällä viikolla',
  'Valitse päivät',
];

const defaultProps = {
  dateTypes: [DATE_TYPES.TODAY, DATE_TYPES.WEEKEND],
  endDate: null,
  onChangeDateTypes: jest.fn(),
  onChangeEndDate: jest.fn(),
  onChangeStartDate: jest.fn(),
  startDate: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderComponent = (props) =>
  render(<MobileDateSelector {...defaultProps} {...props} />);

describe('MobileDateSelector component', () => {
  test('should have correct date types selected', async () => {
    renderComponent();

    expect(
      screen.getByRole('button', { name: dateTypeOptions[0] })
    ).toHaveClass('isSelected');
    expect(
      screen.getByRole('button', { name: dateTypeOptions[1] })
    ).not.toHaveClass('isSelected');
    expect(
      screen.getByRole('button', { name: dateTypeOptions[2] })
    ).toHaveClass('isSelected');
    expect(
      screen.getByRole('button', { name: dateTypeOptions[3] })
    ).not.toHaveClass('isSelected');
    expect(
      screen.getByRole('button', { name: dateTypeOptions[4] })
    ).not.toHaveClass('isSelected');
  });

  test('custom date type should be selected when startDate is selected', async () => {
    renderComponent({ startDate: new Date('2018-12-12') });

    expect(
      screen.getByRole('button', { name: dateTypeOptions[4] })
    ).toHaveClass('isSelected');
  });

  test('custom date type should be selected when endDate is selected', async () => {
    renderComponent({ startDate: new Date('2018-12-12') });

    expect(
      screen.getByRole('button', { name: dateTypeOptions[4] })
    ).toHaveClass('isSelected');
  });
});

describe('Escape', () => {
  test('should close date selector menu with escape', () => {
    renderComponent();
    userEvent.click(screen.getByRole('button', { name: /valitse päivät/i }));

    // Check that menu is open
    expect(screen.queryByTestId(testIds.menu)).toBeInTheDocument();
    escKeyPressHelper();
    // Check that menu is closed
    expect(screen.queryByTestId(testIds.menu)).not.toBeInTheDocument();
  });
});

describe('when menu has been closed, it should reopen with', () => {
  const getClosedInput = () => {
    const helpers = renderComponent();

    const button = screen.getByRole('button', { name: /valitse päivät/i });
    userEvent.click(button);

    expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();

    escKeyPressHelper();

    expect(screen.queryByTestId(testIds.menu)).not.toBeInTheDocument();

    arrowDownKeyPressHelper();

    expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();

    return helpers;
  };

  test('ArrowDown', async () => {
    getClosedInput();

    arrowDownKeyPressHelper();

    expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();
  });

  test('ArrowUp', () => {
    getClosedInput();

    arrowUpKeyPressHelper();

    expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();
  });
});
