import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 8002,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: true,
    client: {
      port: 8002,
    },
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = 'ui';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'ui',
          remotes: {
            common: 'common@http://localhost:8001/mf-manifest.json',
          },
          exposes: {
            './login': './src/view/login',
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
