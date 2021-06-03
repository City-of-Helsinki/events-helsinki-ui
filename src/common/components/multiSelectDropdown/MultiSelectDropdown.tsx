import classNames from 'classnames';
import { IconAngleDown, IconAngleUp, IconSearch } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useKeyboardNavigation from '../../../hooks/useDropdownKeyboardNavigation';
import Checkbox from '../checkbox/Checkbox';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import ScrollIntoViewWithFocus from '../scrollIntoViewWithFocus/ScrollIntoViewWithFocus';
import SearchLabel from '../search/searchLabel/SearchLabel';
import styles from './multiSelectDropdown.module.scss';

const SELECT_ALL = 'SELECT_ALL';

export type Option = {
  text: string;
  value: string;
};

export interface MultiselectDropdownProps {
  checkboxName: string;
  icon: React.ReactElement;
  inputPlaceholder?: string;
  inputValue?: string;
  name: string;
  onChange: (values: string[]) => void;
  options: Option[];
  renderOptionText?: (optionValue: string) => React.ReactChild;
  selectAllText?: string;
  setInputValue?: (newVal: string) => void;
  showSearch?: boolean;
  showSelectAll?: boolean;
  title: string;
  value: string[];
}

const MultiSelectDropdown: React.FC<MultiselectDropdownProps> = ({
  checkboxName,
  icon,
  inputPlaceholder,
  inputValue,
  name,
  onChange,
  options,
  renderOptionText,
  selectAllText,
  setInputValue,
  showSearch,
  showSelectAll,
  title,
  value,
}) => {
  const { t } = useTranslation();
  const inputPlaceholderText =
    inputPlaceholder || t('commons.multiSelectDropdown.inputPlaceholder');
  const [internalInput, setInternalInput] = React.useState('');
  const input = inputValue !== undefined ? inputValue : internalInput;

  const dropdown = React.useRef<HTMLDivElement | null>(null);
  const toggleButton = React.useRef<HTMLButtonElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const filteredOptions = React.useMemo(() => {
    return [
      showSelectAll && {
        text: selectAllText || t('commons.multiSelectDropdown.selectAll'),
        value: SELECT_ALL,
      },
      ...options.filter((option) =>
        option.text.toLowerCase().includes(input.toLowerCase())
      ),
    ].filter((e) => e) as Option[];
  }, [input, options, selectAllText, showSelectAll, t]);

  const handleInputValueChange = React.useCallback(
    (val: string) => {
      setInternalInput(val);

      if (setInputValue) {
        setInputValue(val);
      }
    },
    [setInputValue]
  );

  const {
    focusedIndex,
    setup: setupKeyboardNav,
    teardown: teardownKeyboardNav,
  } = useKeyboardNavigation({
    container: dropdown,
    listLength: filteredOptions.length,
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
          if (isToggleButtonFocused()) {
            handleToggleButtonClick();
          }
      }
    },
  });

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleDocumentClick = React.useCallback(
    (event: MouseEvent) => {
      const target = event.target;
      const current = dropdown.current;

      // Close menu when clicking outside of the component
      if (!(target instanceof Node && current?.contains(target))) {
        isMenuOpen && setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  const toggleOption = React.useCallback(
    (option: string) => {
      onChange(
        value.includes(option)
          ? value.filter((v) => v !== option)
          : [...value, option]
      );
    },
    [onChange, value]
  );

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
  }, [isMenuOpen]);

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
  }, [handleDocumentClick, setupKeyboardNav, teardownKeyboardNav]);

  const setFocusToInput = () => {
    inputRef.current?.focus();
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
    onChange([]);
    handleInputValueChange('');
  }, [handleInputValueChange, onChange]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val === SELECT_ALL) {
      handleClear();
    } else {
      toggleOption(val);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputValueChange(event.target.value);
  };

  const selectedText = React.useMemo(() => {
    const valueLabels = value
      .map((val) => {
        if (renderOptionText) {
          return renderOptionText(val);
        } else {
          const result = options.find((option) => option.value === val);
          return result?.text || null;
        }
      })
      .sort();
    if (valueLabels.length > 1) {
      return (
        <>
          {valueLabels[0]} + {valueLabels.length - 1}
        </>
      );
    }
    return valueLabels[0];
  }, [options, renderOptionText, value]);

  React.useEffect(() => {
    if (!isMenuOpen) {
      handleInputValueChange('');
    }
  }, [handleInputValueChange, isMenuOpen]);

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
          <div className={styles.titleText}>{selectedText || title}</div>
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
        {showSearch && (
          <div className={styles.inputWrapper}>
            <IconSearch size="s" aria-hidden />
            <SearchLabel htmlFor={name} srOnly={true}>
              {inputPlaceholderText}
            </SearchLabel>

            <input
              ref={inputRef}
              id={name}
              name={name}
              placeholder={inputPlaceholderText}
              onChange={handleInputChange}
              value={input}
            />
          </div>
        )}

        {filteredOptions.map((option, index) => {
          const isFocused = index === focusedIndex;
          const isChecked =
            option.value === SELECT_ALL
              ? !value.length
              : value.includes(option.value);

          const setFocus = (ref: HTMLInputElement) => {
            if (isFocused) {
              ref?.focus();
            }
          };

          return (
            <ScrollIntoViewWithFocus
              className={classNames(styles.dropdownItem, {
                [styles['dropdownItem--first']]: index === 0,
                [styles['dropdownItem--isFocused']]: isFocused,
              })}
              key={option.value}
              isFocused={isFocused}
            >
              <Checkbox
                ref={setFocus}
                checked={isChecked}
                id={`${checkboxName}_${option.value}`}
                label={option.text}
                name={checkboxName}
                onChange={handleValueChange}
                value={option.value}
              />
            </ScrollIntoViewWithFocus>
          );
        })}
      </DropdownMenu>
    </div>
  );
};

export default MultiSelectDropdown;
