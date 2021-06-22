import classNames from 'classnames';
import React, { FunctionComponent, MutableRefObject } from 'react';
import { useTranslation } from 'react-i18next';

import DateRangePicker from '../dateRangePicker/DateRangePicker';
import styles from './mobileDateSelectorMenu.module.scss'; // the locale you want

export const testIds = {
  menu: 'mobile-date-selector-menu',
};

interface Props {
  closeBtnRef?: MutableRefObject<HTMLButtonElement | null>;
  endDate: Date | null;
  isOpen: boolean;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  onCloseMenu: () => void;
  startDate: Date | null;
}

const MobileDateSelectorMenu: FunctionComponent<Props> = ({
  closeBtnRef,
  endDate,
  isOpen,
  onChangeEndDate,
  onChangeStartDate,
  onCloseMenu,
  startDate,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;
  return (
    <div data-testid={testIds.menu} className={styles.mobileDateSelectorMenu}>
      <div className={styles.wrapper}>
        <DateRangePicker
          endDate={endDate}
          onChangeEndDate={onChangeEndDate}
          onChangeStartDate={onChangeStartDate}
          startDate={startDate}
        />
      </div>
      <button
        ref={closeBtnRef}
        className={classNames(styles.button, styles.btnClose)}
        onClick={onCloseMenu}
      >
        <div className={styles.buttonText}>
          {t('commons.dateSelector.menu.buttonClose')}
        </div>
      </button>
    </div>
  );
};

export default MobileDateSelectorMenu;
