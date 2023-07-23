import { Header } from "./Header";
import type { ComponentMeta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";

type Story = StoryObj<ComponentProps<typeof Header>>;

const meta: ComponentMeta<typeof Header> = {
  title: "components/composites/Header",
  component: Header,
};

export default meta;

export const Default: Story = {};
