import React, { ChangeEvent, FunctionComponent } from "react";

import { ReactComponent as SearchIcon } from "../../../assets/icons/svg/search.svg";
import { KEYWORD_TYPES } from "../../../constants";
import { AutosuggestMenuItem, Category as CategoryType } from "../../types";
import AutosuggestMenu from "./AutosuggestMenu";
import Category from "./Category";
import styles from "./searchAutosuggest.module.scss";

interface Props {
  categories: CategoryType[];
  onRemoveCategory: (category: CategoryType) => void;
  placeholder: string;
}

const SearchAutosuggest: FunctionComponent<Props> = ({
  categories,
  onRemoveCategory,
  placeholder
}) => {
  const container = React.useRef<HTMLDivElement | null>(null);
  const categoryWrapper = React.useRef<HTMLDivElement | null>(null);
  const input = React.useRef<HTMLInputElement | null>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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

  const handleBlur = () => {
    // Browser first changes focus to body so wait 1 ms to let focus change to next item
    setTimeout(() => {
      const activeElement = document.activeElement;

      const current = container && container.current;

      // Close menu when moving focus outside of the component
      if (
        !(
          current &&
          activeElement instanceof Node &&
          current.contains(activeElement)
        )
      ) {
        setIsMenuOpen(false);
      }
    }, 1);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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

    setSearchValue(item.text);
    // Close menu when selecting one of the autosuggest items
    setIsMenuOpen(false);
  };

  const handleRemoveCategory = (category: CategoryType) => {
    onRemoveCategory(category);
  };

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeyDown);
    // Clean up event listener to prevent memory leaks
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeyDown);
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
              onBlur={handleBlur}
              category={category}
              onRemove={handleRemoveCategory}
            />
          );
        })}
      </div>
      <div className={styles.inputWrapper}>
        <input
          ref={input}
          onBlur={handleBlur}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          type="text"
          value={searchValue}
        />
      </div>
      <AutosuggestMenu
        items={mochAutosuggestItems}
        isOpen={isMenuOpen}
        onBlur={handleBlur}
        onClose={handleCloseMenu}
        onItemClick={handleMenuItemClick}
      />
    </div>
  );
};

export default SearchAutosuggest;
