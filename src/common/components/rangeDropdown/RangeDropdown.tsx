import classNames from 'classnames';
import { Checkbox, IconAngleDown, IconAngleUp, TextInput } from 'hds-react';
import React from 'react';

import DropdownMenu from '../dropdownMenu/DropdownMenu';
import SearchLabel from '../search/searchLabel/SearchLabel';
import styles from './rangeDropdown.module.scss';

export enum RANGE_INPUT {
  MIN = 'min',
  MAX = 'max',
  //for initial values from query string
  ALL = 'all',
}

export type Option = {
  text: string;
  value: string;
};

export interface RangeDropdownProps {
  checkboxName: string;
  icon?: React.ReactElement;
  rangeIcon: React.ReactElement;
  minInputStartValue?: string;
  minInputValue?: string;
  minInputFixedValue?: string;
  minInputLabel: string;
  maxInputEndValue?: string;
  maxInputValue?: string;
  maxInputLabel: string;
  maxInputFixedValue?: string;
  name: string;
  onChange: (minValue: string, maxValue: string) => void;
  fixedValuesText?: string;
  showFixedValuesText?: boolean;
  title: string;
  value: string[];
}

const RangeDropdown: React.FC<RangeDropdownProps> = ({
  icon,
  rangeIcon,
  minInputValue = '',
  minInputLabel,
  minInputStartValue = '',
  minInputFixedValue = '',
  maxInputValue = '',
  maxInputLabel,
  maxInputEndValue = '',
  maxInputFixedValue = '',
  name,
  onChange,
  fixedValuesText,
  showFixedValuesText,
  title,
  value,
}) => {
  const [internalIsFixedValues, setInternalIsFixedValues] = React.useState(
    false
  );
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const dropdown = React.useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = React.useRef<HTMLButtonElement | null>(null);

  //set values without validation
  const handleInputChange = (inputType: RANGE_INPUT, val: string) => {
    switch (inputType) {
      case RANGE_INPUT.MIN:
        onChange(val, maxInputValue);
        break;
      case RANGE_INPUT.MAX:
        onChange(minInputValue, val);
        break;
    }
  };

  //validate values on blur
  const handleInputBlur = (inputType: RANGE_INPUT, val: string) => {
    const getValidatedMinValue = (val: string): string => {
      let resultValue = val;
      if (Number(val) < Number(minInputStartValue)) {
        resultValue = minInputStartValue;
      } else if (Number(val) > Number(maxInputEndValue)) {
        resultValue = maxInputEndValue;
      }
      if (val && maxInputValue && Number(val) > Number(maxInputValue)) {
        resultValue = maxInputValue;
      }
      return resultValue;
    };

    const getValidatedMaxValue = (val: string): string => {
      let resultValue = val;
      if (Number(val) > Number(maxInputEndValue)) {
        resultValue = maxInputEndValue;
      } else if (Number(val) < Number(minInputStartValue)) {
        resultValue = minInputStartValue;
      }
      if (val && minInputValue && Number(val) < Number(minInputValue)) {
        resultValue = minInputValue;
      }
      return resultValue;
    };

    switch (inputType) {
      case RANGE_INPUT.MIN:
        onChange(getValidatedMinValue(val), maxInputValue);
        break;
      case RANGE_INPUT.MAX:
        onChange(minInputValue, getValidatedMaxValue(val));
        break;
      case RANGE_INPUT.ALL:
        onChange(
          getValidatedMinValue(minInputValue),
          getValidatedMaxValue(maxInputValue)
        );
    }
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = dropdown.current;

    // Close menu when clicking outside of the component
    if (!(target instanceof Node && current?.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      //validate initial values
      handleInputBlur(RANGE_INPUT.ALL, '');
    }
  };

  const handleDocumentFocusin = (event: FocusEvent) => {
    const target = event.target;
    const current = dropdown.current;

    if (!(target instanceof Node && current?.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('focusin', handleDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('focusin', handleDocumentFocusin);
    };
  }, []);

  const handleToggleButtonClick = () => {
    toggleMenu();
  };

  const handleToggleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsMenuOpen(true);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIsMenuOpen(false);
    } else if (event.key === 'Escape') {
      setIsMenuOpen(false);
    }
  };

  const handleClear = React.useCallback(() => {
    onChange('', '');
    setInternalIsFixedValues(false);
  }, [onChange]);

  const handleCheckboxChange = () => {
    if (internalIsFixedValues) {
      handleClear();
    } else {
      onChange(minInputFixedValue, maxInputFixedValue);
    }
    setInternalIsFixedValues(!internalIsFixedValues);
  };

  return (
    <div className={styles.dropdown} ref={dropdown}>
      <button
        aria-label={title}
        className={styles.toggleButton}
        onClick={handleToggleButtonClick}
        onKeyDown={handleToggleButtonKeyDown}
        ref={toggleButtonRef}
        tabIndex={0}
        type="button"
      >
        {!!value.filter(Boolean).length && (
          <div className={styles.isSelectedIndicator} />
        )}
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.title}>
          <SearchLabel htmlFor={name} srOnly={true}>
            {title}
          </SearchLabel>
          <div className={styles.titleText}>{title}</div>
        </div>
        <div className={styles.arrowWrapper}>
          {isMenuOpen ? (
            <IconAngleUp aria-hidden />
          ) : (
            <IconAngleDown aria-hidden />
          )}
        </div>
      </button>
      <DropdownMenu isOpen={isMenuOpen} onClear={handleClear}>
        <div className={styles.rangeInputsWrapper}>
          <TextInput
            type="number"
            id={`${name}_0`}
            placeholder={minInputStartValue}
            onChange={(e) => handleInputChange(RANGE_INPUT.MIN, e.target.value)}
            onBlur={(e) => handleInputBlur(RANGE_INPUT.MIN, e.target.value)}
            value={minInputValue}
            label={minInputLabel}
            disabled={internalIsFixedValues}
          />
          {rangeIcon && (
            <div className={styles.rangeArrowWrapper}>{rangeIcon}</div>
          )}
          <TextInput
            type="number"
            id={`${name}_1`}
            placeholder={maxInputEndValue}
            onChange={(e) => handleInputChange(RANGE_INPUT.MAX, e.target.value)}
            onBlur={(e) => handleInputBlur(RANGE_INPUT.MAX, e.target.value)}
            value={maxInputValue}
            label={maxInputLabel}
            disabled={internalIsFixedValues}
          />
        </div>
        {showFixedValuesText && (
          <Checkbox
            className={classNames(styles.rangeCheckbox)}
            checked={internalIsFixedValues}
            id={`${name}_2`}
            label={fixedValuesText}
            onChange={handleCheckboxChange}
          />
        )}
      </DropdownMenu>
    </div>
  );
};

export default RangeDropdown;
