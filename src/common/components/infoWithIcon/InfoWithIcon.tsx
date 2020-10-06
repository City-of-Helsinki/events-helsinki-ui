import React from 'react';

import styles from './infoWithIcon.module.scss';

interface Props {
  icon: React.ReactElement;
}

const InfoWithIcon: React.FC<Props> = ({ children, icon }) => {
  return (
    <div className={styles.infoWithIcon}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.iconTextWrapper}>{children}</div>
    </div>
  );
};

export default InfoWithIcon;
