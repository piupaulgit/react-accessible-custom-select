import React from "react";
import { fireEvent, queryByRole, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ReactAccessibleCustomSelect from "./ReactAccessibleCustomSelect";

describe("ReactAccessibleCustomSelect", () => {
  let button: HTMLElement, props: any;

  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  beforeEach(() => {
    props = {
      id: "foo",
      onBlur: jest.fn(),
      onChange: jest.fn(),
      onClose: jest.fn(),
      onFocus: jest.fn(),
      isOpen: false,
      onOpen: jest.fn(),
      options: options,
    };
  });

  it("renders with default props", () => {
    render(<ReactAccessibleCustomSelect {...props} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("opens dropdown on button click", () => {
    render(<ReactAccessibleCustomSelect {...props} />);
    fireEvent.click(screen.getByRole("combobox"));

    expect(screen.getByRole("listbox")).toBeVisible();
  });

  it("selects an option on option click", () => {
    render(<ReactAccessibleCustomSelect {...props} />);
    fireEvent.click(screen.getByRole("combobox"));
    const option = screen.getByText("Option 2");
    fireEvent.click(option);

    expect(screen.getByRole("combobox")).toHaveTextContent("Option 2");

    expect(props.onChange).toHaveBeenCalledWith({
      id: "foo",
      value: options[1],
    });
  });

  it("closes dropdown on option click", () => {
    render(<ReactAccessibleCustomSelect {...props} />);
    fireEvent.click(screen.getByRole("combobox"));
    const option = screen.getByText("Option 2");
    fireEvent.click(option);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selected li has selected class", () => {
    render(<ReactAccessibleCustomSelect {...props} />);
    fireEvent.click(screen.getByRole("combobox"));
    const option = screen.getByText("Option 2");
    fireEvent.click(option);
    fireEvent.click(screen.getByRole("combobox"));
    const selectedOptionElement = screen.getByRole("option", {
      name: "Option 2",
    });

    expect(selectedOptionElement).toHaveClass("selected");
  });

  it("selected li has aria-selected as true", () => {
    render(<ReactAccessibleCustomSelect {...props} />);
    fireEvent.click(screen.getByRole("combobox"));
    const option = screen.getByText("Option 2");
    fireEvent.click(option);
    fireEvent.click(screen.getByRole("combobox"));
    const selectedOptionElement = screen.getByRole("option", {
      name: "Option 2",
    });

    expect(selectedOptionElement).toHaveAttribute("aria-selected", "true");
  });
});
