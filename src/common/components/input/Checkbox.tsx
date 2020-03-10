import classNames from "classnames";
import React from "react";

import styles from "./checkbox.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Checkbox = React.forwardRef<HTMLLabelElement, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <label ref={ref} className={classNames(styles.checkbox, className)}>
        <span className={styles.checkmarkWrapper}>
          <input type="checkbox" {...rest} />
          <span className={styles.checkmark} />
        </span>
        {children}
      </label>
    );
  }
);

export default Checkbox;
