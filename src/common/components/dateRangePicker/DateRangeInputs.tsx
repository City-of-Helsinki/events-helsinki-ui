import { isPast } from "date-fns";
import React, { ChangeEvent, MutableRefObject } from "react";

import { DATE_PICKER_INPUT } from "../../../constants";
import IconCalendarAdd from "../../../icons/IconCalendarAdd";
import { convertFinnishDateStrToDate } from "../../../util/dateUtils";
import styles from "./dateRangeInputs.module.scss";

interface Props {
  endDateRaw: string;
  endDateRef?: MutableRefObject<HTMLInputElement | null>;
  // onBlur method is overriden by ReactDatePicker so name this as onBlurInput
  onBlurInput: (
    ref: MutableRefObject<HTMLInputElement | null>,
    value: Date | null
  ) => void;
  setCounter: (counter: number) => void;
  endDate: Date | null;
  setEndDateRaw: (val: string) => void;
  setStartDateRaw: (val: string) => void;
  startDate: Date | null;
  startDateRaw: string;
  startDateRef?: MutableRefObject<HTMLInputElement | null>;
  t: (key: string) => string;
}

// Use class instead of function component so the ref is passed correctly by ReactDatePicker
class DateRangeInputs extends React.Component<Props> {
  handleInputChange = (field: DATE_PICKER_INPUT) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { setEndDateRaw, setStartDateRaw } = this.props;
    switch (field) {
      case DATE_PICKER_INPUT.END:
        setEndDateRaw(e.target.value);
        break;
      case DATE_PICKER_INPUT.START:
        setStartDateRaw(e.target.value);
        break;
    }
  };

  handleInputBlur = (field: DATE_PICKER_INPUT) => (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const {
      endDate,
      endDateRef,
      onBlurInput,
      startDate,
      startDateRef
    } = this.props;
    let newDate = convertFinnishDateStrToDate(e.target.value);

    if (newDate && isPast(newDate)) {
      newDate = field === DATE_PICKER_INPUT.START ? startDate : endDate;
    }

    switch (field) {
      case DATE_PICKER_INPUT.END:
        if (endDateRef) {
          onBlurInput(endDateRef, newDate);
        }
        break;
      case DATE_PICKER_INPUT.START:
        if (startDateRef) {
          onBlurInput(startDateRef, newDate);
        }
        break;
    }
  };

  render() {
    const {
      endDateRaw,
      endDateRef,
      onBlurInput,
      setCounter,
      endDate,
      setEndDateRaw,
      setStartDateRaw,
      startDate,
      startDateRaw,
      startDateRef,
      t,
      ...rest
    } = this.props;

    return (
      <div className={styles.dateRangeInputsContainer}>
        <div className={styles.dateInputWrapper}>
          <label>{t("commons.dateSelector.labelStartDate")}</label>
          <div className={styles.formatInfo}>
            {t("commons.dateSelector.infoDate")}
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.input}>
              <input
                {...rest}
                ref={startDateRef}
                onBlur={this.handleInputBlur(DATE_PICKER_INPUT.START)}
                onChange={this.handleInputChange(DATE_PICKER_INPUT.START)}
                onFocus={() => setCounter(1)}
                value={startDateRaw}
              />
            </div>
            <div className={styles.icon}>
              <IconCalendarAdd />
            </div>
          </div>
        </div>
        <div className={styles.dateSeparator}>—</div>
        <div className={styles.dateInputWrapper}>
          <label>{t("commons.dateSelector.labelEndDate")}</label>
          <div className={styles.formatInfo}>
            {t("commons.dateSelector.infoDate")}
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.input}>
              <input
                {...rest}
                ref={endDateRef}
                onBlur={this.handleInputBlur(DATE_PICKER_INPUT.END)}
                onChange={this.handleInputChange(DATE_PICKER_INPUT.END)}
                onFocus={() => setCounter(2)}
                value={endDateRaw}
              />
            </div>
            <div className={styles.icon}>
              <IconCalendarAdd />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DateRangeInputs;
