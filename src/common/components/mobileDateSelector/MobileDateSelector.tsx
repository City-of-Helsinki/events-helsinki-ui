import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import { DATE_TYPES } from "../../../constants";
import IconCalendar from "../../../icons/IconCalendar";
import ToggleButton from "../toggleButton/ToggleButton";
import styles from "./mobileDateSelector.module.scss";
import MobileDateSelectorMenu from "./MobileDateSelectorMenu";

interface Props {
  dateTypes: string[];
  endDate: Date | null;
  onChangeDateTypes: (values: string[]) => void;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  startDate: Date | null;
}

const MobileDateSelector: React.FC<Props> = ({
  dateTypes,
  endDate,
  onChangeDateTypes,
  onChangeEndDate,
  onChangeStartDate,
  startDate
}) => {
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const dateSelector = React.useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleClickButton = (value: string) => {
    if (dateTypes.indexOf(value) !== -1) {
      onChangeDateTypes(dateTypes.filter(item => item !== value));
    } else {
      onChangeDateTypes([...dateTypes, value]);
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
  }, []);

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = dateSelector && dateSelector.current;

    // Close menu when clicking outside of the component
    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const handleDocumentFocusin = React.useCallback(() => {
    if (!isComponentFocused()) {
      setIsMenuOpen(false);
    }
  }, [isComponentFocused]);

  const handleDocumentKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (!isComponentFocused()) return;

      switch (event.key) {
        case "ArrowUp":
          ensureMenuIsOpen();
          event.preventDefault();
          break;
        case "ArrowDown":
          ensureMenuIsOpen();
          event.preventDefault();
          break;
        case "Escape":
          setIsMenuOpen(false);
          event.preventDefault();
          break;
      }
    },
    [ensureMenuIsOpen, isComponentFocused]
  );

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeyDown);
    document.addEventListener("focusin", handleDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeyDown);
      document.removeEventListener("focusin", handleDocumentFocusin);
    };
  }, [handleDocumentFocusin, handleDocumentKeyDown]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.mobileDateSelector}>
      <ToggleButton
        isSelected={dateTypes.indexOf(DATE_TYPES.TODAY) !== -1}
        onClick={handleClickButton}
        text={t("commons.dateSelector.dateTypeToday")}
        value={DATE_TYPES.TODAY}
      />
      <ToggleButton
        isSelected={dateTypes.indexOf(DATE_TYPES.TOMORROW) !== -1}
        onClick={handleClickButton}
        text={t("commons.dateSelector.dateTypeTomorrow")}
        value={DATE_TYPES.TOMORROW}
      />
      <ToggleButton
        isSelected={dateTypes.indexOf(DATE_TYPES.THIS_WEEK) !== -1}
        onClick={handleClickButton}
        text={t("commons.dateSelector.dateTypeThisWeek")}
        value={DATE_TYPES.THIS_WEEK}
      />
      <ToggleButton
        isSelected={dateTypes.indexOf(DATE_TYPES.WEEKEND) !== -1}
        onClick={handleClickButton}
        text={t("commons.dateSelector.dateTypeWeekend")}
        value={DATE_TYPES.WEEKEND}
      />
      <div ref={dateSelector} className={styles.menuWrapper}>
        <ToggleButton
          icon={
            <IconCalendar
              className={classNames(styles.iconCalendar, {
                [styles.isSelected]: !!endDate || !!startDate
              })}
            />
          }
          isSelected={!!endDate || !!startDate}
          onClick={toggleMenu}
          testId={"open-date-selector-button"}
          text={t("commons.dateSelector.menu.buttonCustom")}
          value={"customDate"}
        />
        <MobileDateSelectorMenu
          closeBtnRef={closeBtnRef}
          endDate={endDate}
          isOpen={isMenuOpen}
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
