import classNames from "classnames";
import React from "react";

import styles from "./toggleButton.module.scss";

interface Props {
  isSelected: boolean;
  onClick: (value: string) => void;
  text: string;
  value: string;
}

const ToggleButton: React.FC<Props> = ({
  isSelected,
  onClick,
  text,
  value
}) => {
  const handleClick = () => {
    onClick(value);
  };
  return (
    <button
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
