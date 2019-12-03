import classNames from "classnames";
import React, { FunctionComponent, ReactElement } from "react";

import styles from "./button.module.scss";

type ReactButton = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface Props extends ReactButton {
  className?: string;
  color: "primary";
  fullWidth?: boolean;
  iconAtEnd?: ReactElement;
  iconAtStart?: ReactElement;
  size: "md" | "sm";
}

const Button: FunctionComponent<Props> = ({
  children,
  className,
  color,
  disabled,
  fullWidth,
  iconAtEnd,
  iconAtStart,
  size,
  type = "button",
  ...rest
}) => {
  return (
    <button
      className={classNames(
        styles.btn,
        styles[`${size}Size`],
        styles[color],
        { [styles.fullWidth]: fullWidth },
        className
      )}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {iconAtStart && <div className={styles.iconAtStart}>{iconAtStart}</div>}
      {iconAtEnd && <div className={styles.iconAtEnd}>{iconAtEnd}</div>}
      {children}
    </button>
  );
};

export default Button;
