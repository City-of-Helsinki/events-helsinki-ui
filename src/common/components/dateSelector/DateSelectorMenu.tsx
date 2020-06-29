import classNames from "classnames";
import { IconAngleLeft, IconAngleRight, IconCalendarPlus } from "hds-react";
import React, { ChangeEvent, FunctionComponent, MutableRefObject } from "react";
import { useTranslation } from "react-i18next";

import useLocale from "../../../hooks/useLocale";
import { translateValue } from "../../../util/translateUtils";
import Checkbox from "../checkbox/Checkbox";
import DateRangePicker from "../dateRangePicker/DateRangePicker";
import styles from "./dateSelectorMenu.module.scss"; // the locale you want

interface Props {
  backBtnRef?: MutableRefObject<HTMLButtonElement | null>;
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
  toggleBtnRef?: MutableRefObject<HTMLButtonElement | null>;
  toggleIsCustomDate: () => void;
}

const DateSelectorMenu: FunctionComponent<Props> = ({
  backBtnRef,
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
  toggleBtnRef,
  toggleIsCustomDate
}) => {
  const { t } = useTranslation();
  const locale = useLocale();

  if (!isOpen) return null;

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (dateTypes.indexOf(event.target.value) !== -1) {
      onChangeDateTypes(dateTypes.filter(item => item !== event.target.value));
    } else {
      onChangeDateTypes([...dateTypes, event.target.value]);
    }
  };

  return (
    <div
      className={classNames(styles.dateSelectorMenu, {
        [styles.isCustomDate]: isCustomDate
      })}
    >
      {!isCustomDate && (
        <div className={styles.checkboxWrapper}>
          {dateTypeOptions.map(option => {
            return (
              <Checkbox
                key={option}
                checked={dateTypes.indexOf(option) !== -1}
                id={`name_${option}`}
                label={translateValue(
                  "commons.dateSelector.dateType",
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
        ref={toggleBtnRef}
        className={classNames(styles.button, styles.btnSelectDates, {
          [styles.hidden]: isCustomDate
        })}
        onClick={toggleIsCustomDate}
        type="button"
      >
        <IconCalendarPlus />
        <div className={styles.buttonText}>
          {t("commons.dateSelector.menu.buttonCustom")}
        </div>
        <IconAngleRight />
      </button>

      <button
        ref={backBtnRef}
        className={classNames(styles.button, styles.btnBack, {
          [styles.hidden]: !isCustomDate
        })}
        onClick={toggleIsCustomDate}
        type="button"
      >
        <IconAngleLeft />
        <div className={styles.buttonText}>
          {t("commons.dateSelector.menu.buttonBack")}
        </div>
      </button>

      {isCustomDate && (
        <div className={styles.wrapper}>
          <DateRangePicker
            endDate={endDate}
            isMenuOpen={isCustomDate}
            locale={locale}
            name={name}
            onChangeEndDate={onChangeEndDate}
            onChangeStartDate={onChangeStartDate}
            startDate={startDate}
          />
        </div>
      )}
      <button
        className={classNames(styles.button, styles.btnClose, {
          [styles.hidden]: !isCustomDate
        })}
        onClick={onCloseMenu}
        type="button"
      >
        <div className={styles.buttonText}>
          {t("commons.dateSelector.menu.buttonClose")}
        </div>
      </button>
    </div>
  );
};

export default DateSelectorMenu;
