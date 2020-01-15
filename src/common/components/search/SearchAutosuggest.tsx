import { IconSearch } from "hds-react";
import get from "lodash/get";
import React, { ChangeEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { DISTRICTS, KEYWORD_TYPES } from "../../../constants";
import {
  useKeywordListQuery,
  usePlaceListQuery
} from "../../../generated/graphql";
import useDebounce from "../../../hooks/useDebounce";
import getLocale from "../../../util/getLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import { translateValue } from "../../../util/translateUtils";
import { AutosuggestMenuItem, Category as CategoryType } from "../../types";
import Category from "../category/Category";
import AutosuggestMenu from "./AutosuggestMenu";
import styles from "./searchAutosuggest.module.scss";

interface Props {
  categories: CategoryType[];
  onChangeSearchValue: (value: string) => void;
  onMenuItemClick: (item: AutosuggestMenuItem) => void;
  onRemoveCategory?: (category: CategoryType) => void;
  placeholder: string;
  searchValue: string;
}

const SearchAutosuggest: FunctionComponent<Props> = ({
  categories,
  onMenuItemClick,
  onRemoveCategory,
  onChangeSearchValue,
  placeholder,
  searchValue
}) => {
  const { t } = useTranslation();
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

  const autosuggestItems: AutosuggestMenuItem[] = React.useMemo(() => {
    const items = [];
    if (keywordsData) {
      items.push(
        ...keywordsData.keywordList.data.map(keyword => ({
          text: getLocalisedString(keyword.name, locale),
          type: keyword.id.startsWith("yso")
            ? KEYWORD_TYPES.YSO
            : KEYWORD_TYPES.KEYWORD,
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
            type: KEYWORD_TYPES.DISTRICT,
            value: item.value
          }))
      );
    }
    if (placesData) {
      items.push(
        ...placesData.placeList.data.map(place => ({
          text: place.name ? getLocalisedString(place.name, locale) : "",
          type: KEYWORD_TYPES.PLACE,
          value: place.id
        }))
      );
    }

    return items.filter(item => item.text);
  }, [districtOptions, internalInputValue, keywordsData, locale, placesData]);

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

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = container && container.current;

    // Close menu when clicking outside of the component
    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const handleDocumentKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      // Close menu on ESC key
      case 27:
        setIsMenuOpen(false);
        break;
    }
  };

  const handleDocumentFocusin = (event: FocusEvent) => {
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
    setIsMenuOpen(true);
  };

  const handleInputFocus = () => {
    // Open menu when focused on the search input
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    // Set focus to input so the menu is not opened again afted focusing to input
    setFocusToInput();

    // Close menu when clicking close button
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = (item: AutosuggestMenuItem) => {
    // Set focus to input so the menu is not opened again afted focusing to input
    setFocusToInput();

    onMenuItemClick(item);
    // Close menu when selecting one of the autosuggest items
    setIsMenuOpen(false);
  };

  const handleRemoveCategory = (category: CategoryType) => {
    if (onRemoveCategory) {
      onRemoveCategory(category);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeyDown);
    document.addEventListener("focusin", handleDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeyDown);
      document.removeEventListener("focusin", handleDocumentFocusin);
    };
  }, []);

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
        items={autosuggestItems}
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onItemClick={handleMenuItemClick}
      />
    </div>
  );
};

export default SearchAutosuggest;
