import type { Preview } from "@storybook/react";
import "../src/App.css";
import { themes } from '@storybook/theming';
import { addons } from '@storybook/preview-api';
import { DocsContainer, DocsContainerProps } from "@storybook/blocks";
import { PropsWithChildren, useEffect, useState } from "react";
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

const channel = addons.getChannel();

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
      container: ({children, context}: PropsWithChildren<DocsContainerProps>) => {
        const [isDark, setDark] = useState(false);

        useEffect(() => {
          channel.on(DARK_MODE_EVENT_NAME, setDark);
          return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
        }, [channel]);

        return <DocsContainer context={context} theme={isDark ? themes.dark : themes.light}>{children}</DocsContainer>;
      }
    },

    darkMode: {
      darkClass: "dark",
      lightClass: "light",
      classTarget: "html",
      stylePreview: true,
      dark: { ...themes.dark },
      light: { ...themes.normal },
    },
    backgrounds: {
      disable: true
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;