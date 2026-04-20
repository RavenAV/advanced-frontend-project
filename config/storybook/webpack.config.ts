import webpack, { RuleSetRule } from "webpack"
import { BuildPaths } from "../build/types/config";
import path from "path";
import { buildCssLoader } from "../build/loaders/buildCssLoader";
import { buildSvgLoader } from "../build/loaders/buildSvgLoader";

export default ({ config }: { config: webpack.Configuration }) => {
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

    config.plugins!.push(new webpack.DefinePlugin({
        __IS_DEV__: true,
        __API__: JSON.stringify(''),
        __PROJECT__: JSON.stringify('storybook')
    }))

    return config
};