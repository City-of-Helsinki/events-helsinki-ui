import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as SupriseMeIcon } from '../../../assets/icons/svg/suprise-me.svg';
import styles from './supriseMeButton.module.scss';

interface Props {
  onClick: () => void;
}

const SupriseMeButton: FunctionComponent<Props> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <button className={styles.supriseMeButton} onClick={onClick} type="button">
      <div className={styles.text}>{t('commons.supriseMe')}</div>
      <SupriseMeIcon />
    </button>
  );
};

export default SupriseMeButton;
