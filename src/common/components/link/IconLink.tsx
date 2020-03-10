import classNames from "classnames";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

import styles from "./iconLink.module.scss";

interface Props extends LinkProps {
  backgroundColor?: "default" | "white";
  icon: React.ReactElement;
  text?: string;
}

const IconLink: React.FC<Props> = ({
  backgroundColor = "default",
  icon,
  text,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      className={classNames(styles.iconLink, styles[backgroundColor])}
    >
      <div className={styles.iconWrapper}>{icon}</div>
      {text && <div className={styles.textWrapper}>{text}</div>}
    </Link>
  );
};

export default IconLink;
