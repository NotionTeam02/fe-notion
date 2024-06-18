import { Meta, StoryFn } from '@storybook/react';
import Sidebar from './Sidebar';

export default {
  title: 'Sidebar/Sidebar',
  component: Sidebar,
} as Meta;

const Template: StoryFn = (args) => <Sidebar {...args} />;

export const DefaultSidebar = Template.bind({});
DefaultSidebar.args = {};
