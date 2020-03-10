import classNames from "classnames";
import React from "react";

import styles from "./srOnly.module.scss";
interface Props {
  as?: "div" | "span";
  className?: string;
}

const SrOnly: React.FC<Props> = ({ as: Tag = "div", children, className }) => {
  return <Tag className={classNames(styles.srOnly, className)}>{children}</Tag>;
};

export default SrOnly;
