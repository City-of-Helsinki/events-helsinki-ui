import isBefore from 'date-fns/isBefore';
import isValidDate from 'date-fns/isValid';
import fi from 'date-fns/locale/fi';
import sv from 'date-fns/locale/sv';
import { DateInput } from 'hds-react';
import React from 'react';
import { registerLocale } from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import useLocale from '../../../hooks/useLocale';
import {
  formatDate,
  isValidDateString,
  parseDate,
} from '../../../util/dateUtils';
import styles from './datePicker.module.scss';

registerLocale('fi', fi);
registerLocale('sv', sv);

const initDate = (date: Date | null): string => {
  return date ? formatDate(date) : '';
};

export interface DateRangePickerProps {
  endDate: Date | null;
  startDate: Date | null;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  endDate,
  startDate,
  onChangeEndDate,
  onChangeStartDate,
}) => {
  const [internalStartDateString, setInternalStartDateString] =
    React.useState<string>(() => initDate(startDate));
  const [internalEndDateString, setInternalEndDateString] =
    React.useState<string>(() => initDate(endDate));
  const [errors, setErrors] = React.useState({
    startDateIsInvalid: false,
    endDateIsInvalid: false,
  });

  const { t } = useTranslation();
  const locale = useLocale();
  const helperText = t('commons.dateSelector.infoDate');

  const internalStartDate = parseDate(internalStartDateString);
  const internalEndDate = parseDate(internalEndDateString);

  const endDateIsBeforeStartDate =
    isValidDate(internalStartDate) &&
    isValidDate(internalEndDate) &&
    isBefore(internalEndDate, internalStartDate)
      ? true
      : false;

  React.useEffect(() => {
    if (!startDate && !endDate) {
      setInternalStartDateString('');
      setInternalEndDateString('');
    }
  }, [startDate, endDate]);

  React.useEffect(() => {
    const startDateIsValid = isValidDateString(internalStartDateString);
    const endDateIsValid = isValidDateString(internalEndDateString);
    const startDateObj = parseDate(internalStartDateString);
    const endDateObj = parseDate(internalEndDateString);

    if (
      startDateIsValid &&
      endDateIsValid &&
      isBefore(endDateObj, startDateObj)
    ) {
      onChangeStartDate(startDateObj);
      onChangeEndDate(null);
      return;
    }

    if (startDateIsValid) {
      setErrors({
        ...errors,
        startDateIsInvalid: false,
      });
    }

    if (endDateIsValid) {
      setErrors({
        ...errors,
        endDateIsInvalid: false,
      });
    }

    startDateIsValid
      ? onChangeStartDate(parseDate(internalStartDateString))
      : onChangeStartDate(null);
    endDateIsValid
      ? onChangeEndDate(parseDate(internalEndDateString))
      : onChangeEndDate(null);

    // ignore change handlers to avoid infinite loops (if func changes on every render)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalStartDateString, internalEndDateString, setErrors]);

  const handleStartDateValidation = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      startDateIsInvalid: !isValidDateString(e.target.value),
    });
  };

  const handleEndDateValidation = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      endDateIsInvalid: !isValidDateString(e.target.value),
    });
  };

  return (
    <div className={styles.dateInputsContainer}>
      <DateInput
        id="start-date"
        value={internalStartDateString}
        onBlur={handleStartDateValidation}
        disableConfirmation
        helperText={!errors.startDateIsInvalid ? helperText : undefined}
        minDate={new Date()}
        initialMonth={new Date()}
        label={t('commons.dateSelector.labelStartDate')}
        language={locale}
        onChange={(date) => setInternalStartDateString(date)}
        errorText={
          errors.startDateIsInvalid
            ? t('commons.dateSelector.errorDateFormat')
            : undefined
        }
      />
      <DateInput
        id="end-date"
        value={internalEndDateString}
        onBlur={handleEndDateValidation}
        disableConfirmation
        helperText={
          !endDateIsBeforeStartDate && !errors.endDateIsInvalid
            ? helperText
            : undefined
        }
        minDate={new Date()}
        initialMonth={startDate ?? new Date()}
        label={t('commons.dateSelector.labelEndDate')}
        language={locale}
        onChange={(date) => setInternalEndDateString(date)}
        errorText={
          endDateIsBeforeStartDate
            ? t('commons.dateSelector.errorEndDateBeforeStartDate')
            : errors.endDateIsInvalid
            ? t('commons.dateSelector.errorDateFormat')
            : undefined
        }
      />
    </div>
  );
};

export default DateRangePicker;
