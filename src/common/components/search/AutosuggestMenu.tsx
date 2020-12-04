import classNames from 'classnames';
import { IconCross } from 'hds-react';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { AutosuggestMenuOption } from '../../types';
import styles from './autosuggestMenu.module.scss';

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
  options,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className={styles.autosuggestMenu}>
      <div className={styles.title}>
        {t('commons.autosuggest.menu.title')}
        <button
          aria-label={t('commons.autosuggest.menu.ariaButtonClose')}
          className={styles.closeButton}
          onClick={onClose}
        >
          <IconCross aria-hidden />
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
                  [styles['autosuggestOption--isFocused']]:
                    focusedOption === index,
                }
              )}
              role="option"
              tabIndex={-1}
              onClick={handleClick}
              aria-selected={focusedOption === index}
            >
              <div className={styles.text}>{option.text}</div>
            </li>
          );
        })}
      </ul>

      <div className={styles.info}>{t('commons.autosuggest.menu.info')}</div>
    </div>
  );
};

export default AutosuggestMenu;
