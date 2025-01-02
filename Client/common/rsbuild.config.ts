import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { generateExposes } from '../../Global/types/src/generateExposes';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';

const exposes = generateExposes({ dirname: __dirname, folder: 'components' });

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
          exposes,
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
    pluginNodePolyfill(),
  ],
});
