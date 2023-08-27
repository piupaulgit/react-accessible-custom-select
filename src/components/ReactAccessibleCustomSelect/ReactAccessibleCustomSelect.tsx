import React, { useEffect } from "react";
import { useState } from "react";
import "./ReactAccessibleCustomSelect.scss";

interface IOption {
  label: string;
  value: string | number;
}

interface ReactAccessibleCustomSelectProps {
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
  ariaRequired?: boolean;
  buttonLabel?: string;
  className?: string;
  defaultValue?: string | number;
  errorMessage?: string;
  id: string;
  isDisabled?: boolean;
  isOpen?: boolean;
  label?: string;
  onBlur: (e: any) => void;
  onChange: (e: { id: string; value: IOption }) => void;
  onClose: (e: any) => void;
  onFocus: (e: any) => void;
  onOpen: (e: any) => void;
  options: IOption[];
  placeholder?: string;
}

interface IDropdownDetails {
  activeOptionIndex: number;
  buttonLabel?: string;
  isOpen: boolean;
  options: IOption[];
  selectedOption: IOption;
}

export enum KEYS {
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
        [{ label: props.placeholder, value: "" }].concat(
          props.options as []
        )) ||
      props.options,
    selectedOption:
      (props.defaultValue &&
        props.options.filter(
          (item: IOption) => item.value === props.defaultValue
        )[0]) ||
      ({ label: props.placeholder, value: "" } as IOption),
  });

  useEffect(() => {
    const selectedOption = document.querySelector(
      `#${props.id}-react-accessible-custom-select ul li[tabIndex="0"]`
    ) as HTMLElement;
    selectedOption && selectedOption.focus();
  }, [dropdownDetails.isOpen, dropdownDetails.activeOptionIndex]);

  useEffect(() => {
    props.onChange &&
      props.onChange({ id: props.id, value: dropdownDetails.selectedOption });
  }, [dropdownDetails.selectedOption]);

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

  const toggleDropdown = (e?: any) => {
    !dropdownDetails.isOpen ? props.onOpen(e) : props.onClose(e);

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
    const selectedOption: IOption = dropdownDetails.options.find(
      (option) => option.value.toString() === e.target.id
    ) as IOption;

    setDropdownDetails({
      ...dropdownDetails,
      isOpen: false,
      selectedOption: selectedOption,
    });

    props.onClose(e);

    document.getElementById(props.id)?.focus();
  };

  const onFocus = (e: any) => {
    props.onFocus && props.onFocus(e);
  };

  const renderDropdownOptions = () => {
    return dropdownDetails.options.map((option: IOption, indx: number) => {
      return (
        <li
          aria-label={option.label}
          aria-selected={option.label === dropdownDetails.selectedOption.label}
          role="option"
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
      } ${(props.className && props.className) || ""} ${
        (props.ariaInvalid && "error") || ""
      }`}
      id={`${props.id}-react-accessible-custom-select`}
    >
      {props?.label && (
        <label className="custom-select-label" htmlFor={props.id}>
          {props?.label}
          {props.ariaRequired && <span className="required-sybmol">*</span>}
        </label>
      )}
      <div className="custom-select">
        <button
          aria-describedby={props.ariaDescribedBy}
          aria-expanded={dropdownDetails.isOpen}
          aria-invalid={true}
          aria-owns={`customSelectList_${props.id}`}
          aria-required={true}
          className={`custom-select-button ${
            props.isDisabled ? "disabled" : ""
          }`}
          disabled={props.isDisabled}
          id={props.id}
          onClick={toggleDropdown}
          onFocus={onFocus}
          onKeyDown={onButtonKeyDown}
          role="combobox"
          type="button"
        >
          {dropdownDetails.selectedOption.label}
        </button>
        {dropdownDetails.isOpen && (
          <ul
            className="custom-select-dropdown-list"
            id={`customSelectList_${props.id}`}
            onBlur={onOptionBlur}
            onClick={getSelectedOption}
            onKeyDown={onOptionKeyDown}
            role="listbox"
            tabIndex={-1}
          >
            {renderDropdownOptions()}
          </ul>
        )}
      </div>
      {props.ariaInvalid && props.errorMessage && (
        <p className="error-message">{props.errorMessage}</p>
      )}
    </div>
  );
};

export default ReactAccessibleCustomSelect;
