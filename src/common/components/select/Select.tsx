import "./select.scss";

import React from "react";
import ReactSelect, { IndicatorProps, ValueType } from "react-select";

import { ReactComponent as AngleDownIcon } from "../../../assets/icons/svg/angle-down.svg";
import { ReactComponent as AngleUpIcon } from "../../../assets/icons/svg/angle-up.svg";

const components = {
  DropdownIndicator: (props: IndicatorProps<SelectOption>) => {
    return (
      <div className={"select__dropdown-indicator"}>
        {props.selectProps.menuIsOpen ? <AngleUpIcon /> : <AngleDownIcon />}
      </div>
    );
  },
  IndicatorSeparator: null
};

type SelectOption = {
  label: string;
  value: string;
};

interface Props {
  onChange: (value: string) => void;
  options: SelectOption[];
  value: string;
}

const Select: React.FC<Props> = ({ onChange, options, value }) => {
  const handleChange = (selectedOption: ValueType<SelectOption>) => {
    const newValue = (selectedOption as SelectOption).value;

    onChange(newValue);
  };
  return (
    <ReactSelect
      isClearable={false}
      isSearchable={false}
      onChange={handleChange}
      components={components}
      className={"select"}
      classNamePrefix={"select"}
      options={options}
      value={options.find(item => item.value === value)}
    />
  );
};

export default Select;
