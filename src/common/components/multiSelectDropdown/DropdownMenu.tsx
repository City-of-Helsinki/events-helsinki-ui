import React, { FunctionComponent, MutableRefObject } from "react";
import { useTranslation } from "react-i18next";

import styles from "./dropdownMenu.module.scss";

interface Props {
  isOpen: boolean;
  buttonRef: MutableRefObject<HTMLButtonElement | null>;
  onClear: () => void;
}

const DropdownMenu: FunctionComponent<Props> = ({
  buttonRef,
  children,
  isOpen,
  onClear
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className={styles.dropdownMenu}>
      <div className={styles.dropdownMenuWrapper}>{children}</div>
      <button
        className={styles.btnClear}
        onClick={onClear}
        ref={buttonRef}
        type="button"
      >
        {t("commons.dropdown.menu.buttonClear")}
      </button>
    </div>
  );
};

export default DropdownMenu;
