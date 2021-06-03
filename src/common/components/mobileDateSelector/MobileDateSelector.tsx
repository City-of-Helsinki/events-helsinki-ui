import classNames from 'classnames';
import { IconCalendar } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { DATE_TYPES } from '../../../constants';
import { translateValue } from '../../../util/translateUtils';
import ToggleButton from '../toggleButton/ToggleButton';
import styles from './mobileDateSelector.module.scss';
import MobileDateSelectorMenu from './MobileDateSelectorMenu';

interface Props {
  dateTypes: string[];
  endDate: Date | null;
  name: string;
  onChangeDateTypes: (values: string[]) => void;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  startDate: Date | null;
}

const MobileDateSelector: React.FC<Props> = ({
  dateTypes,
  endDate,
  name,
  onChangeDateTypes,
  onChangeEndDate,
  onChangeStartDate,
  startDate,
}) => {
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const toggleBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const dateSelector = React.useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleClickButton = (value: string) => {
    if (dateTypes.indexOf(value) !== -1) {
      onChangeDateTypes(dateTypes.filter((item) => item !== value));
    } else {
      onChangeDateTypes([...dateTypes, value]);
    }
  };

  const ensureMenuIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const isDateSelectorFocused = React.useCallback(() => {
    const active = document.activeElement;
    const current = dateSelector.current;

    return current?.contains(active);
  }, []);

  const handleDocumentClick = React.useCallback(
    (event: MouseEvent) => {
      const target = event.target;
      const current = dateSelector.current;

      // Close menu when clicking outside of the component
      if (!(target instanceof Node && current?.contains(target))) {
        isMenuOpen && setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  const handleDocumentFocusin = React.useCallback(() => {
    if (!isDateSelectorFocused()) {
      setIsMenuOpen(false);
    }
  }, [isDateSelectorFocused]);

  const handleDocumentKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (!isDateSelectorFocused()) return;

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
          toggleBtnRef.current?.focus();

          event.preventDefault();
          break;
      }
    },
    [ensureMenuIsOpen, isDateSelectorFocused]
  );

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
  }, [handleDocumentClick, handleDocumentFocusin, handleDocumentKeyDown]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.mobileDateSelector}>
      {Object.values(DATE_TYPES).map((dateType) => {
        return (
          <ToggleButton
            key={dateType}
            isSelected={dateTypes.indexOf(dateType) !== -1}
            onClick={handleClickButton}
            text={translateValue('commons.dateSelector.dateType', dateType, t)}
            value={dateType}
          />
        );
      })}

      <div ref={dateSelector} className={styles.menuWrapper}>
        <ToggleButton
          buttonRef={toggleBtnRef}
          icon={
            <IconCalendar
              className={classNames(styles.iconCalendar, {
                [styles.isSelected]: !!endDate || !!startDate,
              })}
              aria-hidden
            />
          }
          isSelected={!!endDate || !!startDate}
          onClick={toggleMenu}
          testId={'open-date-selector-button'}
          text={t('commons.dateSelector.menu.buttonCustom')}
          value={'customDate'}
        />
        <MobileDateSelectorMenu
          closeBtnRef={closeBtnRef}
          endDate={endDate}
          isOpen={isMenuOpen}
          name={name}
          onChangeEndDate={onChangeEndDate}
          onChangeStartDate={onChangeStartDate}
          onCloseMenu={closeMenu}
          startDate={startDate}
        />
      </div>
    </div>
  );
};

export default MobileDateSelector;
