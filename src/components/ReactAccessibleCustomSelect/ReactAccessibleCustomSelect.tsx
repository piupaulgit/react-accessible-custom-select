import React, { useEffect } from "react";
import { useState } from "react";
import "./ReactAccessibleCustomSelect.scss";

interface IOption {
  label: string,
  value: string|number
}
interface ReactAccessibleCustomSelectProps {
  buttonLabel?: string;
  defaultValue?: string|number;
  id: string;
  isOpen?: boolean;
  label: string;
  options: any; // need to set type as IOption
  placeholder?: string;
}

interface IDropdownDetails {
  activeOptionIndex: number;
  buttonLabel?: string;
  isOpen: boolean;
  options: IOption[];
  selectedOption: any; // need to set type as IOption
}

const ReactAccessibleCustomSelect = (
  props: ReactAccessibleCustomSelectProps
) => {
  const [dropdownDetails, setDropdownDetails] = useState<IDropdownDetails>({
    activeOptionIndex: -1,
    buttonLabel: props.buttonLabel,
    isOpen: (props.isOpen && props.isOpen) || false,
    options: props.placeholder && [{label: props.placeholder, value: ''}].concat(props.options) || props.options,
    selectedOption: props.defaultValue && props.options.filter((item:IOption) => item.value === props.defaultValue)[0]
  });

  useEffect(() => {
    
  }, [dropdownDetails.isOpen]);

  const setFocusOnButton = () => {

  }

  const onOptionBlur = () => {
    console.log("ioioi")
  }

  const toggleDropdown = () => {
    setDropdownDetails((prev) => ({
      ...dropdownDetails,
      activeOptionIndex: !prev.isOpen && dropdownDetails.options.findIndex((option:IOption) => option.value === dropdownDetails.selectedOption.value) || dropdownDetails.activeOptionIndex,
      isOpen: !prev.isOpen,
    }));
  };

  const getSelectedOption = (option: IOption) => {
    setDropdownDetails({ ...dropdownDetails, isOpen: false, selectedOption: option });
  };

  return (
    <div className={`react-accessible-custom-select ${dropdownDetails.isOpen && 'expanded' || 'collapsed'}`}>
      <label className="custom-select-label" onClick={setFocusOnButton} htmlFor={props.id}>{props.label}</label>
      <div className="custom-select">
        <button className="custom-select-button" onClick={toggleDropdown} id={props.id}>
          {dropdownDetails.selectedOption.label}
        </button>
        {dropdownDetails.isOpen && (
          <ul
            className="custom-select-dropdown-list"
            onBlur={onOptionBlur}
          >
            {dropdownDetails.options &&
              dropdownDetails.options.map((option: any, idx: number) => {
                return (
                  <li tabIndex={idx === dropdownDetails.activeOptionIndex && 1 || 0 } className={`custom-select-dropdown-list-item ${dropdownDetails.selectedOption.label === option.label && 'selected'}`} key={idx} value={option.value} onClick={()=> getSelectedOption(option)}>
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
