import classNames from "classnames";
import { IconAngleRight } from "hds-react";
import React, { ChangeEvent, FunctionComponent, MutableRefObject } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

import { DATE_TYPES } from "../../../constants";
import IconAngleLeft from "../../../icons/IconAngleLeft";
import IconCalendarAdd from "../../../icons/IconCalendarAdd";
import Checkbox from "../input/Checkbox";
import DateRangePicker from "./DateRangePicker";
import styles from "./dateSelectorMenu.module.scss"; // the locale you want

interface Props {
  backBtnRef: MutableRefObject<HTMLButtonElement | null>;
  dateTypes: string[];
  endDate: Date | null;
  isCustomDate: boolean;
  isOpen: boolean;
  name: string;
  onChangeDateTypes: (value: string[]) => void;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  onCloseMenu: () => void;
  startDate: Date | null;
  toggleBtnRef: MutableRefObject<HTMLButtonElement | null>;
  toggleIsCustomDate: () => void;
}

const DateSelectorMenu: FunctionComponent<Props> = ({
  backBtnRef,
  dateTypes,
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
  const { pathname } = useLocation();

  if (!isOpen) return null;

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (dateTypes.indexOf(event.target.value) !== -1) {
      onChangeDateTypes(dateTypes.filter(item => item !== event.target.value));
    } else {
      onChangeDateTypes([...dateTypes, event.target.value]);
    }
  };

  return (
    <div className={styles.dateSelectorMenu}>
      {!isCustomDate && (
        <div className={styles.wrapper}>
          <Checkbox
            checked={dateTypes.indexOf(DATE_TYPES.TODAY) !== -1}
            name={name}
            onChange={handleCheckboxChange}
            value={DATE_TYPES.TODAY}
          >
            {t("commons.dateSelector.dateTypeToday")}
          </Checkbox>
          <Checkbox
            checked={dateTypes.includes(DATE_TYPES.TOMORROW)}
            name={name}
            onChange={handleCheckboxChange}
            value={DATE_TYPES.TOMORROW}
          >
            {t("commons.dateSelector.dateTypeTomorrow")}
          </Checkbox>
          <Checkbox
            checked={dateTypes.includes(DATE_TYPES.THIS_WEEK)}
            name={name}
            onChange={handleCheckboxChange}
            value={DATE_TYPES.THIS_WEEK}
          >
            {t("commons.dateSelector.dateTypeThisWeek")}
          </Checkbox>
          <Checkbox
            checked={dateTypes.includes(DATE_TYPES.WEEKEND)}
            name={name}
            onChange={handleCheckboxChange}
            value={DATE_TYPES.WEEKEND}
          >
            {t("commons.dateSelector.dateTypeWeekend")}
          </Checkbox>
        </div>
      )}

      <button
        ref={toggleBtnRef}
        className={classNames(styles.button, styles.btnSelectDates, {
          [styles.hidden]: isCustomDate
        })}
        onClick={toggleIsCustomDate}
      >
        <IconCalendarAdd />
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
            locale={pathname.split("/")[1]}
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
      >
        <div className={styles.buttonText}>
          {t("commons.dateSelector.menu.buttonClose")}
        </div>
      </button>
    </div>
  );
};

export default DateSelectorMenu;
