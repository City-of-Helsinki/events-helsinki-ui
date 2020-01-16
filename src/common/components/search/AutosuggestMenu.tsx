import "hds-core/lib/icons/icon-location.css";

import classNames from "classnames";
import { IconClose, IconLocation } from "hds-react";
import React, { FunctionComponent } from "react";

import { formatMessage } from "../../translation/TranslationUtils";
import { AutosuggestMenuItem } from "../../types";
import styles from "./autosuggestMenu.module.scss";

interface Props {
  focusedOption: number;
  items: AutosuggestMenuItem[];
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (item: AutosuggestMenuItem) => void;
}

const AutosuggestMenu: FunctionComponent<Props> = ({
  focusedOption,
  items,
  isOpen,
  onClose,
  onItemClick
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
      <ul className={styles.autosuggesItems}>
        {items.map((item, index) => {
          const handleClick = () => {
            onItemClick(item);
          };
          return (
            <li
              key={index}
              className={classNames(
                styles.autosuggesItem,
                styles[`autosuggestItem--${item.type}`],
                {
                  [styles["autosuggesItem--isFocused"]]: focusedOption === index
                }
              )}
            >
              <div className={styles.colorIndicator} />
              <div className={styles.icon}>
                {item.type === "district" && <IconLocation />}
              </div>
              <div className={styles.textWrapper} onClick={handleClick}>
                <div className={styles.text}>{item.text}</div>
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
