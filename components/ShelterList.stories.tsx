import type { Meta, StoryObj } from '@storybook/react';
import ShelterList from './ShelterList';

const meta = {
  title: 'Components/ShelterList',
  component: ShelterList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ShelterList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
