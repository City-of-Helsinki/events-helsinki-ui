import "hds-core/lib/icons/icon-location.css";

import classNames from "classnames";
import { IconClose } from "hds-react";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { AUTOSUGGEST_TYPES } from "../../../constants";
import IconTag from "../../../icons/IconTag";
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
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className={styles.autosuggestMenu}>
      <div className={styles.title}>
        {t("commons.autosuggest.menu.title")}
        <button
          aria-label={t("commons.autosuggest.menu.ariaButtonClose")}
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
                {option.type === AUTOSUGGEST_TYPES.KEYWORD && <IconTag />}
                {option.type === AUTOSUGGEST_TYPES.YSO && <IconTag />}
              </div>
              <div className={styles.textWrapper} onClick={handleClick}>
                <div className={styles.text}>{option.text}</div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.info}>{t("commons.autosuggest.menu.info")}</div>
    </div>
  );
};

export default AutosuggestMenu;
