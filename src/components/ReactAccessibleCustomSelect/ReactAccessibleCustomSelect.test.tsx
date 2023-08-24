import React from "react";
import { render } from "@testing-library/react";

import ReactAccessibleCustomSelect from "./ReactAccessibleCustomSelect";

describe("ReactAccessibleCustomSelect", () => {
    let props:any;

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
  it("renders the custom select component", () => {
    render(<ReactAccessibleCustomSelect {...props} />);
  });

  it("test", () => {
    console.log("tesssst")
  });
});