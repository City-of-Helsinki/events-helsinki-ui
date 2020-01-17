import classNames from "classnames";
import React, { FunctionComponent } from "react";

import styles from "./checkbox.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Checkbox: FunctionComponent<Props> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <label className={classNames(styles.checkbox, className)}>
      <span className={styles.checkmarkWrapper}>
        <input type="checkbox" {...rest} />
        <span className={styles.checkmark} />
      </span>
      {children}
    </label>
  );
};

export default Checkbox;
