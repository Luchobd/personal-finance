import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { generateExposes } from '../../Global/types/src/generateExposes';
import { dependencies } from './package.json';

const exposes = generateExposes({ dirname: __dirname, folder: 'helpers' });

export default defineConfig({
  server: {
    port: 8003,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: true,
    client: {
      port: 8003,
    },
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = 'core';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'core',
          exposes,
          shared: {
            ...dependencies,
            react: {
              singleton: true,
              requiredVersion: dependencies.react,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: dependencies['react-dom'],
            },
          },
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
