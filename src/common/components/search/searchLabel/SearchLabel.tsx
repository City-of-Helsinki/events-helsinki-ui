import classNames from 'classnames';
import React from 'react';

import styles from './searchLabel.module.scss';

interface Props {
  color?: 'white' | 'black';
  htmlFor: string;
  srOnly?: boolean;
}

const SearchLabel: React.FC<Props> = ({
  children,
  color = 'white',
  htmlFor,
  srOnly = false,
}) => {
  return (
    <label
      className={classNames(styles.searchLabel, styles[color], {
        [styles.srOnly]: srOnly,
      })}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default SearchLabel;
