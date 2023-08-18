// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import ReactAccessibleCustomSelect from './ReactAccessibleCustomSelect';

const meta: Meta<typeof ReactAccessibleCustomSelect> = {
  component: ReactAccessibleCustomSelect,
};

export default meta;
type Story = StoryObj<typeof ReactAccessibleCustomSelect>;

const onChange = () => {
  console.log("on Change");
}

const onBlur = () => {
  console.log("on Blur");
}

const onOpen = () =>{
  console.log("on open")
}

const onClose = () => {
  console.log("on Close")
}

const onFocus = () => {
  console.log("on focus")
}

const staticOptions = [
  {
    label: 'option 1',
    value: '1'
  },
  {
    label: 'option 2',
    value: '2'
  },
  {
    label: 'option 3',
    value: '3'
  },
  {
    label: 'option 4',
    value: '4'
  }
]
export const Main: Story = {
  render: () => <ReactAccessibleCustomSelect 
  options={staticOptions} 
  label="Select your country"
  id="country"
  isDisabled={true}
  onBlur={onBlur}
  onChange={onChange}
  onFocus={onFocus}
  onOpen={onOpen}
  onClose={onClose}
  defaultValue={'3'}
  placeholder='please choose...'
  buttonLabel="Select option" />,
};