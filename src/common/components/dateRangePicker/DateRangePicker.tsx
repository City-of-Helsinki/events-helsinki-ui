import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.scss";

import { isBefore } from "date-fns";
import fi from "date-fns/locale/fi";
import sv from "date-fns/locale/sv";
import React, { FunctionComponent, MutableRefObject } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import { formatDate } from "../../../util/dateUtils";
import DateRangeInputs from "./DateRangeInputs";

registerLocale("fi", fi);
registerLocale("sv", sv);

interface Props {
  endDate: Date | null;
  locale: string;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  startDate: Date | null;
}

const DateRangePicker: FunctionComponent<Props> = ({
  endDate,
  locale,
  onChangeEndDate,
  onChangeStartDate,
  startDate
}) => {
  // References to input fields to set focus
  const datePicker = React.useRef(null);
  const endDateRef = React.useRef<HTMLInputElement>(null);
  const startDateRef = React.useRef<HTMLInputElement>(null);
  // Variable to keep track on date field
  const [counter, setCounter] = React.useState(1);
  // Raw dates to be saved for input fields
  const [startDateRaw, setStartDateRaw] = React.useState<string>(
    formatDate(startDate)
  );
  const [endDateRaw, setEndDateRaw] = React.useState<string>(
    formatDate(endDate)
  );

  const handleInputBlur = (
    ref: MutableRefObject<HTMLInputElement | null>,
    date: Date | null
  ) => {
    switch (ref) {
      case endDateRef:
        onChangeEndDate(date);
        setCounter(1);
        break;
      case startDateRef:
        onChangeStartDate(date);
        setCounter(2);
        break;
    }

    // setSelected method is not added to ReactDatePicker types, but method still exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const current: any = datePicker.current;
    if (current) {
      // Force datepicker to update selected value so the datepicker is selected to current date
      current.setSelected(date);
    }
  };

  return (
    <DatePicker
      ref={datePicker}
      locale={locale}
      minDate={new Date()}
      inlineFocusSelectedMonth={false}
      selectsStart={true}
      selectsEnd={true}
      selected={counter === 1 ? endDate : startDate}
      // Inline datepicker doesn't have field so keep datepicker alway open instead
      open
      popperClassName={"react-datepicker__no-popper"}
      showPopperArrow={false}
      onChange={date => {
        if (counter === 1) {
          onChangeStartDate(date);
          setStartDateRaw(formatDate(date));

          onChangeEndDate(null);
          setEndDateRaw("");

          setCounter(counter + 1);

          // Set focus to end date field
          if (endDateRef && endDateRef.current) {
            endDateRef.current.focus();
          }
        } else if (counter === 2) {
          if (date && startDate && isBefore(date, startDate)) {
            // Swap start and end date if end date if before start date
            onChangeStartDate(date);
            setStartDateRaw(formatDate(date));

            onChangeEndDate(startDate);
            setEndDateRaw(formatDate(startDate));
          } else {
            onChangeStartDate(startDate);
            setStartDateRaw(formatDate(startDate));

            onChangeEndDate(date);
            setEndDateRaw(formatDate(date));
          }
          setCounter(1);
        }
      }}
      customInput={
        <DateRangeInputs
          endDate={endDate}
          endDateRaw={endDateRaw}
          endDateRef={endDateRef}
          onBlurInput={handleInputBlur}
          setCounter={setCounter}
          setEndDateRaw={setEndDateRaw}
          setStartDateRaw={setStartDateRaw}
          startDate={startDate}
          startDateRaw={startDateRaw}
          startDateRef={startDateRef}
        />
      }
      startDate={startDate}
      endDate={endDate}
    />
  );
};

export default DateRangePicker;
