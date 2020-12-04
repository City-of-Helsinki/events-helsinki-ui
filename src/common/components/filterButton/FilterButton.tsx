import classNames from 'classnames';
import { IconCross } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './filterButton.module.scss';

export type FilterType =
  | 'category'
  | 'date'
  | 'dateType'
  | 'division'
  | 'place'
  | 'publisher'
  | 'target'
  | 'text';

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
  type: FilterType;
  value: string;
}

const FilterButton: React.FC<Props> = ({ onRemove, text, type, value }) => {
  const { t } = useTranslation();

  const handleRemove = () => {
    onRemove(value, type);
  };

  return (
    <div className={classNames(styles.filter, styles[type])}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleRemove}
        aria-label={t('commons.filter.ariaButtonRemove', {
          filter: text,
        })}
      >
        <IconCross size="s" aria-hidden />
      </button>
      {text}
    </div>
  );
};

export default FilterButton;
