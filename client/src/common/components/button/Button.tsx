import classNames from "classnames";
import { Button as HdsButton, ButtonProps } from "hds-react";
import React from "react";

import styles from "./button.module.scss";

const Button: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  disabled,
  ...rest
}) => {
  return (
    <HdsButton
      className={classNames(styles[color], { [styles.disabled]: disabled })}
      color={color}
      disabled={disabled}
      {...rest}
    >
      {children}
    </HdsButton>
  );
};

export default Button;
