import { IconSearch } from "hds-react";
import get from "lodash/get";
import React, { ChangeEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { AUTOSUGGEST_TYPES, DISTRICTS } from "../../../constants";
import {
  useKeywordListQuery,
  usePlaceListQuery
} from "../../../generated/graphql";
import useDebounce from "../../../hooks/useDebounce";
import getLocale from "../../../util/getLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import { translateValue } from "../../../util/translateUtils";
import { AutosuggestMenuOption, Category as CategoryType } from "../../types";
import Category from "../category/Category";
import AutosuggestMenu from "./AutosuggestMenu";
import styles from "./searchAutosuggest.module.scss";

interface Props {
  categories: CategoryType[];
  onChangeSearchValue: (value: string) => void;
  onOptionClick: (item: AutosuggestMenuOption) => void;
  onRemoveCategory?: (category: CategoryType) => void;
  placeholder: string;
  searchValue: string;
}

const SearchAutosuggest: FunctionComponent<Props> = ({
  categories,
  onOptionClick,
  onRemoveCategory,
  onChangeSearchValue,
  placeholder,
  searchValue
}) => {
  const { t } = useTranslation();
  const [focusedOption, setFocusedOption] = React.useState(-1);
  const locale = getLocale();
  const container = React.useRef<HTMLDivElement | null>(null);
  const categoryWrapper = React.useRef<HTMLDivElement | null>(null);
  const input = React.useRef<HTMLInputElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const internalInputValue = useDebounce(searchValue, 500);

  const districtOptions = React.useMemo(
    () =>
      Object.keys(DISTRICTS)
        .map(key => {
          return {
            text: translateValue("commons.districts.", key, t),
            value: get(DISTRICTS, key)
          };
        })
        .sort((a, b) => (a.text >= b.text ? 1 : -1)),
    [t]
  );

  const { data: keywordsData } = useKeywordListQuery({
    skip: !internalInputValue,
    variables: {
      pageSize: 5,
      text: internalInputValue
    }
  });

  const { data: placesData } = usePlaceListQuery({
    skip: !internalInputValue,
    variables: {
      pageSize: 5,
      text: internalInputValue
    }
  });

  const autosuggestItems: AutosuggestMenuOption[] = React.useMemo(() => {
    const items = [];
    if (keywordsData) {
      items.push(
        ...keywordsData.keywordList.data.map(keyword => ({
          text: getLocalisedString(keyword.name, locale),
          type: keyword.id.startsWith("yso")
            ? AUTOSUGGEST_TYPES.YSO
            : AUTOSUGGEST_TYPES.KEYWORD,
          value: keyword.id
        }))
      );
    }
    if (internalInputValue) {
      items.push(
        ...districtOptions
          .filter(item =>
            item.text.toLowerCase().includes(internalInputValue.toLowerCase())
          )
          .slice(0, 5)
          .map(item => ({
            text: item.text,
            type: AUTOSUGGEST_TYPES.DISTRICT,
            value: item.value
          }))
      );
    }
    if (placesData) {
      items.push(
        ...placesData.placeList.data.map(place => ({
          text: place.name ? getLocalisedString(place.name, locale) : "",
          type: AUTOSUGGEST_TYPES.PLACE,
          value: place.id
        }))
      );
    }

    return items.filter(item => item.text);
  }, [districtOptions, internalInputValue, keywordsData, locale, placesData]);

  const openMenu = React.useCallback(
    (focusOption: "first" | "last") => {
      const openAtIndex =
        focusOption === "first" ? 0 : autosuggestItems.length - 1;
      setFocusedOption(openAtIndex);

      if (searchValue) {
        setIsMenuOpen(true);
      }
    },
    [autosuggestItems.length, searchValue]
  );

  const focusOption = React.useCallback(
    (direction: "down" | "up") => {
      if (!autosuggestItems.length) return;
      switch (direction) {
        case "down":
          setFocusedOption(
            focusedOption < autosuggestItems.length - 1
              ? focusedOption + 1
              : focusedOption >= 0
              ? focusedOption
              : 0
          );
          break;
        case "up":
          setFocusedOption(focusedOption > 0 ? focusedOption - 1 : 0);
          break;
      }
    },
    [autosuggestItems.length, focusedOption]
  );

  const handleCloseMenu = React.useCallback(() => {
    // Set focus to input so the menu is not opened again afted focusing to input
    setFocusToInput();

    // Close menu when clicking close button
    setIsMenuOpen(false);
    setFocusedOption(-1);
  }, []);

  const handleMenuOptionClick = React.useCallback(
    (option: AutosuggestMenuOption) => {
      onOptionClick(option);
      handleCloseMenu();
    },
    [handleCloseMenu, onOptionClick]
  );

  const isComponentFocused = () => {
    const active = document.activeElement;
    const current = container && container.current;

    if (current && active instanceof Node && current.contains(active)) {
      return true;
    }
    return false;
  };

  const isInputFocused = () => {
    const active = document.activeElement;
    const current = input && input.current;

    if (current && active instanceof Node && current.contains(active)) {
      return true;
    }
    return false;
  };

  const onKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      // Handle keyboard events only if current element is focused
      if (!isComponentFocused()) return;

      switch (event.key) {
        case "ArrowUp":
          if (isMenuOpen) {
            focusOption("up");
          } else {
            openMenu("last");
          }
          event.preventDefault();
          break;
        case "ArrowDown":
          if (isMenuOpen) {
            focusOption("down");
          } else {
            openMenu("first");
          }
          event.preventDefault();
          break;
        case "Escape":
          setIsMenuOpen(false);
          setFocusedOption(-1);
          event.preventDefault();
          break;
        case "Enter":
          if (isInputFocused()) {
            const selectedItem = autosuggestItems[focusedOption];

            if (selectedItem) {
              handleMenuOptionClick(selectedItem);
            }
          } else {
            handleCloseMenu();
          }
          event.preventDefault();
          break;
      }
    },
    [
      autosuggestItems,
      focusOption,
      focusedOption,
      handleCloseMenu,
      handleMenuOptionClick,
      isMenuOpen,
      openMenu
    ]
  );

  const setFocusToInput = () => {
    if (input && input.current) {
      input.current.focus();
    }
  };

  const handleComponentClick = (event: React.MouseEvent) => {
    const target = event.target;

    // Set focus on the search input only when clicking component but exlude categories
    if (
      !(
        categoryWrapper.current &&
        target instanceof Node &&
        categoryWrapper.current.contains(target)
      )
    ) {
      // Set focus on input field when clicking container
      setFocusToInput();
    }
  };

  const onDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = container && container.current;

    // Close menu when clicking outside of the component
    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const onDocumentFocusin = (event: FocusEvent) => {
    const target = event.target;
    const current = container && container.current;

    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChangeSearchValue(newValue);
    // Open menu when search value changes
    if (newValue) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  };

  const handleInputFocus = () => {
    // Open menu when focused on the search input
    if (searchValue) {
      setIsMenuOpen(true);
    }
  };

  const handleRemoveCategory = (category: CategoryType) => {
    if (onRemoveCategory) {
      onRemoveCategory(category);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onDocumentFocusin);
    };
  }, [onKeyDown]);

  return (
    <div
      onClick={handleComponentClick}
      className={styles.searchAutosuggest}
      ref={container}
    >
      <div className={styles.iconWrapper}>
        <IconSearch />
      </div>
      <div ref={categoryWrapper}>
        {categories.map(category => {
          return (
            <Category
              key={category.value}
              category={category}
              onRemove={handleRemoveCategory}
            />
          );
        })}
      </div>
      <div className={styles.inputWrapper}>
        <input
          ref={input}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          type="text"
          value={searchValue}
        />
      </div>
      <AutosuggestMenu
        focusedOption={focusedOption}
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onOptionClick={handleMenuOptionClick}
        options={autosuggestItems}
      />
    </div>
  );
};

export default SearchAutosuggest;
