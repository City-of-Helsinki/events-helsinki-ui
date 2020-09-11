import classNames from 'classnames';
import React, { AriaAttributes } from 'react';

import styles from './srOnly.module.scss';

interface Props extends AriaAttributes {
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  className?: string;
}

const SrOnly: React.FC<Props> = ({
  as: Tag = 'div',
  children,
  className,
  ...rest
}) => {
  return (
    <Tag className={classNames(styles.srOnly, className)} {...rest}>
      {children}
    </Tag>
  );
};

export default SrOnly;
