import React, { FunctionComponent } from "react";

import { ReactComponent as AngleDownIcon } from "../../../assets/icons/svg/angle-down.svg";
import { ReactComponent as AngleUpIcon } from "../../../assets/icons/svg/angle-up.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/icons/svg/calendar.svg";
import { formatMessage } from "../../translation/utils";
import styles from "./dateSelector.module.scss";
import DateSelectorMenu from "./DateSelectorMenu";

interface Props {
  dateTypes: string[];
  endDate: Date | null;
  isCustomDate: boolean;
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
  onChangeDateTypes,
  onChangeEndDate,
  onChangeStartDate,
  startDate,
  toggleIsCustomDate
}) => {
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

  const handleDocumentKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      // Close menu on ESC key
      case 27:
        setIsMenuOpen(false);
        break;
    }
  };

  const handleDocumentFocusin = (event: FocusEvent) => {
    const target = event.target;
    const current = dateSelector && dateSelector.current;

    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
  }, []);

  const handleToggleIsCustomDate = () => {
    if (isCustomDate) {
      setTimeout(() => {
        if (toggleBtnRef && toggleBtnRef.current) {
          toggleBtnRef.current.focus();
        }
      }, 1);
    } else {
      setTimeout(() => {
        if (backBtnRef && backBtnRef.current) {
          backBtnRef.current.focus();
        }
      }, 1);
    }

    toggleIsCustomDate();
  };

  return (
    <div className={styles.dateSelector} ref={dateSelector}>
      <button className={styles.button} onClick={toggleMenu} type="button">
        <div className={styles.iconWrapper}>
          <CalendarIcon />
        </div>
        <div className={styles.info}>
          {formatMessage("commons.dateSelector.title")}
        </div>
        <div className={styles.arrowWrapper}>
          {isMenuOpen ? <AngleUpIcon /> : <AngleDownIcon />}
        </div>
      </button>
      <DateSelectorMenu
        backBtnRef={backBtnRef}
        dateTypes={dateTypes}
        endDate={endDate}
        isCustomDate={isCustomDate}
        isOpen={isMenuOpen}
        onChangeDateTypes={onChangeDateTypes}
        onChangeEndDate={onChangeEndDate}
        onChangeStartDate={onChangeStartDate}
        startDate={startDate}
        toggleBtnRef={toggleBtnRef}
        toggleIsCustomDate={handleToggleIsCustomDate}
        toggleMenu={toggleMenu}
      />
    </div>
  );
};

export default DateSelector;
