import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './dropdownMenu.module.scss';

interface Props {
  isOpen: boolean;
  onClear: () => void;
}

const DropdownMenu: React.FC<Props> = ({ children, isOpen, onClear }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className={styles.dropdownMenu}>
      <div className={styles.dropdownMenuWrapper}>{children}</div>
      <button className={styles.btnClear} onClick={onClear} type="button">
        {t('commons.dropdown.menu.buttonClear')}
      </button>
    </div>
  );
};

export default DropdownMenu;
