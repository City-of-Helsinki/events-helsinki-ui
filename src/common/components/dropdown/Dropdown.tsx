import React from "react";

import { ReactComponent as AngleDownIcon } from "../../../assets/icons/svg/angle-down.svg";
import { ReactComponent as AngleUpIcon } from "../../../assets/icons/svg/angle-up.svg";
import styles from "./dropdown.module.scss";
import DropdownMenu from "./DropdownMenu";

interface Props {
  icon: React.ReactElement;
  onClearButtonClick: () => void;
  title: string;
}

const Dropdown: React.FC<Props> = ({
  children,
  icon,
  onClearButtonClick,
  title
}) => {
  const dropdown = React.useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = dropdown && dropdown.current;

    // Close menu when clicking outside of the component
    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const handleDocumentKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      // Close menu on ESC key
      case 27:
        setIsMenuOpen(false);
        break;
    }
  };

  const handleDocumentFocusin = (event: FocusEvent) => {
    const target = event.target;
    const current = dropdown && dropdown.current;

    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeyDown);
    document.addEventListener("focusin", handleDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeyDown);
      document.removeEventListener("focusin", handleDocumentFocusin);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdown}>
      <button className={styles.button} onClick={toggleMenu} type="button">
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.arrowWrapper}>
          {isMenuOpen ? <AngleUpIcon /> : <AngleDownIcon />}
        </div>
      </button>
      <DropdownMenu isOpen={isMenuOpen} onClearButtonClick={onClearButtonClick}>
        {children}
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
