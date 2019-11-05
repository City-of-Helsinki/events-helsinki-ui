import classNames from "classnames";
import React, { FunctionComponent } from "react";

import styles from "./autosuggestMenu.module.scss";

interface AutosuggestItem {
  text: string;
  type: string;
}

interface Props {
  items: AutosuggestItem[];
  isOpen: boolean;
}

const AutosuggestMenu: FunctionComponent<Props> = ({ items, isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.autosuggestMenu}>
      <div className={styles.title}>Hakuehdotuksia</div>
      <ul className={styles.autosuggesItems}>
        {items.map(item => {
          return (
            <li
              className={classNames(
                styles.autosuggesItem,
                styles[`autosuggestItem--${item.type}`]
              )}
            >
              <div className={styles.colorIndicator} />
              <div className={styles.icon} />
              <div className={styles.textWrapper}>
                <button>
                  <div className={styles.text}>{item.text}</div>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.info}>
        Voit myös etsiä kirjoittamallasi hakusanalla
      </div>
    </div>
  );
};

export default AutosuggestMenu;
