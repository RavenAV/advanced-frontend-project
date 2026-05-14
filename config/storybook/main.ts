import type { StorybookConfig } from '@storybook/react-webpack5';
import { Configuration, RuleSetRule, DefinePlugin, webpack } from 'webpack';
import { BuildPaths } from '../build/types/config';
import path from 'path';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default {
  stories: [
    "../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    'storybook-addon-mock',
    'storybook-addon-themes'
  ],
  framework: {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  //staticDirs: ['./static'],
  staticDirs: ['./public'],
  webpackFinal: async (config: Configuration) => {
    const paths: BuildPaths = {
      build: '',
      html: '',
      entry: '',
      src: path.resolve(__dirname, '..', '..', 'src'),
      locales: '',
      buildLocales: ''
    }
    config.resolve!.modules!.push(paths.src)
    config.resolve!.extensions!.push('.ts', '.tsx')
    config.resolve!.alias = {
      ...config.resolve!.alias,
      '@': paths.src
    }

    config.module!.rules = config.module!.rules!
      .filter((rule): rule is RuleSetRule => typeof rule === 'object' && rule !== null)
      .map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
          return { ...rule, exclude: /\.svg$/i }
        }
        return rule
      })

    config.module!.rules!.push(buildSvgLoader())
    config.module!.rules!.push(buildCssLoader(true))

    config.plugins!.push(new DefinePlugin({
      __IS_DEV__: true,
      __API__: JSON.stringify(''),
      __PROJECT__: JSON.stringify('storybook')
    }))

    // Return the altered config
    return config;
  },
}