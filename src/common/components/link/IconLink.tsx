import React from "react";
import { Link } from "react-router-dom";

import styles from "./iconLink.module.scss";

interface Props {
  icon: React.ReactElement;
  text: string;
  to: string;
}

const IconLink: React.FC<Props> = ({ icon, text, to }) => {
  return (
    <Link className={styles.iconLink} to={to}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.textWrapper}>{text}</div>
    </Link>
  );
};

export default IconLink;
