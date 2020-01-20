import classNames from "classnames";
import React from "react";

import useKeyboardNavigation from "../../../hooks/useDropdownKeyboardNavigation";
import IconAngleDown from "../../../icons/IconAngleDown";
import IconAngleUp from "../../../icons/IconAngleUp";
import Checkbox from "../input/Checkbox";
import ScrollIntoViewWithFocus from "../scrollIntoViewWithFocus/ScrollIntoViewWithFocus";
import DropdownMenu from "./DropdownMenu";
import styles from "./multiSelectDropdown.module.scss";

type Option = {
  text: string;
  value: string;
};

interface Props {
  icon: React.ReactElement;
  name: string;
  onChange: (values: string[]) => void;
  options: Option[];
  title: string;
  value: string[];
}

const Dropdown: React.FC<Props> = ({
  icon,
  name,
  onChange,
  options,
  title,
  value
}) => {
  const [input, setInput] = React.useState("");
  const filteredOptions = React.useMemo(
    () =>
      options.filter(option =>
        option.text.toLowerCase().includes(input.toLowerCase())
      ),
    [input, options]
  );
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

  const handleDocumentKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        // Close menu on ESC key
        case "Escape":
          setIsMenuOpen(false);
          break;
        case "Enter":
          if (focusedIndex < 0) {
            break;
          }

          const currentlyFocusedOption = filteredOptions[focusedIndex];

          if (currentlyFocusedOption)
            toggleOption(currentlyFocusedOption.value);
          break;
      }
    },
    [filteredOptions, focusedIndex, toggleOption]
  );

  const handleDocumentFocusin = (event: FocusEvent) => {
    const target = event.target;
    const current = dropdown && dropdown.current;

    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
    toggleOption(val);
  };

  const handleClear = () => {
    onChange([]);
  };

  return (
    <div className={styles.dropdown} ref={dropdown}>
      <div className={styles.inputWrapper} onClick={toggleMenu}>
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.title}>
          <input
            placeholder={title}
            onChange={event => setInput(event.target.value)}
            value={input}
          />
        </div>
        <div className={styles.arrowWrapper}>
          {isMenuOpen ? <IconAngleUp /> : <IconAngleDown />}
        </div>
      </div>
      <DropdownMenu isOpen={isMenuOpen} onClear={handleClear}>
        {filteredOptions.map((option, index) => {
          const isFocused = index === focusedIndex;

          return (
            <ScrollIntoViewWithFocus key={option.value} isFocused={isFocused}>
              <Checkbox
                checked={value.includes(option.value)}
                name={name}
                onChange={handleValueChange}
                value={option.value}
                className={classNames(styles.dropdownItemPadding, {
                  [styles["checkbox--isFocused"]]: isFocused
                })}
              >
                {option.text}
              </Checkbox>
            </ScrollIntoViewWithFocus>
          );
        })}
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
