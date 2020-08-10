import { IconAngleDown, IconAngleUp, IconCalendarClock } from 'hds-react';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { DATE_TYPES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import { formatDate } from '../../../util/dateUtils';
import { translateValue } from '../../../util/translateUtils';
import styles from './dateSelector.module.scss';
import DateSelectorMenu from './DateSelectorMenu';

const dateTypeOptions = [
  DATE_TYPES.TODAY,
  DATE_TYPES.TOMORROW,
  DATE_TYPES.THIS_WEEK,
  DATE_TYPES.WEEKEND,
];

interface Props {
  dateTypes: string[];
  endDate: Date | null;
  isCustomDate: boolean;
  name: string;
  onChangeDateTypes: (value: string[]) => void;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  startDate: Date | null;
  toggleIsCustomDate: () => void;
}

const DateSelector: FunctionComponent<Props> = ({
  dateTypes,
  endDate,
  isCustomDate,
  name,
  onChangeDateTypes,
  onChangeEndDate,
  onChangeStartDate,
  startDate,
  toggleIsCustomDate,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const backBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const toggleBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const dateSelector = React.useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = dateSelector && dateSelector.current;

    // Close menu when clicking outside of the component
    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const ensureMenuIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const isComponentFocused = React.useCallback(() => {
    const active = document.activeElement;
    const current = dateSelector && dateSelector.current;

    if (current && active instanceof Node && current.contains(active)) {
      return true;
    }
    return false;
  }, [dateSelector]);

  const handleDocumentFocusin = React.useCallback(() => {
    if (!isComponentFocused()) {
      setIsMenuOpen(false);
    }
  }, [isComponentFocused]);

  const handleDocumentKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (!isComponentFocused()) return;

      switch (event.key) {
        case 'ArrowUp':
          ensureMenuIsOpen();
          event.preventDefault();
          break;
        case 'ArrowDown':
          ensureMenuIsOpen();
          event.preventDefault();
          break;
        case 'Escape':
          setIsMenuOpen(false);
          event.preventDefault();
          break;
      }
    },
    [ensureMenuIsOpen, isComponentFocused]
  );

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeyDown);
    document.addEventListener('focusin', handleDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleDocumentKeyDown);
      document.removeEventListener('focusin', handleDocumentFocusin);
    };
  }, [handleDocumentFocusin, handleDocumentKeyDown]);

  const handleToggleIsCustomDate = () => {
    toggleIsCustomDate();
  };

  const isSelected = isCustomDate
    ? !!startDate || !!endDate
    : !!dateTypes.length;

  const selectedText = React.useMemo(() => {
    if (!!startDate || !!endDate) {
      return `${formatDate(startDate, undefined, locale)} -
            ${formatDate(endDate, undefined, locale)}`;
    }

    const sortDateTypes = (a: string, b: string): number =>
      dateTypeOptions.indexOf(a) < dateTypeOptions.indexOf(b) ? -1 : 1;

    const dateTypeLabels = dateTypes.sort(sortDateTypes).map(val => {
      return translateValue('commons.dateSelector.dateType', val, t);
    });
    if (dateTypeLabels.length > 1) {
      return `${dateTypeLabels[0]} + ${dateTypeLabels.length - 1}`;
    } else {
      return dateTypeLabels.join();
    }
  }, [dateTypes, endDate, locale, startDate, t]);

  React.useEffect(() => {
    if (isComponentFocused() && !isCustomDate) {
      if (toggleBtnRef.current) {
        toggleBtnRef.current.focus();
      }
    }
  }, [isComponentFocused, isCustomDate]);

  return (
    <div className={styles.dateSelector} ref={dateSelector}>
      <button
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        aria-label={t('commons.dateSelector.title')}
        className={styles.button}
        onClick={toggleMenu}
        type="button"
      >
        <div className={styles.iconWrapper}>
          <IconCalendarClock />
        </div>
        <div className={styles.info}>
          <div className={styles.buttonTextWrapper}>
            {selectedText || t('commons.dateSelector.title')}
          </div>
        </div>
        <div className={styles.arrowWrapper}>
          {isMenuOpen ? <IconAngleUp /> : <IconAngleDown />}
        </div>
      </button>
      {isSelected && <div className={styles.isSelectedIndicator} />}
      <DateSelectorMenu
        backBtnRef={backBtnRef}
        dateTypes={dateTypes}
        dateTypeOptions={dateTypeOptions}
        endDate={endDate}
        isCustomDate={isCustomDate}
        isOpen={isMenuOpen}
        name={name}
        onChangeDateTypes={onChangeDateTypes}
        onChangeEndDate={onChangeEndDate}
        onChangeStartDate={onChangeStartDate}
        startDate={startDate}
        toggleBtnRef={toggleBtnRef}
        toggleIsCustomDate={handleToggleIsCustomDate}
        onCloseMenu={closeMenu}
      />
    </div>
  );
};

export default DateSelector;
