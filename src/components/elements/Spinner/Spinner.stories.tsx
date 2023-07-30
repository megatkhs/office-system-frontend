import { Spinner } from "./Spinner";
import type { ComponentMeta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";

type Story = StoryObj<ComponentProps<typeof Spinner>>;

const meta: ComponentMeta<typeof Spinner> = {
  title: "components/elements/Spinner",
  component: Spinner,
};

export default meta;

export const Default: Story = {};
