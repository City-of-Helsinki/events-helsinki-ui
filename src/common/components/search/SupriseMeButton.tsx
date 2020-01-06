import React, { FunctionComponent } from "react";

import { ReactComponent as SupriseMeIcon } from "../../../assets/icons/svg/suprise-me.svg";
import { formatMessage } from "../../translation/TranslationUtils";
import styles from "./supriseMeButton.module.scss";

interface Props {
  onClick: () => void;
}

const SupriseMeButton: FunctionComponent<Props> = ({ onClick }) => {
  return (
    <button className={styles.supriseMeButton} onClick={onClick} type="button">
      <div className={styles.text}>{formatMessage("commons.supriseMe")}</div>
      <SupriseMeIcon />
    </button>
  );
};

export default SupriseMeButton;
