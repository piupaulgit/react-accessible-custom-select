// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import ReactAccessibleCustomSelect from "./ReactAccessibleCustomSelect";

const meta: Meta<typeof ReactAccessibleCustomSelect> = {
  component: ReactAccessibleCustomSelect,
};

export default meta;
type Story = StoryObj<typeof ReactAccessibleCustomSelect>;

const onChange = (e: any) => {
  console.log("onChange", e);
};

const onBlur = (e: any) => {
  console.log("on Blur", e);
};

const onOpen = (e: any) => {
  console.log("on open", e);
};

const onClose = (e: any) => {
  console.log("on Close", e);
};

const onFocus = (e: any) => {
  console.log(e, "on focus");
};

const staticOptions = [
  {
    label: "option 1",
    value: "1",
  },
  {
    label: "option 2",
    value: "2",
  },
  {
    label: "option 3",
    value: "3",
  },
  {
    label: "option 4",
    value: "4",
  },
];
export const Main: Story = {
  render: () => (
    <div>
      <ReactAccessibleCustomSelect
        ariaDescribedBy="select county from dropdown"
        ariaInvalid={false}
        ariaRequired={true}
        options={staticOptions}
        errorMessage="Country field is required"
        label="Select your country"
        id="country"
        isDisabled={false}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onOpen={onOpen}
        onClose={onClose}
        defaultValue={3}
        placeholder="please choose..."
        buttonLabel="Select option"
      />
    </div>
  ),
};
