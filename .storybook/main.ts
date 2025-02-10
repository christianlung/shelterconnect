import type { StorybookConfig } from '@storybook/nextjs';
import webpack from 'webpack';
import path from 'path';
import { loadEnvConfig } from '@next/env';
import postcss from 'postcss';

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

    if (config.module?.rules) {
      const rules = config.module.rules as Array<{
        test?: RegExp;
        use?: Array<{ loader: string; options?: Record<string, unknown> }>;
      }>;
      const cssRule = rules.find((rule) => rule.test?.test('.css'));
      if (cssRule) {
        if (Array.isArray(cssRule.use)) {
          cssRule.use.push({
            loader: 'postcss-loader',
            options: {
              implementation: postcss,
            },
          });
        }
      }
    }

    return config;
  },
};
export default config;
