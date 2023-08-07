// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import ReactAccessibleCustomSelect from './ReactAccessibleCustomSelect';

const meta: Meta<typeof ReactAccessibleCustomSelect> = {
  component: ReactAccessibleCustomSelect,
};

export default meta;
type Story = StoryObj<typeof ReactAccessibleCustomSelect>;

const staticOptions = [
  {
    label: 'option 1',
    value: 1
  },
  {
    label: 'option 2',
    value: 2
  },
  {
    label: 'option 3',
    value: 3
  },
  {
    label: 'option 4',
    value: 4
  }
]
export const Main: Story = {
  render: () => <ReactAccessibleCustomSelect options={staticOptions} label="Select your country" />,
};