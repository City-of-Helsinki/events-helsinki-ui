import { IconSearch } from 'hds-react';
import React, { ChangeEvent } from 'react';

import {
  AUTOSUGGEST_KEYWORD_BLACK_LIST,
  AUTOSUGGEST_TYPES,
} from '../../../constants';
import { useKeywordListQuery } from '../../../generated/graphql';
import useDebounce from '../../../hooks/useDebounce';
import useKeyboardNavigation from '../../../hooks/useDropdownKeyboardNavigation';
import useLocale from '../../../hooks/useLocale';
import getLocalisedString from '../../../util/getLocalisedString';
import { AutosuggestMenuOption } from '../../types';
import AutosuggestMenu from './AutosuggestMenu';
import styles from './searchAutosuggest.module.scss';

export interface SearchAutosuggestProps {
  name: string;
  onChangeSearchValue: (value: string) => void;
  onOptionClick: (item: AutosuggestMenuOption) => void;
  placeholder: string;
  searchValue: string;
}

const SearchAutosuggest: React.FC<SearchAutosuggestProps> = ({
  name,
  onOptionClick,
  onChangeSearchValue,
  placeholder,
  searchValue,
}) => {
  const locale = useLocale();
  const container = React.useRef<HTMLDivElement | null>(null);
  const input = React.useRef<HTMLInputElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const internalInputValue = useDebounce(searchValue, 300);

  const { data: keywordsData, loading: loadingKeywords } = useKeywordListQuery({
    skip: !internalInputValue,
    variables: {
      hasUpcomingEvents: true,
      pageSize: 5,
      text: internalInputValue,
    },
  });

  const [autoSuggestItems, setAutoSuggestItems] = React.useState<
    AutosuggestMenuOption[]
  >([]);

  const ensureMenuIsClosed = React.useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  const ensureMenuIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const {
    focusedIndex,
    setup: setupKeyboardNav,
    teardown: teardownKeyboardNav,
  } = useKeyboardNavigation({
    container: container,
    listLength: autoSuggestItems.length,
    onKeyDown: (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          ensureMenuIsOpen();
          break;
        case 'Escape':
          handleCloseMenu();
          break;
        case 'Enter':
          const selectedItem = autoSuggestItems[focusedIndex];

          if (selectedItem) {
            handleMenuOptionClick(selectedItem);
          } else {
            // Search by text if no option is selected
            handleMenuOptionClick({
              text: searchValue,
              type: AUTOSUGGEST_TYPES.TEXT,
              value: searchValue,
            });
          }
          break;
        case 'Tab':
          ensureMenuIsClosed();
      }
    },
  });

  React.useEffect(() => {
    if (loadingKeywords) return;

    const items: AutosuggestMenuOption[] = [];
    const textItem = {
      text: internalInputValue,
      type: AUTOSUGGEST_TYPES.TEXT,
      value: internalInputValue,
    };

    items.push(textItem);

    items.push(
      ...(keywordsData?.keywordList.data
        .filter((keyword) => {
          const name = getLocalisedString(keyword.name, locale).toLowerCase();
          return (
            !AUTOSUGGEST_KEYWORD_BLACK_LIST.includes(keyword.id || '') &&
            name &&
            name !== textItem.text.toLowerCase()
          );
        })
        .map((keyword) => ({
          text: getLocalisedString(keyword.name, locale),
          type: AUTOSUGGEST_TYPES.KEYWORD,
          value: keyword.id || '',
        })) || [])
    );

    setAutoSuggestItems(items.filter((item) => item.text));
  }, [internalInputValue, keywordsData, loadingKeywords, locale]);

  const handleCloseMenu = React.useCallback(() => {
    setFocusToInput();

    ensureMenuIsClosed();
  }, [ensureMenuIsClosed]);

  const handleMenuOptionClick = React.useCallback(
    (option: AutosuggestMenuOption) => {
      onOptionClick(option);
      handleCloseMenu();
    },
    [handleCloseMenu, onOptionClick]
  );

  const setFocusToInput = () => {
    input.current?.focus();
  };

  const handleComponentClick = () => {
    setFocusToInput();
  };

  const onDocumentClick = React.useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const current = container.current;

      // Close menu when clicking outside of the component
      if (!(target instanceof Node && current?.contains(target))) {
        isMenuOpen && setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  const onDocumentFocusin = React.useCallback(
    (event: FocusEvent) => {
      const target = event.target;
      const current = container.current;

      if (!(target instanceof Node && current?.contains(target))) {
        ensureMenuIsClosed();
      }
    },
    [ensureMenuIsClosed]
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    onChangeSearchValue(newValue);

    ensureMenuIsOpen();
  };

  const handleInputFocus = () => {
    ensureMenuIsOpen();
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
  }, [
    onDocumentClick,
    onDocumentFocusin,
    setupKeyboardNav,
    teardownKeyboardNav,
  ]);

  return (
    <div
      onClick={handleComponentClick}
      className={styles.searchAutosuggest}
      ref={container}
    >
      <div className={styles.iconWrapper}>
        <IconSearch size="s" aria-hidden />
      </div>
      <div className={styles.inputWrapper}>
        <input
          ref={input}
          id={name}
          name={name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          type="text"
          value={searchValue}
        />
      </div>
      <AutosuggestMenu
        focusedOption={focusedIndex}
        isOpen={!!searchValue && isMenuOpen}
        onClose={handleCloseMenu}
        onOptionClick={handleMenuOptionClick}
        options={autoSuggestItems}
      />
    </div>
  );
};

export default SearchAutosuggest;
