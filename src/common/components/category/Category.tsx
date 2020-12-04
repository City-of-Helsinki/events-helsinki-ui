import { IconCross } from 'hds-react';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { Category as CategoryType } from '../../types';
import styles from './category.module.scss';

interface Props {
  category: CategoryType;
  onRemove: (category: CategoryType) => void;
}

const Category: FunctionComponent<Props> = ({ category, onRemove }) => {
  const { t } = useTranslation();

  const handleRemove = () => {
    onRemove(category);
  };

  return (
    <div className={styles.category}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleRemove}
        aria-label={t('commons.category.ariaButtonRemove', {
          category: category.text,
        })}
      >
        <IconCross aria-hidden />
      </button>
      {category.text}
    </div>
  );
};

export default Category;
