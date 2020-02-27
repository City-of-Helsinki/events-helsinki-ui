import React from "react";
import { Link, LinkProps } from "react-router-dom";

import styles from "./iconLink.module.scss";

interface Props extends LinkProps {
  icon: React.ReactElement;
  text?: string;
}

const IconLink: React.FC<Props> = ({ icon, text, ...rest }) => {
  return (
    <Link {...rest} className={styles.iconLink}>
      <div className={styles.iconWrapper}>{icon}</div>
      {text && <div className={styles.textWrapper}>{text}</div>}
    </Link>
  );
};

export default IconLink;
