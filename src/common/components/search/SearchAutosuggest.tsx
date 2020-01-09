import React, { ChangeEvent, FunctionComponent } from "react";

import { ReactComponent as SearchIcon } from "../../../assets/icons/svg/search.svg";
import { KEYWORD_TYPES } from "../../../constants";
import { useKeywordListQuery } from "../../../generated/graphql";
import useDebounce from "../../../hooks/useDebounce";
import getLocale from "../../../util/getLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import { AutosuggestMenuItem, Category as CategoryType } from "../../types";
import Category from "../category/Category";
import AutosuggestMenu from "./AutosuggestMenu";
import styles from "./searchAutosuggest.module.scss";

interface Props {
  categories: CategoryType[];
  onChangeSearchValue: (value: string) => void;
  onRemoveCategory?: (category: CategoryType) => void;
  placeholder: string;
  searchValue: string;
}

const SearchAutosuggest: FunctionComponent<Props> = ({
  categories,
  onRemoveCategory,
  onChangeSearchValue,
  placeholder,
  searchValue
}) => {
  const locale = getLocale();
  const container = React.useRef<HTMLDivElement | null>(null);
  const categoryWrapper = React.useRef<HTMLDivElement | null>(null);
  const input = React.useRef<HTMLInputElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const internalInputValue = useDebounce(searchValue, 500);

  const { data: keywordsData } = useKeywordListQuery({
    skip: !internalInputValue,
    variables: {
      pageSize: 5,
      text: internalInputValue
    }
  });

  const autosuggestItems = React.useMemo(() => {
    const items = [];
    if (keywordsData) {
      items.push(
        ...keywordsData.keywordList.data.map(keyword => ({
          text: getLocalisedString(keyword.name, locale),
          type: keyword.id.startsWith("yso")
            ? KEYWORD_TYPES.YSO
            : KEYWORD_TYPES.CATEGORY
        }))
      );
    }
    return items;
  }, [keywordsData, locale]);

  // This is moch data so no need to translate items
  const mochAutosuggestItems = [
    {
      text: "Luonto ja ulkoilu",
      type: KEYWORD_TYPES.CATEGORY
    },
    {
      text: "Maastojuoksu",
      type: KEYWORD_TYPES.YSO
    },
    {
      text: "Maastopyöräily",
      type: KEYWORD_TYPES.YSO
    },
    {
      text: "Sunnistus",
      type: KEYWORD_TYPES.YSO
    },
    {
      text: "Keskusta",
      type: KEYWORD_TYPES.AREA
    },
    {
      text: "Käpylä",
      type: KEYWORD_TYPES.AREA
    },
    {
      text: "Kisahalli",
      type: KEYWORD_TYPES.SERVICE_POINT
    },
    {
      text: "Annatalo",
      type: KEYWORD_TYPES.SERVICE_POINT
    },
    {
      text: "Stoa",
      type: KEYWORD_TYPES.SERVICE_POINT
    },
    {
      text: "Caisa",
      type: KEYWORD_TYPES.SERVICE_POINT
    }
  ];

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

    onChangeSearchValue(item.text);
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
        <SearchIcon />
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
        // items={mockAutosuggestItems}
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onItemClick={handleMenuItemClick}
      />
    </div>
  );
};

export default SearchAutosuggest;
