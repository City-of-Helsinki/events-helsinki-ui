import React, { FunctionComponent } from 'react';

import styles from './container.module.scss';

const Container: FunctionComponent = ({ children }) => {
  return (
    <div className={styles.container}>
      <div>{children}</div>
    </div>
  );
};

export default Container;
