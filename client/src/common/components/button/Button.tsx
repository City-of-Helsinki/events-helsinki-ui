import classNames from "classnames";
import React, { FunctionComponent, ReactElement, SyntheticEvent } from "react";

import styles from "./button.module.scss";

export enum ButtonStyles {
  MEDIUM_PRIMARY = "MediumPrimary"
}

export type ButtonStyleType = ButtonStyles;

type ReactButton = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface Props extends ReactButton {
  buttonStyle: ButtonStyleType;
  className?: string;
  icon?: ReactElement;
  isBlock?: boolean;
  disabled?: boolean;
  onClick?: (event?: SyntheticEvent) => void;
  size?: ButtonStyleType;
}

const Button: FunctionComponent<Props> = ({
  buttonStyle,
  children,
  className,
  disabled,
  icon,
  isBlock,
  onClick,
  type = "button",
  ...rest
}) => {
  return (
    <button
      className={classNames(
        styles.btn,
        {
          [styles[`btn${buttonStyle}`]]: buttonStyle,
          [styles.btnBlock]: isBlock
        },
        className
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
