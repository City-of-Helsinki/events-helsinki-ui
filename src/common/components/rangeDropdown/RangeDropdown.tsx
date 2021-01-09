import { Checkbox, IconAngleDown, IconAngleUp, TextInput } from 'hds-react';
import React, { useCallback } from 'react';

import useKeyboardNavigation from '../../../hooks/useDropdownKeyboardNavigation';
import SearchLabel from '../search/searchLabel/SearchLabel';
import DropdownMenu from './DropdownMenu';
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
  minInputValue,
  minInputLabel,
  minInputStartValue,
  minInputFixedValue,
  maxInputValue,
  maxInputLabel,
  maxInputEndValue,
  maxInputFixedValue,
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

  const minInputValueNormalized = minInputValue || '';
  const maxInputValueNormalized = maxInputValue || '';
  const minInputStartValueNormalized = minInputStartValue || '';
  const minInputFixedValueNormalized = minInputFixedValue || '';
  const maxInputEndValueNormalized = maxInputEndValue || '';
  const maxInputFixedValueNormalized = maxInputFixedValue || '';

  const dropdown = React.useRef<HTMLDivElement | null>(null);
  const toggleButton = React.useRef<HTMLButtonElement | null>(null);
  const inputMinRef = React.useRef<HTMLInputElement | null>(null);

  //set values without validation
  const handleInputChange = (inputType: RANGE_INPUT, val: string) => {
    switch (inputType) {
      case RANGE_INPUT.MIN:
        onChange(val, maxInputValueNormalized);
        break;
      case RANGE_INPUT.MAX:
        onChange(minInputValueNormalized, val);
        break;
      default:
        break;
    }
  };

  //validate values on blur
  const handleInputBlur = useCallback(
    (inputType: RANGE_INPUT, val: string) => {
      const getValidatedMinValue = (val: string): string => {
        let resultValue = val;
        if (Number(val) < Number(minInputStartValueNormalized)) {
          resultValue = minInputStartValueNormalized;
        } else if (Number(val) > Number(maxInputEndValueNormalized)) {
          resultValue = maxInputEndValueNormalized;
        }
        if (
          maxInputValueNormalized &&
          Number(val) > Number(maxInputValueNormalized)
        ) {
          resultValue = maxInputValueNormalized;
        }
        return resultValue;
      };

      const getValidatedMaxValue = (val: string): string => {
        let resultValue = val;
        if (Number(val) > Number(maxInputEndValueNormalized)) {
          resultValue = maxInputEndValueNormalized;
        } else if (Number(val) < Number(minInputStartValueNormalized)) {
          resultValue = minInputStartValueNormalized;
        }
        if (
          minInputValueNormalized &&
          Number(val) < Number(minInputValueNormalized)
        ) {
          resultValue = minInputValueNormalized;
        }
        return resultValue;
      };
      switch (inputType) {
        case RANGE_INPUT.MIN:
          onChange(getValidatedMinValue(val), maxInputValueNormalized);
          break;
        case RANGE_INPUT.MAX:
          onChange(minInputValueNormalized, getValidatedMaxValue(val));
          break;
        case RANGE_INPUT.ALL:
          onChange(
            getValidatedMinValue(minInputValueNormalized),
            getValidatedMaxValue(maxInputValueNormalized)
          );
          break;
        default:
          break;
      }
    },
    [
      maxInputEndValueNormalized,
      maxInputValueNormalized,
      minInputStartValueNormalized,
      minInputValueNormalized,
      onChange,
    ]
  );

  const {
    setup: setupKeyboardNav,
    teardown: teardownKeyboardNav,
  } = useKeyboardNavigation({
    container: dropdown,
    listLength: 1,
    onKeyDown: (event: KeyboardEvent) => {
      switch (event.key) {
        // Close menu on ESC key
        case 'Escape':
          setIsMenuOpen(false);
          setFocusToToggleButton();
          break;
        case 'ArrowUp':
          ensureDropdownIsOpen();
          break;
        case 'ArrowDown':
          ensureDropdownIsOpen();
          break;
        case 'Enter':
          //todo: does not work
          if (isToggleButtonFocused()) {
            handleToggleButtonClick();
          }
      }
    },
  });

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = dropdown.current;

    // Close menu when clicking outside of the component
    if (!(target instanceof Node && current?.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const ensureDropdownIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const isToggleButtonFocused = () => {
    const active = document.activeElement;
    const current = toggleButton.current;
    return !!current?.contains(active);
  };

  const setFocusToToggleButton = () => {
    toggleButton.current?.focus();
  };

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      //validate initial values
      handleInputBlur(RANGE_INPUT.ALL, '');
    }
  }, [handleInputBlur, isMenuOpen]);

  const handleDocumentFocusin = (event: FocusEvent) => {
    const target = event.target;
    const current = dropdown.current;

    if (!(target instanceof Node && current?.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    setupKeyboardNav();
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('focusin', handleDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      teardownKeyboardNav();
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('focusin', handleDocumentFocusin);
    };
  }, [setupKeyboardNav, teardownKeyboardNav]);

  const setFocusToInput = () => {
    inputMinRef.current?.focus();
  };

  const handleToggleButtonClick = () => {
    toggleMenu();

    setTimeout(() => {
      if (!isMenuOpen) {
        setFocusToInput();
      }
    }, 0);
  };

  const handleClear = React.useCallback(() => {
    onChange('', '');
    setInternalIsFixedValues(false);
  }, [onChange]);

  const handleCheckboxChange = () => {
    if (internalIsFixedValues) {
      handleClear();
    } else {
      onChange(minInputFixedValueNormalized, maxInputFixedValueNormalized);
    }
    setInternalIsFixedValues(!internalIsFixedValues);
  };

  return (
    <div className={styles.dropdown} ref={dropdown}>
      <button
        aria-label={title}
        className={styles.toggleButton}
        onClick={handleToggleButtonClick}
        ref={toggleButton}
        type="button"
      >
        {!!value.length && <div className={styles.isSelectedIndicator} />}
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
            ref={inputMinRef}
            id={name}
            name={name}
            placeholder={minInputStartValue}
            onChange={(e) => handleInputChange(RANGE_INPUT.MIN, e.target.value)}
            onBlur={(e) => handleInputBlur(RANGE_INPUT.MIN, e.target.value)}
            value={minInputValueNormalized}
            label={minInputLabel}
            disabled={internalIsFixedValues}
          />
          {rangeIcon && (
            <div className={styles.rangeArrowWrapper}>{rangeIcon}</div>
          )}
          <TextInput
            type="number"
            id={name}
            name={name}
            placeholder={maxInputEndValue}
            onChange={(e) => handleInputChange(RANGE_INPUT.MAX, e.target.value)}
            onBlur={(e) => handleInputBlur(RANGE_INPUT.MAX, e.target.value)}
            value={maxInputValueNormalized}
            label={maxInputLabel}
            disabled={internalIsFixedValues}
          />
        </div>
        {showFixedValuesText && (
          <Checkbox
            className={styles.rangeCheckbox}
            checked={internalIsFixedValues}
            id={`${name}_setDefaultRangeValues`}
            label={fixedValuesText}
            name={'rangeCheckbox'}
            onChange={handleCheckboxChange}
          />
        )}
      </DropdownMenu>
    </div>
  );
};

export default RangeDropdown;
