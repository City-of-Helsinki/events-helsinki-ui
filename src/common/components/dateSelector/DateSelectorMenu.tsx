import classNames from 'classnames';
import { IconAngleLeft, IconAngleRight, IconCalendarPlus } from 'hds-react';
import React, { ChangeEvent, FunctionComponent, MutableRefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { translateValue } from '../../../util/translateUtils';
import Checkbox from '../checkbox/Checkbox';
import DateRangePicker from '../dateRangePicker/DateRangePicker';
import styles from './dateSelectorMenu.module.scss'; // the locale you want

export const testIds = {
  menu: 'date-selector-menu',
};

interface Props {
  backBtnRef?: MutableRefObject<HTMLButtonElement | null>;
  customDatesBtnRef?: MutableRefObject<HTMLButtonElement | null>;
  dateTypes: string[];
  dateTypeOptions: string[];
  endDate: Date | null;
  isCustomDate: boolean;
  isOpen: boolean;
  name: string;
  onChangeDateTypes: (value: string[]) => void;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  onCloseMenu: () => void;
  startDate: Date | null;
  toggleIsCustomDate: () => void;
}

const DateSelectorMenu: FunctionComponent<Props> = ({
  backBtnRef,
  customDatesBtnRef,
  dateTypes,
  dateTypeOptions,
  endDate,
  isCustomDate,
  isOpen,
  name,
  onChangeDateTypes,
  onChangeEndDate,
  onChangeStartDate,
  onCloseMenu,
  startDate,
  toggleIsCustomDate,
}) => {
  const { t } = useTranslation();

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (dateTypes.indexOf(event.target.value) !== -1) {
      onChangeDateTypes(
        dateTypes.filter((item) => item !== event.target.value)
      );
    } else {
      onChangeDateTypes([...dateTypes, event.target.value]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid={testIds.menu}
      className={classNames(styles.dateSelectorMenu, {
        [styles.isCustomDate]: isCustomDate,
      })}
    >
      {!isCustomDate && (
        <div className={styles.checkboxWrapper}>
          {dateTypeOptions.map((option) => {
            return (
              <Checkbox
                key={option}
                checked={dateTypes.indexOf(option) !== -1}
                id={`name_${option}`}
                label={translateValue(
                  'commons.dateSelector.dateType',
                  option,
                  t
                )}
                name={name}
                onChange={handleCheckboxChange}
                value={option}
              />
            );
          })}
        </div>
      )}

      <button
        ref={customDatesBtnRef}
        className={classNames(styles.button, styles.btnSelectDates, {
          [styles.hidden]: isCustomDate,
        })}
        onClick={toggleIsCustomDate}
        type="button"
      >
        <IconCalendarPlus aria-hidden />
        <div className={styles.buttonText}>
          {t('commons.dateSelector.menu.buttonCustom')}
        </div>
        <IconAngleRight aria-hidden />
      </button>

      <button
        ref={backBtnRef}
        className={classNames(styles.button, styles.btnBack, {
          [styles.hidden]: !isCustomDate,
        })}
        onClick={toggleIsCustomDate}
        type="button"
      >
        <IconAngleLeft aria-hidden />
        <div className={styles.buttonText}>
          {t('commons.dateSelector.menu.buttonBack')}
        </div>
      </button>

      {isCustomDate && (
        <div className={styles.wrapper}>
          <DateRangePicker
            endDate={endDate}
            onChangeEndDate={onChangeEndDate}
            onChangeStartDate={onChangeStartDate}
            startDate={startDate}
          />
        </div>
      )}
      <button
        className={classNames(styles.button, styles.btnClose, {
          [styles.hidden]: !isCustomDate,
        })}
        onClick={onCloseMenu}
        type="button"
      >
        <div className={styles.buttonText}>
          {t('commons.dateSelector.menu.buttonClose')}
        </div>
      </button>
    </div>
  );
};

export default DateSelectorMenu;
