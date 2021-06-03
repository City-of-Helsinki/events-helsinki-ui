import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.scss';

import isEqual from 'date-fns/isEqual';
import fi from 'date-fns/locale/fi';
import sv from 'date-fns/locale/sv';
import max from 'lodash/max';
import React, { FunctionComponent } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import { DATE_PICKER_INPUT_STATE } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import { formatDate } from '../../../util/dateUtils';
import DateRangeInputs from './DateRangeInputs';

registerLocale('fi', fi);
registerLocale('sv', sv);

export interface DateRangePickerProps {
  endDate: Date | null;
  isMenuOpen: boolean;
  name: string;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  startDate: Date | null;
}

const DateRangePicker: FunctionComponent<DateRangePickerProps> = ({
  endDate,
  isMenuOpen,
  name,
  onChangeEndDate,
  onChangeStartDate,
  startDate,
}) => {
  // References to input fields to set focus
  const { t } = useTranslation();
  const datePicker = React.useRef(null);
  const endDateRef = React.useRef<HTMLInputElement>(null);
  const startDateRef = React.useRef<HTMLInputElement>(null);
  // Variable to keep track on date field
  const [selectedDatePickerInput, setDatePickerInput] = React.useState<
    DATE_PICKER_INPUT_STATE
  >(DATE_PICKER_INPUT_STATE.NOT_SELECTED);
  const locale = useLocale();
  // Raw dates to be saved for input fields
  const [startDateRaw, setStartDateRaw] = React.useState<string>(
    formatDate(startDate)
  );
  const [endDateRaw, setEndDateRaw] = React.useState<string>(
    formatDate(endDate)
  );
  const [shouldChangeFocusToEnd, setShouldChangeFocusToEnd] = React.useState(
    false
  );

  const handleInputBlur = (
    selectedInput: DATE_PICKER_INPUT_STATE,
    date: Date | null
  ) => {
    switch (selectedInput) {
      case DATE_PICKER_INPUT_STATE.END_TIME_SELECTED:
        onChangeEndDate(date);
        setEndDateRaw(formatDate(date));
        break;
      case DATE_PICKER_INPUT_STATE.START_TIME_SELECTED:
        onChangeStartDate(date);
        setStartDateRaw(formatDate(date));
        break;
    }
  };

  const handleDocumentFocusin = React.useCallback(() => {
    const active = document.activeElement;
    const endDateInput = endDateRef.current;
    const startDateInput = startDateRef.current;
    // setSelected method is not added to ReactDatePicker types, but method still exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const current: any = datePicker.current;

    if (
      endDateInput &&
      active instanceof Node &&
      endDateInput.contains(active)
    ) {
      current?.setSelected(endDate);
    }

    if (
      startDateInput &&
      active instanceof Node &&
      startDateInput.contains(active)
    ) {
      current?.setSelected(startDate);
    }
  }, [endDate, startDate]);

  React.useEffect(() => {
    document.addEventListener('focusin', handleDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      document.removeEventListener('focusin', handleDocumentFocusin);
    };
  }, [handleDocumentFocusin]);

  React.useEffect(() => {
    if (isMenuOpen) {
      startDateRef.current?.focus();
    }
  }, [isMenuOpen]);

  // Change focus to end date input on this hook so
  // all other states has been changed as well
  React.useEffect(() => {
    if (shouldChangeFocusToEnd) {
      endDateRef.current?.focus();
      setShouldChangeFocusToEnd(false);
    }
  }, [shouldChangeFocusToEnd]);

  const getSelectedDate = () => {
    switch (selectedDatePickerInput) {
      case DATE_PICKER_INPUT_STATE.END_TIME_SELECTED:
        return startDate;
      case DATE_PICKER_INPUT_STATE.START_TIME_SELECTED:
        return endDate;
      case DATE_PICKER_INPUT_STATE.NOT_SELECTED:
        return null;
    }
  };
  const selectedDate = getSelectedDate();
  return (
    <>
      <DatePicker
        ref={datePicker}
        locale={locale}
        minDate={max([new Date(), startDate])}
        selectsStart={true}
        selectsEnd={true}
        selected={selectedDate}
        chooseDayAriaLabelPrefix={t(
          'commons.dateSelector.accessibility.chooseDayPrefix'
        )}
        previousMonthButtonLabel={t(
          'commons.dateSelector.accessibility.previousMonth'
        )}
        nextMonthButtonLabel={t('commons.dateSelector.accessibility.nextMonth')}
        // Inline datepicker doesn't have field so keep datepicker alway open instead
        open
        popperClassName={'react-datepicker__no-popper'}
        showPopperArrow={false}
        onChange={(date: Date) => {
          switch (selectedDatePickerInput) {
            case DATE_PICKER_INPUT_STATE.START_TIME_SELECTED:
              onChangeStartDate(date);
              setStartDateRaw(formatDate(date));

              if (!startDate || !isEqual(startDate, date)) {
                setShouldChangeFocusToEnd(true);
              }
              break;
            case DATE_PICKER_INPUT_STATE.END_TIME_SELECTED:
              onChangeEndDate(date);
              setEndDateRaw(formatDate(date));
              break;
          }
        }}
        customInput={
          <DateRangeInputs
            endDate={endDate}
            endDateRaw={endDateRaw}
            endDateRef={endDateRef}
            inputName={name}
            onBlurInput={handleInputBlur}
            setDatePickerInput={setDatePickerInput}
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
    </>
  );
};

export default DateRangePicker;
