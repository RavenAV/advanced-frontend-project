import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildCssLoader } from "./loaders/buildCssLoader";
import { buildSvgLoader } from "./loaders/buildSvgLoader";
import { buildBabelLoader } from "./loaders/buildBabelLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options

    const svgLoader = buildSvgLoader()
    const babelLoader = buildBabelLoader(options)
    const cssLoader = buildCssLoader(isDev)
    // порядок в массиве, в котором возвращаются loader имеет значение!
    // Если не используем typescript - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoader,
        cssLoader,
    ]
}