import classNames from "classnames";
import React, { FunctionComponent } from "react";

import styles from "./keyword.module.scss";

interface Props {
  color?: "lightEngel50";
  keyword: string;
}

const Keyword: FunctionComponent<Props> = ({ color, keyword }) => {
  return (
    <div className={classNames(styles.keyword, color && styles[color])}>
      {keyword}
    </div>
  );
};

export default Keyword;
