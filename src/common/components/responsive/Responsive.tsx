import classNames from 'classnames';
import capitalize from 'lodash/capitalize';
import React from 'react';

import { Breakpoint } from '../../../types';
import styles from './responsive.module.scss';

interface Props {
  above?: Breakpoint;
  below?: Breakpoint;
  className?: string;
}

const Responsive: React.FC<Props> = ({ above, below, children, className }) => {
  return (
    <div
      className={classNames({
        className,
        [styles[`above${capitalize(above)}`]]: above,
        [styles[`below${capitalize(below)}`]]: below,
      })}
    >
      {children}
    </div>
  );
};

export default Responsive;
