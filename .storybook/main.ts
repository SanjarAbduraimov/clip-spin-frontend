const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
    "storybook-dark-mode",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};

export default config;
