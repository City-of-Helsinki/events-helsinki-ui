import classNames from "classnames";
import React, { FunctionComponent } from "react";

import styles from "./keyword.module.scss";

interface Props {
  blackOnMobile?: boolean;
  color?: "engelLight50" | "tramLight20";
  hideOnMobile?: boolean;
  keyword: string;
  onClick: () => void;
}

const Keyword: FunctionComponent<Props> = ({
  blackOnMobile,
  color,
  hideOnMobile,
  keyword,
  onClick
}) => {
  return (
    <button
      className={classNames(styles.keyword, color && styles[color], {
        [styles.blackOnMobile]: blackOnMobile,
        [styles.hideOnMobile]: hideOnMobile
      })}
      onClick={onClick}
      type="button"
    >
      {keyword}
    </button>
  );
};

export default Keyword;
