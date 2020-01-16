import "hds-core/lib/icons/icon-location.css";

import classNames from "classnames";
import { IconClose, IconLocation } from "hds-react";
import React, { FunctionComponent } from "react";

import { formatMessage } from "../../translation/TranslationUtils";
import { AutosuggestMenuOption } from "../../types";
import styles from "./autosuggestMenu.module.scss";

interface Props {
  focusedOption: number;
  isOpen: boolean;
  onClose: () => void;
  onOptionClick: (item: AutosuggestMenuOption) => void;
  options: AutosuggestMenuOption[];
}

const AutosuggestMenu: FunctionComponent<Props> = ({
  focusedOption,
  isOpen,
  onClose,
  onOptionClick,
  options
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.autosuggestMenu}>
      <div className={styles.title}>
        {formatMessage("commons.autosuggest.menu.title")}
        <button
          aria-label={formatMessage("commons.autosuggest.menu.ariaButtonClose")}
          className={styles.closeButton}
          onClick={onClose}
        >
          <IconClose />
        </button>
      </div>
      <ul className={styles.autosuggestOptions} role="listbox">
        {options.map((option, index) => {
          const handleClick = () => {
            onOptionClick(option);
          };
          return (
            <li
              key={index}
              className={classNames(
                styles.autosuggestOption,
                styles[`autosuggestOption--${option.type}`],
                {
                  [styles["autosuggestOption--isFocused"]]:
                    focusedOption === index
                }
              )}
              role="option"
              aria-selected={focusedOption === index}
            >
              <div className={styles.colorIndicator} />
              <div className={styles.icon}>
                {option.type === "district" && <IconLocation />}
              </div>
              <div className={styles.textWrapper} onClick={handleClick}>
                <div className={styles.text}>{option.text}</div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.info}>
        {formatMessage("commons.autosuggest.menu.info")}
      </div>
    </div>
  );
};

export default AutosuggestMenu;
