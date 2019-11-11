import React, { FunctionComponent } from "react";

import { ReactComponent as AngleDownIcon } from "../../../assets/icons/svg/angle-down.svg";
import { ReactComponent as AngleUpIcon } from "../../../assets/icons/svg/angle-up.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/icons/svg/calendar.svg";
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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.dateSelector}>
      <button className={styles.button} onClick={toggleMenu} type="button">
        <div className={styles.iconWrapper}>
          <CalendarIcon />
        </div>
        <div className={styles.info}>Valitse ajankohta</div>
        <div className={styles.arrowWrapper}>
          {isMenuOpen ? <AngleUpIcon /> : <AngleDownIcon />}
        </div>
      </button>
      <DateSelectorMenu
        dateTypes={dateTypes}
        endDate={endDate}
        isCustomDate={isCustomDate}
        isOpen={isMenuOpen}
        onChangeDateTypes={onChangeDateTypes}
        onChangeEndDate={onChangeEndDate}
        onChangeStartDate={onChangeStartDate}
        startDate={startDate}
        toggleIsCustomDate={toggleIsCustomDate}
        toggleMenu={toggleMenu}
      />
    </div>
  );
};

export default DateSelector;
