import classNames from 'classnames';
import { IconAngleDown, IconGlobe } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useKeyboardNavigation from '../../../../hooks/useDropdownKeyboardNavigation';
import { Language } from '../../../../types';
import styles from './languageDropdown.module.scss';

type LanguageOption = {
  label: string;
  value: Language;
};

const ListItem: React.FC<{
  isFocused: boolean;
  isSelected: boolean;
  onOptionClick: (option: LanguageOption) => void;
  option: LanguageOption;
}> = ({ isFocused, isSelected, onOptionClick, option }) => {
  const component = React.useRef<HTMLButtonElement>(null);

  const handleOptionClick = () => {
    onOptionClick(option);
  };

  React.useEffect(() => {
    if (isFocused) {
      component.current?.focus();
    }
  }, [isFocused]);

  return (
    <li key={option.value} role="menuitem">
      <button
        ref={component}
        className={classNames({
          [styles.isFocused]: isFocused,
          [styles.isSelected]: isSelected,
        })}
        lang={option.value}
        onClick={handleOptionClick}
      >
        {option.label}
      </button>
    </li>
  );
};

export interface LanguageDropdownProps {
  languageOptions: LanguageOption[];
  onChange: (language: Language) => void;
  value: Language;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  languageOptions,
  onChange,
  value,
}) => {
  const container = React.useRef<HTMLDivElement>(null);
  const toggleButton = React.useRef<HTMLButtonElement>(null);

  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {
    focusedIndex,
    setup: setupKeyboardNav,
    teardown: teardownKeyboardNav,
  } = useKeyboardNavigation({
    container: container,
    listLength: languageOptions.length,
    onKeyDown: (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          ensureMenuIsOpen();
          break;
        case 'ArrowDown':
          ensureMenuIsOpen();
          break;
        case 'Escape':
          if (isMenuOpen) {
            setIsMenuOpen(false);
            setFocusToButton();
          }
          break;
        case 'Enter':
          if (isMenuOpen) {
            const option = languageOptions[focusedIndex];
            handleOptionClick(option);
            setFocusToButton();
          }
          event.preventDefault();
          break;
        case 'Tab':
          setIsMenuOpen(false);
      }
    },
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ensureMenuIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const onDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = container.current;

    // Close menu when clicking outside of the component
    if (!(target instanceof Node && current?.contains(target))) {
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
    const current = container.current;

    if (!(target instanceof Node && current?.contains(target))) {
      setIsMenuOpen(false);
    }
  }, []);

  const setFocusToButton = () => {
    toggleButton.current?.focus();
  };

  React.useEffect(() => {
    setupKeyboardNav();
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('focusin', onDocumentFocusin);

    // Clean up event listener to prevent memory leaks
    return () => {
      teardownKeyboardNav();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('focusin', onDocumentFocusin);
    };
  }, [onDocumentFocusin, setupKeyboardNav, teardownKeyboardNav]);

  return (
    <div ref={container} className={styles.languageDropdown}>
      <button
        id="languageDropdown-button"
        ref={toggleButton}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        aria-label={t('header.changeLanguage')}
        className={styles.languageDropdownButton}
        onClick={toggleMenu}
      >
        <IconGlobe className={styles.iconLanguage} aria-hidden />
        <div className={styles.textWrapper}>
          {value.toUpperCase()}
          <IconAngleDown aria-hidden
            className={isMenuOpen ? styles.iconAngleUp : styles.iconAngleDown}
          />
        </div>
      </button>
      {isMenuOpen && (
        <ul
          aria-labelledby="languageDropdown-button"
          role="listbox"
          className={styles.languageDropdownMenu}
        >
          {languageOptions.map((option, index) => {
            return (
              <ListItem
                key={option.value}
                isFocused={focusedIndex === index}
                isSelected={option.value === value}
                onOptionClick={handleOptionClick}
                option={option}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
