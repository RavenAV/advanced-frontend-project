import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    "../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    'storybook-addon-mock/register'
  ],
  framework: {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  staticDirs: ['./static']
};
export default config;