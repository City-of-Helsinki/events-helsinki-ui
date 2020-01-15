import "hds-core/lib/icons/icon-location.css";

import classNames from "classnames";
import { IconClose, IconLocation } from "hds-react";
import React, { FunctionComponent } from "react";

import { formatMessage } from "../../translation/TranslationUtils";
import { AutosuggestMenuItem } from "../../types";
import styles from "./autosuggestMenu.module.scss";

interface Props {
  items: AutosuggestMenuItem[];
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (item: AutosuggestMenuItem) => void;
}

const AutosuggestMenu: FunctionComponent<Props> = ({
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
                styles[`autosuggestItem--${item.type}`]
              )}
            >
              <div className={styles.colorIndicator} />
              <div className={styles.icon}>
                {item.type === "area" && <IconLocation />}
              </div>
              <div className={styles.textWrapper}>
                <button onClick={handleClick}>
                  <div className={styles.text}>{item.text}</div>
                </button>
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
