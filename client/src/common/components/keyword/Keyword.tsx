import classNames from "classnames";
import React, { FunctionComponent } from "react";

import styles from "./keyword.module.scss";

interface Props {
  blackOnMobile?: boolean;
  color?: "engelLight50" | "tramLight20";
  keyword: string;
}

const Keyword: FunctionComponent<Props> = ({
  blackOnMobile,
  color,
  keyword
}) => {
  return (
    <div
      className={classNames(styles.keyword, color && styles[color], {
        [styles.blackOnMobile]: blackOnMobile
      })}
    >
      {keyword}
    </div>
  );
};

export default Keyword;
