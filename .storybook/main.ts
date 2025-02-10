import type { StorybookConfig } from '@storybook/nextjs';
import webpack from 'webpack';
import path from 'path';
import { loadEnvConfig } from '@next/env';

// Load environment variables from .env.local
const projectDir = path.resolve(__dirname, '../');
loadEnvConfig(projectDir);

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    config.plugins?.push(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    );
    return config;
  },
};
export default config;
