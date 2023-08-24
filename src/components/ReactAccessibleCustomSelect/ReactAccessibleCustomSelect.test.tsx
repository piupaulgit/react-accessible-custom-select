import React from "react";
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import ReactAccessibleCustomSelect from "./ReactAccessibleCustomSelect";

describe("ReactAccessibleCustomSelect", () => {
    let button: HTMLElement,
        props:any;

    beforeEach(() => {
        props = {
            id: 'foo',
            onBlur: jest.fn(),
            onChange: jest.fn(),
            onClose: jest.fn(),
            onFocus: jest.fn(),
            onOpen: jest.fn(),
            options: []
        }
    });

  describe("button", () => {
    beforeEach(() => {
      render(<ReactAccessibleCustomSelect {...props} />);
      button = screen.getByRole('combobox');
    });

    it('renders button', () => {
      expect(button).toBeInTheDocument()
    });
  });
});