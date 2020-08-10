import classNames from 'classnames';
import React from 'react';

import styles from './iconButton.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string;
  icon: React.ReactElement;
  size: 'default' | 'small';
}

const IconButton: React.FC<Props> = ({
  ariaLabel,
  icon,
  size,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      aria-label={ariaLabel}
      className={classNames(styles.iconButton, styles[size])}
      {...rest}
    >
      {icon}
    </button>
  );
};

export default IconButton;
