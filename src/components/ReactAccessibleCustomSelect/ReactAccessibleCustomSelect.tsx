import React from "react";
import { useState } from "react";
import "./ReactAccessibleCustomSelect.scss";

interface ReactAccessibleCustomSelectProps {
  buttonLabel?: string;
  isOpen?: boolean;
  label: string;
  options: {}[];
}

interface IDropdownDetails {
  buttonLabel?: string;
  isOpen: boolean;
  options: {}[];
  selectedOption: string;
}

const ReactAccessibleCustomSelect = (
  props: ReactAccessibleCustomSelectProps
) => {
  const [dropdownDetails, setDropdownDetails] = useState<IDropdownDetails>({
    buttonLabel: props.buttonLabel,
    isOpen: (props.isOpen && props.isOpen) || false,
    options: props.options,
    selectedOption: ""
  });

  const toggleDropdown = () => {
    setDropdownDetails((prev) => ({
      ...dropdownDetails,
      isOpen: !prev.isOpen,
    }));
  };

  const getSelectedOption = (e: any) => {
    const selectedValue = e.target.innerText;
    setDropdownDetails({ ...dropdownDetails, isOpen: false, selectedOption: selectedValue });
  };

  return (
    <div className={`react-accessible-custom-select ${dropdownDetails.isOpen && 'expanded' || 'collapsed'}`}>
      <label className="custom-select-label">{props.label}</label>
      <div className="custom-select">
        <button className="custom-select-button" onClick={toggleDropdown}>
          { dropdownDetails.selectedOption || dropdownDetails.buttonLabel }
        </button>
        {dropdownDetails.isOpen && (
          <ul
            className="custom-select-dropdown-list"
            onClick={getSelectedOption}
          >
            {dropdownDetails.options &&
              dropdownDetails.options.map((option: any, idx: number) => {
                return (
                  <li className="custom-select-dropdown-list-item" key={idx} value={option.value}>
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
