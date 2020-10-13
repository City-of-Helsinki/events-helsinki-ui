import classNames from 'classnames';
import React from 'react';

import styles from './container.module.scss';

interface Props {
  className?: string;
}

const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
};

export default Container;
