import React from 'react';

import styles from './infoWithIcon.module.scss';

interface Props {
  icon: React.ReactElement;
  title?: string;
}

const InfoWithIcon: React.FC<Props> = ({ children, icon, title }) => {
  return (
    <div className={styles.infoWithIcon}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.iconTextWrapper}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default InfoWithIcon;
