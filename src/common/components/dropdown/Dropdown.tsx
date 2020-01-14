import React from "react";

import { ReactComponent as AngleDownIcon } from "../../../assets/icons/svg/angle-down.svg";
import { ReactComponent as AngleUpIcon } from "../../../assets/icons/svg/angle-up.svg";
import Checkbox from "../input/Checkbox";
import styles from "./dropdown.module.scss";
import DropdownMenu from "./DropdownMenu";

type Option = {
  text: string;
  value: string;
};

interface Props {
  icon: React.ReactElement;
  name: string;
  onChange: (values: string[]) => void;
  options: Option[];
  title: string;
  value: string[];
}

const Dropdown: React.FC<Props> = ({
  icon,
  name,
  onChange,
  options,
  title,
  value
}) => {
  const dropdown = React.useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [input, setInput] = React.useState("");

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

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    onChange(
      value.includes(val) ? value.filter(v => v !== val) : [...value, val]
    );
  };

  const handleClear = () => {
    onChange([]);
  };

  const filteredOptions = React.useMemo(
    () =>
      options.filter(option =>
        option.text.toLowerCase().includes(input.toLowerCase())
      ),
    [input, options]
  );

  return (
    <div className={styles.dropdown} ref={dropdown}>
      <button className={styles.button} onClick={toggleMenu} type="button">
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.title}>
          <input
            placeholder={title}
            onChange={event => setInput(event.target.value)}
            value={input}
          />
        </div>
        <div className={styles.arrowWrapper}>
          {isMenuOpen ? <AngleUpIcon /> : <AngleDownIcon />}
        </div>
      </button>
      <DropdownMenu isOpen={isMenuOpen} onClear={handleClear}>
        {filteredOptions.map(option => {
          return (
            <Checkbox
              checked={value.includes(option.value)}
              name={name}
              onChange={handleValueChange}
              value={option.value}
            >
              {option.text}
            </Checkbox>
          );
        })}
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
