import React, { useEffect } from "react";
import { useState } from "react";
import "./ReactAccessibleCustomSelect.scss";

interface IOption {
  label: string;
  value: string | number;
}
interface ReactAccessibleCustomSelectProps {
  buttonLabel?: string;
  defaultValue?: string | number;
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

enum KEYS {
  ARROWDOWN = "ArrowDown",
  ARROWUP = "ArrowUp",
  END = "End",
  ENTER = "Enter",
  ESCAPE = "Escape",
  HOME = "Home",
  PAGEDOWN = "PageDown",
  PAGEUP = "PageUp",
  SPACEBAR = "Spacebar",
  TAB = "Tab",
}

const ReactAccessibleCustomSelect = (
  props: ReactAccessibleCustomSelectProps
) => {
  const [dropdownDetails, setDropdownDetails] = useState<IDropdownDetails>({
    activeOptionIndex: -1,
    buttonLabel: props.buttonLabel,
    isOpen: (props.isOpen && props.isOpen) || false,
    options:
      (props.placeholder &&
        [{ label: props.placeholder, value: "" }].concat(props.options)) ||
      props.options,
    selectedOption:
      props.defaultValue &&
      props.options.filter(
        (item: IOption) => item.value === props.defaultValue
      )[0],
  });

  useEffect(() => {
    const selectedOption = document.querySelector(
      `#${props.id}-react-accessible-custom-select ul li[tabIndex="0"]`
    ) as HTMLElement;
    selectedOption && selectedOption.focus();
  }, [dropdownDetails.isOpen, dropdownDetails.activeOptionIndex]);

  const onButtonKeyDown = (e: any) => {
    const { key: actionKey } = e;

    (actionKey === KEYS.ARROWUP ||
      actionKey === KEYS.ARROWDOWN ||
      actionKey === KEYS.ENTER ||
      actionKey === KEYS.SPACEBAR) &&
      (e.preventDefault(), toggleDropdown());

    actionKey === KEYS.TAB && toggleDropdown();
  };

  const onOptionKeyDown = (e: any) => {
    const { key: actionKey } = e;
    e.preventDefault();

    (actionKey === KEYS.ENTER || actionKey === KEYS.SPACEBAR) &&
      toggleDropdown();

    actionKey === KEYS.ARROWUP &&
      setDropdownDetails((prev) => ({
        ...dropdownDetails,
        activeOptionIndex:
          prev.activeOptionIndex > 0
            ? prev.activeOptionIndex - 1
            : dropdownDetails.options.length - 1,
      }));

    actionKey === KEYS.ARROWDOWN &&
      setDropdownDetails((prev) => ({
        ...dropdownDetails,
        activeOptionIndex:
          prev.activeOptionIndex < dropdownDetails.options.length - 1
            ? prev.activeOptionIndex + 1
            : 0,
      }));

    (actionKey === KEYS.HOME || actionKey === KEYS.PAGEUP) &&
      setDropdownDetails({ ...dropdownDetails, activeOptionIndex: 0 });

    (actionKey === KEYS.END || actionKey === KEYS.PAGEDOWN) &&
      setDropdownDetails({
        ...dropdownDetails,
        activeOptionIndex: dropdownDetails.options.length - 1,
      });

    actionKey === KEYS.ENTER && getSelectedOption(e);

    (actionKey === KEYS.ESCAPE || actionKey === KEYS.TAB) &&
      (toggleDropdown(), document.getElementById(props.id)?.focus());
  };

  const onOptionBlur = (e: any) => {
    (!e.relatedTarget ||
      !e.relatedTarget.closest(
        `#${props.id}-react-accessible-custom-select`
      )) &&
      toggleDropdown();
  };

  const toggleDropdown = () => {
    setDropdownDetails((prev) => ({
      ...dropdownDetails,
      activeOptionIndex:
        (!prev.isOpen &&
          dropdownDetails.options.findIndex(
            (option: IOption) =>
              option.value === dropdownDetails.selectedOption.value
          )) ||
        dropdownDetails.activeOptionIndex,
      isOpen: !prev.isOpen,
    }));
  };

  const getSelectedOption = (e: any) => {
    const selectedOption = dropdownDetails.options.find(
      (option) => option.value === e.target.id
    );
    setDropdownDetails({
      ...dropdownDetails,
      isOpen: false,
      selectedOption: selectedOption,
    });

    document.getElementById(props.id)?.focus();
  };

  const renderDropdownOptions = () => {
    return dropdownDetails.options.map((option: IOption, indx: number) => {
      return (
        <li
          tabIndex={indx === dropdownDetails.activeOptionIndex ? 0 : -1}
          className={`custom-select-dropdown-list-item ${
            dropdownDetails.selectedOption.label === option.label && "selected"
          }`}
          key={indx}
          id={`${option.value}`}
          value={option.value}
        >
          {option.label}
        </li>
      );
    });
  };

  return (
    <div
      className={`react-accessible-custom-select ${
        (dropdownDetails.isOpen && "expanded") || "collapsed"
      }`}
      id={`${props.id}-react-accessible-custom-select`}
    >
      <label className="custom-select-label" htmlFor={props.id}>
        {props.label}
      </label>
      <div className="custom-select">
        <button
          className="custom-select-button"
          onClick={toggleDropdown}
          id={props.id}
          onKeyDown={onButtonKeyDown}
        >
          {dropdownDetails.selectedOption.label}
        </button>
        {dropdownDetails.isOpen && (
          <ul
            className="custom-select-dropdown-list"
            onBlur={onOptionBlur}
            onClick={getSelectedOption}
            onKeyDown={onOptionKeyDown}
          >
            {renderDropdownOptions()}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReactAccessibleCustomSelect;
