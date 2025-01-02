import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 8001,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: true,
    client: {
      port: 8001,
    },
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = 'common';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'common',
          exposes: {
            './button': './src/components/button',
          },
          shared: ['react', 'react-dom'],
        }),
      ]);
    },
  },
  plugins: [
    pluginReact({
      splitChunks: {
        react: false,
        router: false,
      },
    }),
  ],
});
