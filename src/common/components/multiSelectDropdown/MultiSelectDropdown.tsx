import classNames from "classnames";
import { IconAngleDown, IconAngleUp } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";

import useKeyboardNavigation from "../../../hooks/useDropdownKeyboardNavigation";
import Checkbox from "../checkbox/Checkbox";
import ScrollIntoViewWithFocus from "../scrollIntoViewWithFocus/ScrollIntoViewWithFocus";
import SearchLabel from "../search/searchLabel/SearchLabel";
import DropdownMenu from "./DropdownMenu";
import styles from "./multiSelectDropdown.module.scss";

const SELECT_ALL = "SELECT_ALL";

export type Option = {
  text: string;
  value: string;
};

interface Props {
  checkboxName: string;
  icon: React.ReactElement;
  inputValue?: string;
  name: string;
  onChange: (values: string[]) => void;
  options: Option[];
  renderOptionText?: (optionValue: string) => React.ReactChild;
  selectAllText?: string;
  setInputValue?: (newVal: string) => void;
  showSelectAll?: boolean;
  title: string;
  value: string[];
}

const Dropdown: React.FC<Props> = ({
  checkboxName,
  icon,
  inputValue,
  name,
  onChange,
  options,
  renderOptionText,
  selectAllText,
  setInputValue,
  showSelectAll,
  title,
  value
}) => {
  const { t } = useTranslation();
  const [internalInput, setInternalInput] = React.useState("");
  const input = inputValue || internalInput;

  const inputWrapper = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const clearButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const filteredOptions = React.useMemo(() => {
    return [
      showSelectAll
        ? {
            text: selectAllText || t("commons.multiSelectDropdown.selectAll"),
            value: SELECT_ALL
          }
        : undefined,
      ...options.filter(option =>
        option.text.toLowerCase().includes(input.toLowerCase())
      )
    ].filter(e => e) as Option[];
  }, [input, options, selectAllText, showSelectAll, t]);

  const handleInputValueChange = (val: string) => {
    setInternalInput(val);

    if (setInputValue) {
      setInputValue(val);
    }
  };

  const dropdown = React.useRef<HTMLDivElement | null>(null);

  const [
    focusedIndex,
    setupKeyboardNav,
    teardownKeyboardNav
  ] = useKeyboardNavigation({
    container: dropdown,
    listLength: filteredOptions.length
  });
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isComponentFocused = React.useCallback(() => {
    const active = document.activeElement;
    const current = dropdown && dropdown.current;

    if (current && active instanceof Node && current.contains(active)) {
      return true;
    }
    return false;
  }, [dropdown]);

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = dropdown && dropdown.current;

    // Close menu when clicking outside of the component
    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const toggleOption = React.useCallback(
    (option: string) => {
      onChange(
        value.includes(option)
          ? value.filter(v => v !== option)
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

  const isInputWrapperFocused = () => {
    const target = document.activeElement;
    const current = inputWrapper.current;

    if (!(current && target instanceof Node && current.contains(target))) {
      return false;
    }

    return true;
  };

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleDocumentKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      // Handle keyboard events only if current element is focused
      if (!isComponentFocused()) return;
      switch (event.key) {
        // Close menu on ESC key
        case "Escape":
          setIsMenuOpen(false);
          break;
        case "ArrowUp":
          ensureDropdownIsOpen();
          break;
        case "ArrowDown":
          ensureDropdownIsOpen();
          break;
        case "Enter":
          if (isInputWrapperFocused()) {
            toggleMenu();
          }
          event.preventDefault();
      }
    },
    [ensureDropdownIsOpen, isComponentFocused, toggleMenu]
  );

  const handleDocumentFocusin = (event: FocusEvent) => {
    const target = event.target;
    const current = dropdown && dropdown.current;

    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    setupKeyboardNav();
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeyDown);
    document.addEventListener("focusin", handleDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      teardownKeyboardNav();
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeyDown);
      document.removeEventListener("focusin", handleDocumentFocusin);
    };
  }, [handleDocumentKeyDown, setupKeyboardNav, teardownKeyboardNav]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val === SELECT_ALL) {
      handleClear();
    } else {
      toggleOption(val);
    }
  };

  const handleClear = () => {
    onChange([]);
  };

  const handleInputWrapperClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    toggleMenu();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ensureDropdownIsOpen();
    handleInputValueChange(event.target.value);
  };

  const selectedText = React.useMemo(() => {
    const valueLabels = value
      .map(val => {
        if (renderOptionText) {
          return renderOptionText(val);
        } else {
          const result = options.find(option => option.value === val);
          return result ? result.text : null;
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

  return (
    <div className={styles.dropdown} ref={dropdown}>
      <div
        className={styles.inputWrapper}
        onClick={handleInputWrapperClick}
        ref={inputWrapper}
      >
        {!!value.length && <div className={styles.isSelectedIndicator} />}
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.title}>
          <SearchLabel htmlFor={name} srOnly={true}>
            {title}
          </SearchLabel>
          {selectedText && !input && (
            <div className={styles.selectedText}>{selectedText}</div>
          )}
          <input
            ref={inputRef}
            id={name}
            name={name}
            placeholder={selectedText ? "" : title}
            onChange={handleInputChange}
            value={input}
          />
        </div>
        <div className={styles.arrowWrapper}>
          {isMenuOpen ? <IconAngleUp /> : <IconAngleDown />}
        </div>
      </div>
      <DropdownMenu
        buttonRef={clearButtonRef}
        isOpen={isMenuOpen}
        onClear={handleClear}
      >
        {filteredOptions.map((option, index) => {
          const isFocused = index === focusedIndex;
          const isChecked =
            option.value === SELECT_ALL
              ? !value.length
              : value.includes(option.value);

          const setFocus = (ref: HTMLInputElement) => {
            if (isFocused && ref) {
              ref.focus();
            }
          };

          return (
            <ScrollIntoViewWithFocus
              className={classNames(styles.dropdownItem, {
                [styles["dropdownItem--first"]]: index === 0,
                [styles["dropdownItem--isFocused"]]: isFocused
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

export default Dropdown;
