import { isPast } from 'date-fns';
import { IconCalendarPlus } from 'hds-react';
import React, { ChangeEvent, MutableRefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { DATE_PICKER_INPUT, DATE_PICKER_INPUT_STATE } from '../../../constants';
import { convertFinnishDateStrToDate } from '../../../util/dateUtils';
import styles from './dateRangeInputs.module.scss';

export interface DateRangeInputsProps {
  endDateRaw: string;
  endDateRef?: MutableRefObject<HTMLInputElement | null>;
  inputName: string;
  // onBlur method is overriden by ReactDatePicker so name this as onBlurInput
  onBlurInput: (
    selectedDatePickerInput: DATE_PICKER_INPUT_STATE,
    value: Date | null
  ) => void;
  setDatePickerInput: (
    selectedDatePickerInput: DATE_PICKER_INPUT_STATE
  ) => void;
  endDate: Date | null;
  setEndDateRaw: (val: string) => void;
  setStartDateRaw: (val: string) => void;
  startDate: Date | null;
  startDateRaw: string;
  startDateRef?: MutableRefObject<HTMLInputElement | null>;
}

// Use class instead of function component so the ref is passed correctly by ReactDatePicker
const DateRangeInputs: React.FC<DateRangeInputsProps> = React.forwardRef<
  HTMLDivElement,
  DateRangeInputsProps
>(
  (
    {
      endDate,
      endDateRaw,
      endDateRef,
      inputName,
      onBlurInput,
      setDatePickerInput,
      setEndDateRaw,
      setStartDateRaw,
      startDate,
      startDateRaw,
      startDateRef,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation();
    const handleInputChange = (field: DATE_PICKER_INPUT) => (
      e: ChangeEvent<HTMLInputElement>
    ): void => {
      switch (field) {
        case DATE_PICKER_INPUT.END:
          setEndDateRaw(e.target.value);
          break;
        case DATE_PICKER_INPUT.START:
          setStartDateRaw(e.target.value);
          break;
      }
    };

    const handleInputBlur = (field: DATE_PICKER_INPUT) => (
      e: React.FocusEvent<HTMLInputElement>
    ): void => {
      let newDate = convertFinnishDateStrToDate(e.target.value);

      if (newDate && isPast(newDate)) {
        newDate = field === DATE_PICKER_INPUT.START ? startDate : endDate;
      }

      switch (field) {
        case DATE_PICKER_INPUT.END:
          onBlurInput(DATE_PICKER_INPUT_STATE.END_TIME_SELECTED, newDate);
          break;
        case DATE_PICKER_INPUT.START:
          onBlurInput(DATE_PICKER_INPUT_STATE.START_TIME_SELECTED, newDate);
          break;
      }
    };

    return (
      <div className={styles.dateRangeInputsContainer} ref={ref}>
        <div className={styles.dateInputWrapper}>
          <label className={styles.label} htmlFor={`${inputName}_start_date`}>
            {t('commons.dateSelector.labelStartDate')}
          </label>
          <div className={styles.formatInfo}>
            {t('commons.dateSelector.infoDate')}
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.input}>
              <input
                {...rest}
                ref={startDateRef}
                id={`${inputName}_start_date`}
                name={`${inputName}_start_date`}
                onBlur={handleInputBlur(DATE_PICKER_INPUT.START)}
                onChange={handleInputChange(DATE_PICKER_INPUT.START)}
                onFocus={() =>
                  setDatePickerInput(
                    DATE_PICKER_INPUT_STATE.START_TIME_SELECTED
                  )
                }
                value={startDateRaw}
              />
            </div>
            <div className={styles.icon}>
              <IconCalendarPlus />
            </div>
          </div>
        </div>
        <div className={styles.dateSeparator}>—</div>
        <div className={styles.dateInputWrapper}>
          <label htmlFor={`${inputName}_end_date`}>
            {t('commons.dateSelector.labelEndDate')}
          </label>
          <div className={styles.formatInfo}>
            {t('commons.dateSelector.infoDate')}
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.input}>
              <input
                {...rest}
                ref={endDateRef}
                id={`${inputName}_end_date`}
                name={`${inputName}_end_date`}
                onBlur={handleInputBlur(DATE_PICKER_INPUT.END)}
                onChange={handleInputChange(DATE_PICKER_INPUT.END)}
                onFocus={() =>
                  setDatePickerInput(DATE_PICKER_INPUT_STATE.END_TIME_SELECTED)
                }
                value={endDateRaw}
              />
            </div>
            <div className={styles.icon}>
              <IconCalendarPlus />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default DateRangeInputs;
