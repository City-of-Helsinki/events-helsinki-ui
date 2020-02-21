import classNames from "classnames";
import { IconLanguage } from "hds-react";
import React from "react";

import useKeyboardNavigation from "../../../hooks/useDropdownKeyboardNavigation";
import IconAngleDown from "../../../icons/IconAngleDown";
import { Language } from "../../../types";
import styles from "./languageDropdown.module.scss";

type LanguageOption = {
  label: string;
  value: Language;
};

interface Props {
  languageOptions: LanguageOption[];
  onChange: (language: Language) => void;
  value: Language;
}

const LanguageDropdown: React.FC<Props> = ({
  languageOptions,
  onChange,
  value
}) => {
  const container = React.useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [
    focusedIndex,
    setupKeyboardNav,
    teardownKeyboardNav
  ] = useKeyboardNavigation({
    container: container,
    listLength: languageOptions.length
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ensureMenuIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const isComponentFocused = React.useCallback(() => {
    const active = document.activeElement;
    const current = container.current;

    if (current && active instanceof Node && current.contains(active)) {
      return true;
    }
    return false;
  }, [container]);

  const onDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = container && container.current;

    // Close menu when clicking outside of the component
    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const handleOptionClick = React.useCallback(
    (option: LanguageOption) => {
      onChange(option.value);
      setIsMenuOpen(false);
    },
    [onChange]
  );

  const onDocumentFocusin = React.useCallback((event: FocusEvent) => {
    const target = event.target;
    const current = container && container.current;

    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  }, []);

  const onKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (!isComponentFocused()) return;

      switch (event.key) {
        case "ArrowUp":
          ensureMenuIsOpen();
          event.preventDefault();
          break;
        case "ArrowDown":
          ensureMenuIsOpen();
          event.preventDefault();
          break;
        case "Escape":
          setIsMenuOpen(false);
          event.preventDefault();
          break;
        case "Enter":
          if (isMenuOpen) {
            const option = languageOptions[focusedIndex];
            handleOptionClick(option);
            event.preventDefault();
          }
          break;
      }
    },
    [
      ensureMenuIsOpen,
      focusedIndex,
      handleOptionClick,
      isComponentFocused,
      isMenuOpen,
      languageOptions
    ]
  );

  React.useEffect(() => {
    setupKeyboardNav();
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("focusin", onDocumentFocusin);
    document.addEventListener("keydown", onKeyDown);

    // Clean up event listener to prevent memory leaks
    return () => {
      teardownKeyboardNav();
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("focusin", onDocumentFocusin);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onDocumentFocusin, onKeyDown, setupKeyboardNav, teardownKeyboardNav]);

  return (
    <div
      data-testid="language-dropdown"
      className={classNames(styles.languageDropdown, {
        [styles.isMenuOpen]: isMenuOpen
      })}
      ref={container}
    >
      <button
        data-testid="language-dropdown-button"
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        className={styles.languageDropdownButton}
        onClick={toggleMenu}
      >
        <IconLanguage className={styles.iconLanguage} />
        <div className={styles.textWrapper}>
          {value.toUpperCase()}
          <IconAngleDown className={styles.iconAngleDown} />
        </div>
      </button>
      <ul role="menu" className={styles.languageDropdownMenu}>
        {languageOptions.map((option, index) => {
          return (
            <li
              key={option.value}
              className={classNames({
                [styles.isFocused]: focusedIndex === index,
                [styles.isSelected]: option.value === value
              })}
              onClick={() => handleOptionClick(option)}
              role="menuitem"
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageDropdown;
