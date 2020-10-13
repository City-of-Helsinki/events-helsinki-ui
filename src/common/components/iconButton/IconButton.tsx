import classNames from 'classnames';
import capitalize from 'lodash/capitalize';
import React from 'react';

import styles from './iconButton.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string;
  backgroundColor?: 'default' | 'white';
  icon: React.ReactElement;
  size?: 'default' | 'small';
}

const IconButton: React.FC<Props> = ({
  ariaLabel,
  backgroundColor = 'default',
  icon,
  size = 'default',
  type = 'button',
  ...rest
}) => {
  return (
    <button
      aria-label={ariaLabel}
      className={classNames(
        styles.iconButton,
        styles[size],
        styles[`background${capitalize(backgroundColor)}`]
      )}
      {...rest}
    >
      {icon}
    </button>
  );
};

export default IconButton;
