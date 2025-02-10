import type { Meta, StoryObj } from '@storybook/react';
import PinnedBottomSheet from './PinnedBottomSheet';

const meta = {
  title: 'Components/PinnedBottomSheet',
  component: PinnedBottomSheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PinnedBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
