import classNames from "classnames";
import React, { FunctionComponent } from "react";

import styles from "./loadingSpinner.module.scss";

interface Props {
  hasPadding?: boolean;
  isLoading: boolean;
}

const LoadingSpinner: FunctionComponent<Props> = ({
  hasPadding = true,
  isLoading,
  children
}) => {
  return (
    <>
      {isLoading ? (
        <div
          className={classNames(styles.spinnerWrapper, {
            [styles.hasPadding]: hasPadding
          })}
        >
          <div className={styles.spinner}>
            <div />
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingSpinner;
