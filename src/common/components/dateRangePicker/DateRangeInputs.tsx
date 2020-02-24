import { isPast } from "date-fns";
import React, { ChangeEvent, MutableRefObject } from "react";
import { useTranslation } from "react-i18next";

import IconCalendarAdd from "../../../icons/IconCalendarAdd";
import {
  convertFinnishDateStrToDate,
  formatDate
} from "../../../util/dateUtils";
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
}

// Use class instead of function component so the ref is passed correctly by ReactDatePicker
const DateRangeInputs: React.FC<Props> = ({
  endDate,
  endDateRaw,
  endDateRef,
  onBlurInput,
  setCounter,
  setEndDateRaw,
  setStartDateRaw,
  startDate,
  startDateRaw,
  startDateRef,
  ...rest
}) => {
  const { t } = useTranslation();

  const handleEndDateRawChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDateRaw(e.target.value);
  };

  const handleStartDateRawChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDateRaw(e.target.value);
  };

  const handleBlurStartDate = () => {
    let newDate = convertFinnishDateStrToDate(startDateRaw);

    if (newDate) {
      if (isPast(newDate)) {
        newDate = startDate;
      }
      if (startDateRef) {
        onBlurInput(startDateRef, newDate);
      }

      setStartDateRaw(formatDate(newDate));
    } else {
      setStartDateRaw(formatDate(startDate));
    }
  };

  const handleBlurEndDate = () => {
    let newDate = convertFinnishDateStrToDate(endDateRaw);

    if (newDate) {
      if (isPast(newDate)) {
        newDate = endDate;
      }
      if (endDateRef) {
        onBlurInput(endDateRef, newDate);
      }

      setEndDateRaw(formatDate(newDate));
    } else {
      setEndDateRaw(formatDate(endDate));
    }
  };

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
              onBlur={handleBlurStartDate}
              onChange={handleStartDateRawChange}
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
              onBlur={handleBlurEndDate}
              onChange={handleEndDateRawChange}
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
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default React.forwardRef((props: Props, ref: any) => {
  return <DateRangeInputs {...props} endDateRef={ref} startDateRef={ref} />;
});
