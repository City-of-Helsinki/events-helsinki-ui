import classNames from "classnames";
import React, { MutableRefObject } from "react";

import styles from "./toggleButton.module.scss";

interface Props {
  buttonRef?: MutableRefObject<HTMLButtonElement | null>;
  isSelected: boolean;
  onClick: (value: string) => void;
  testId?: string;
  text: string;
  value: string;
}

const ToggleButton: React.FC<Props> = ({
  buttonRef,
  isSelected,
  onClick,
  testId,
  text,
  value
}) => {
  const handleClick = () => {
    onClick(value);
  };
  return (
    <button
      ref={buttonRef}
      data-testid={testId}
      className={classNames(styles.toggleButton, {
        [styles.isSelected]: isSelected
      })}
      aria-pressed={isSelected}
      onClick={handleClick}
      type="button"
    >
      {text}
    </button>
  );
};

export default ToggleButton;
