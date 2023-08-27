// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Button2 from "./Button2";

const meta: Meta<typeof Button2> = {
  component: Button2,
};

export default meta;
type Story = StoryObj<typeof Button2>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <Button2 label="Button text here" />,
};
