import React, { FunctionComponent } from "react";

import styles from "./loadingSpinner.module.scss";

const LoadingSpinner: FunctionComponent<{ isLoading: boolean }> = ({
  isLoading,
  children
}) => {
  return (
    <>
      {isLoading ? (
        <div className={styles.spinnerWrapper}>
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
