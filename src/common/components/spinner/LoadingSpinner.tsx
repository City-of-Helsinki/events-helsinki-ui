import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import IconLoadingSpinner from '../../../icons/IconLoadingSpinner';
import styles from './loadingSpinner.module.scss';

interface Props {
  hasPadding?: boolean;
  isLoading: boolean;
}

const LoadingSpinner: FunctionComponent<Props> = ({
  hasPadding = true,
  isLoading,
  children,
}) => {
  return (
    <>
      {isLoading ? (
        <div
          className={classNames(styles.spinnerWrapper, {
            [styles.hasPadding]: hasPadding,
          })}
          data-testid="loading-spinner"
        >
          <div className={styles.spinner}>
            <IconLoadingSpinner />
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingSpinner;
