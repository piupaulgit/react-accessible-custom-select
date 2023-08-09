import React from "react";
import { useState } from "react";
import "./ReactAccessibleCustomSelect.scss";

interface IOption {
  label: string,
  value: string|number
}
interface ReactAccessibleCustomSelectProps {
  buttonLabel?: string;
  defaultValue?: string|number;
  isOpen?: boolean;
  label: string;
  options: IOption[];
  placeholder?: string;
}

interface IDropdownDetails {
  buttonLabel?: string;
  isOpen: boolean;
  options: any; // need to set type as IOption[]
  selectedOption: any; // need to set type as IOption
}

const ReactAccessibleCustomSelect = (
  props: ReactAccessibleCustomSelectProps
) => {
  const [dropdownDetails, setDropdownDetails] = useState<IDropdownDetails>({
    buttonLabel: props.buttonLabel,
    isOpen: (props.isOpen && props.isOpen) || false,
    options: props.options,
    selectedOption: props.defaultValue && props.options.filter((item:IOption) => item.value === props.defaultValue)[0]
  });

  const toggleDropdown = () => {
    setDropdownDetails((prev) => ({
      ...dropdownDetails,
      isOpen: !prev.isOpen,
    }));
  };

  const getSelectedOption = (option: IOption) => {
    setDropdownDetails({ ...dropdownDetails, isOpen: false, selectedOption: option });
  };

  return (
    <div className={`react-accessible-custom-select ${dropdownDetails.isOpen && 'expanded' || 'collapsed'}`}>
      <label className="custom-select-label">{props.label}</label>
      <div className="custom-select">
        <button className="custom-select-button" onClick={toggleDropdown}>
          {dropdownDetails.selectedOption.label}
        </button>
        {dropdownDetails.isOpen && (
          <ul
            className="custom-select-dropdown-list"
          >
            {dropdownDetails.options &&
              dropdownDetails.options.map((option: any, idx: number) => {
                return (
                  <li className={`custom-select-dropdown-list-item ${dropdownDetails.selectedOption.label === option.label && 'selected'}`} key={idx} value={option.value} onClick={()=> getSelectedOption(option)}>
                    {option.label}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReactAccessibleCustomSelect;
