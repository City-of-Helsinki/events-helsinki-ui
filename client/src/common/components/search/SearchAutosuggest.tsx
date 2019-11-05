import React, { ChangeEvent, FunctionComponent } from "react";

import { ReactComponent as SearchIcon } from "../../../assets/icons/svg/search.svg";
import { Category as CategoryType } from "../../types";
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
  const input = React.useRef<HTMLInputElement | null>(null);
  const [searchValue, setSearchValue] = React.useState("");

  const handleComponentClick = () => {
    if (input && input.current) {
      // Set focus on input field when clicking container
      input.current.focus();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  React.useEffect(() => {
    const current = container && container.current;

    // Add event listener to component to set focus on input
    if (current) {
      current.addEventListener("click", handleComponentClick);
    }

    // Clean up event listener to prevent memory leaks
    return () => {
      if (current) {
        current.removeEventListener("click", handleComponentClick);
      }
    };
  }, []);

  return (
    <div className={styles.searchAutosuggest} ref={container}>
      <div className={styles.iconWrapper}>
        <SearchIcon />
      </div>
      <div>
        {categories.map(category => {
          return (
            <Category
              key={category.value}
              category={category}
              onRemove={onRemoveCategory}
            />
          );
        })}
      </div>
      <div className={styles.inputWrapper}>
        <input
          ref={input}
          onChange={handleInputChange}
          placeholder={placeholder}
          type="text"
          value={searchValue}
        />
      </div>
    </div>
  );
};

export default SearchAutosuggest;
