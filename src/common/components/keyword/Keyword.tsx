import classNames from "classnames";
import React, { FunctionComponent } from "react";

import styles from "./keyword.module.scss";

interface Props {
  blackOnMobile?: boolean;
  color?: "engelLight50" | "tramLight20";
  hideOnMobile?: boolean;
  keyword: string;
}

const Keyword: FunctionComponent<Props> = ({
  blackOnMobile,
  color,
  hideOnMobile,
  keyword
}) => {
  return (
    <div
      className={classNames(styles.keyword, color && styles[color], {
        [styles.blackOnMobile]: blackOnMobile,
        [styles.hideOnMobile]: hideOnMobile
      })}
    >
      {keyword}
    </div>
  );
};

export default Keyword;
